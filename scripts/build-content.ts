// scripts/build-content.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'yaml';

// Recreate Node globals for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../database');
const CONTENT_OUT_DIR = path.resolve(__dirname, '../src/content');
const ASSETS_OUT_DIR = path.resolve(__dirname, '../static/assets');

// --- helpers ---

function ensureDir(dir: string): void {
	fs.mkdirSync(dir, { recursive: true });
}

// --- read YAML frontmatter ---
function readFrontmatter(filePath: string): Record<string, any> {
	const content = fs.readFileSync(filePath, 'utf8');
	const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
	if (!match) return {};

	try {
		return yaml.parse(match[1]) || {};
	} catch (err) {
		console.warn(`⚠️ Invalid YAML frontmatter in ${filePath}`);
		return {};
	}
}

// --- copy file helper ---
function copyFile(src: string, dest: string): void {
	ensureDir(path.dirname(dest));
	fs.copyFileSync(src, dest);
	console.log(`✅ Copied: ${src} → ${dest}`);
}

// --- copy assets if exist ---
function copyAssets(mdPath: string): void {
	const mdName = path.parse(mdPath).name;
	const assetsDir = path.join(path.dirname(mdPath), 'assets', mdName);
	if (fs.existsSync(assetsDir) && fs.statSync(assetsDir).isDirectory()) {
		const dest = path.join(ASSETS_OUT_DIR, mdName);
		fs.rmSync(dest, { recursive: true, force: true });
		fs.cpSync(assetsDir, dest, { recursive: true });
		console.log(`📦 Copied assets for ${mdName} → ${dest}`);
	}
}

// --- recursively walk directory ---
function* walkDir(dir: string): Generator<string> {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const res = path.resolve(dir, entry.name);
		if (entry.isDirectory()) yield* walkDir(res);
		else if (entry.isFile() && res.endsWith('.md')) yield res;
	}
}

function cleanFolder(folderPath: string): void {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
		return;
	}

	const files = fs.readdirSync(folderPath);

	for (const file of files) {
		if (file === '.gitignore' || file === '.gitkeep') continue;

		const fullPath = path.join(folderPath, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			fs.rmSync(fullPath, { recursive: true, force: true });
		} else {
			fs.unlinkSync(fullPath);
		}
	}
}

// --- main build function ---
function build(): void {
	if (!fs.existsSync(SOURCE_DIR)) {
		console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
		process.exit(1);
	}

	cleanFolder(CONTENT_OUT_DIR);
	cleanFolder(ASSETS_OUT_DIR);

	for (const mdPath of walkDir(SOURCE_DIR)) {
		const fm = readFrontmatter(mdPath);
		if (!fm.deploy) continue;

		const section = fm.section || 'misc';
		const subsection = fm.subsection || 'general';
		const dest = path.join(
			CONTENT_OUT_DIR,
			String(section),
			String(subsection),
			path.basename(mdPath)
		);
		copyFile(mdPath, dest);
		copyAssets(mdPath);
	}

	console.log('\n🎉 Done building deployable content!');
}

// --- Run script ---
build();
