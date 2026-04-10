// scripts/build-images.ts
// Post-processes article images: adds mandala watermark + attribution text + compression.
// Source images are never modified. Output goes to static/images/.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { generateMandala, generateAttribution } from './lib/generate-mandala.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../static/assets');
const CONTENT_DIR = path.resolve(__dirname, '../src/content');
const PROCESSED_DIR = path.resolve(__dirname, '../static/images');
const IMAGE_EXTS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.avif']);

/**
 * Scan all markdown files to find images referenced with {nowatermark}.
 * Returns a Set of image paths (e.g. "/assets/23_11_06_oneliner/file.webp").
 */
function findNoWatermarkImages(): Set<string> {
	const noWatermark = new Set<string>();
	const pattern = /!\[\{[^}]*nowatermark[^}]*\}[^\]]*\]\(([^)]+)\)/g;

	function scanDir(dir: string): void {
		if (!fs.existsSync(dir)) return;
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) scanDir(full);
			else if (entry.name.endsWith('.md')) {
				const content = fs.readFileSync(full, 'utf-8');
				let match;
				while ((match = pattern.exec(content)) !== null) {
					noWatermark.add(match[1]);
				}
			}
		}
	}

	scanDir(CONTENT_DIR);
	return noWatermark;
}

async function processImage(
	srcPath: string, destPath: string, articleSlug: string, skipMandala: boolean
): Promise<void> {
	const meta = await sharp(srcPath).metadata();
	const width = meta.width || 800;
	const height = meta.height || 600;
	const filename = path.basename(srcPath, path.extname(srcPath));
	const seed = `${articleSlug}/${filename}`;

	const layers: sharp.OverlayOptions[] = [];

	// Mandala watermark (unless skipped)
	if (!skipMandala) {
		const mandalaSvg = generateMandala({ seed, width, height });
		const mandalaPng = await sharp(Buffer.from(mandalaSvg))
			.resize(width, height)
			.png()
			.toBuffer();
		layers.push({ input: mandalaPng, blend: 'over' });
	}

	// Attribution text
	const attributionText = `mlhoutel / ${articleSlug.replace(/^\d+_\d+_\d+_/, '')}`;
	const attributionSvg = generateAttribution(width, height, attributionText);
	const attributionPng = await sharp(Buffer.from(attributionSvg))
		.resize(width, height)
		.png()
		.toBuffer();
	layers.push({ input: attributionPng, blend: 'over' });

	await sharp(srcPath)
		.composite(layers)
		.webp({ quality: 85 })
		.toFile(destPath);
}

async function main(): Promise<void> {
	if (!fs.existsSync(ASSETS_DIR)) {
		console.log('⚠️  No assets directory found, skipping image processing.');
		return;
	}

	fs.mkdirSync(PROCESSED_DIR, { recursive: true });

	const noWatermarkImages = findNoWatermarkImages();

	const articleDirs = fs.readdirSync(ASSETS_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory());

	let processed = 0;
	let skipped = 0;

	for (const dir of articleDirs) {
		const srcDir = path.join(ASSETS_DIR, dir.name);
		const destDir = path.join(PROCESSED_DIR, dir.name);

		const files = fs.readdirSync(srcDir)
			.filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()));

		if (files.length === 0) continue;

		fs.mkdirSync(destDir, { recursive: true });

		for (const file of files) {
			const srcPath = path.join(srcDir, file);
			const destPath = path.join(destDir, path.parse(file).name + '.webp');

			if (fs.existsSync(destPath)) {
				const srcStat = fs.statSync(srcPath);
				const destStat = fs.statSync(destPath);
				if (destStat.mtimeMs > srcStat.mtimeMs) {
					skipped++;
					continue;
				}
			}

			const imgRef = `/assets/${dir.name}/${file}`;
			const skipMandala = noWatermarkImages.has(imgRef);

			try {
				await processImage(srcPath, destPath, dir.name, skipMandala);
				processed++;
				const tag = skipMandala ? ' (no watermark)' : '';
				console.log(`🖼️  Processed: ${dir.name}/${file}${tag}`);
			} catch (err) {
				console.error(`❌ Failed: ${dir.name}/${file}:`, err);
			}
		}
	}

	console.log(`\n✅ Image processing complete: ${processed} processed, ${skipped} cached.`);
}

main().catch(console.error);
