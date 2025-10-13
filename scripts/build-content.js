import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '../database');
const CONTENT_OUT_DIR = path.resolve(__dirname, '../src/content');
const ASSETS_OUT_DIR = path.resolve(__dirname, '../static/assets');

// --- helper to ensure dir exists ---
function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

// --- read YAML frontmatter ---
function readFrontmatter(filePath) {
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
function copyFile(src, dest) {
	ensureDir(path.dirname(dest));
	fs.copyFileSync(src, dest);
	console.log(`✅ Copied: ${src} → ${dest}`);
}

// --- copy assets if exist ---
function copyAssets(mdPath) {
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
function* walkDir(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const res = path.resolve(dir, entry.name);
		if (entry.isDirectory()) yield* walkDir(res);
		else if (entry.isFile() && res.endsWith('.md')) yield res;
	}
}

// --- main build function ---
function build() {
	if (!fs.existsSync(SOURCE_DIR)) {
		console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
		process.exit(1);
	}

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

// Run
build();
