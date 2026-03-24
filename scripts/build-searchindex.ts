// scripts/generate-search-index.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Generate search index for static site
 * Run this as part of your build process
 */

const CONTENT_DIR = path.resolve('./src/content');
const OUTPUT_FILE = path.resolve('./src/meta/search-index.json');

// Configure which file types to index
const INDEXABLE_EXTENSIONS = ['.md', '.svx', '.svelte'] as const;

// --- Types ---

interface FrontmatterData {
	title?: string;
	name?: string;
	tags?: string[] | string;
	categories?: string[] | string;
	draft?: boolean;
	unlisted?: boolean;
	[key: string]: unknown;
}

interface SearchIndexItem {
	slug: string;
	title: string;
	content: string;
	tags: string[];
}

// --- Utility Functions ---

function stripHtmlTags(html: string): string {
	return html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function extractTextContent(content: string): string {
	// Remove frontmatter block
	const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

	// Strip HTML/Svelte tags and get plain text
	let text = stripHtmlTags(withoutFrontmatter);

	// Limit content length for search (keep first ~500 words)
	const words = text.split(/\s+/);
	if (words.length > 500) {
		text = words.slice(0, 500).join(' ');
	}

	return text;
}

function getSlugFromPath(filePath: string, contentDir: string): string {
	let slug = path.relative(contentDir, filePath);

	// Remove file extension
	slug = slug.replace(/\.(md|svx|svelte)$/, '');

	// Handle index files
	if (slug.endsWith('/+page')) {
		slug = slug.replace('/+page', '');
	}

	// Handle root index
	if (slug === '+page' || slug === '') {
		slug = 'index';
	}

	// Normalize path separators
	return slug.replace(/\\/g, '/');
}

function processFile(filePath: string, contentDir: string): SearchIndexItem | null {
	const content = fs.readFileSync(filePath, 'utf-8');

	// Parse frontmatter if exists
	const { data: frontmatter, content: mainContent } = matter(content);
	const fm = frontmatter as FrontmatterData;

	// Skip if explicitly marked as draft or unlisted
	if (fm.draft === true || fm.unlisted === true) {
		return null;
	}

	const slug = getSlugFromPath(filePath, contentDir);

	// Extract title (from frontmatter or first heading)
	let title = fm.title || fm.name || '';
	if (!title) {
		const h1Match = mainContent.match(/^#\s+(.+)$/m);
		if (h1Match) {
			title = h1Match[1];
		} else {
			title = slug.split('/').pop() || 'Untitled';
		}
	}

	// Extract tags
	const tags = fm.tags || fm.categories || [];
	const tagArray = Array.isArray(tags) ? tags : [tags].filter((t): t is string => Boolean(t));

	// Extract text content
	const textContent = extractTextContent(mainContent);

	return {
		slug,
		title: title.trim(),
		content: textContent,
		tags: tagArray.map((tag) => String(tag).trim())
	};
}

function traverseDirectory(
	dir: string,
	contentDir: string,
	results: SearchIndexItem[] = []
): SearchIndexItem[] {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			// Skip node_modules and hidden directories
			if (!file.startsWith('.') && file !== 'node_modules') {
				traverseDirectory(filePath, contentDir, results);
			}
		} else if (stat.isFile()) {
			const ext = path.extname(file);
			if (INDEXABLE_EXTENSIONS.includes(ext as (typeof INDEXABLE_EXTENSIONS)[number])) {
				const item = processFile(filePath, contentDir);
				if (item) results.push(item);
			}
		}
	}

	return results;
}

export function generateSearchIndex(): void {
	console.log('🔍 Generating search index...');

	// Ensure content directory exists
	if (!fs.existsSync(CONTENT_DIR)) {
		console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
		process.exit(1);
	}

	// Traverse and process files
	const items = traverseDirectory(CONTENT_DIR, CONTENT_DIR);

	// Convert to object format with slug as key
	const index: Record<string, Omit<SearchIndexItem, 'slug'>> = {};
	for (const item of items) {
		index[item.slug] = {
			title: item.title,
			content: item.content,
			tags: item.tags
		};
	}

	// Ensure output directory exists
	const outputDir = path.dirname(OUTPUT_FILE);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Write index to file
	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));

	console.log(`✅ Search index generated with ${items.length} items`);
	console.log(`📁 Output: ${OUTPUT_FILE}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	generateSearchIndex();
}
