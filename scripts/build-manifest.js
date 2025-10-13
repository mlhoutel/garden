import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // parse frontmatter from markdown

const CONTENT_DIR = path.resolve('./src/content');
const OUTPUT_FILE = path.resolve('./src/meta/manifest.json');

function walk(dir, section = null, subsection = null) {
	let pages = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			if (!section) {
				pages.push(...walk(fullPath, entry.name, null));
			} else if (!subsection) {
				pages.push(...walk(fullPath, section, entry.name));
			} else {
				pages.push(...walk(fullPath, section, subsection));
			}
		} else if (entry.isFile() && entry.name.endsWith('.md')) {
			const content = fs.readFileSync(fullPath, 'utf-8');
			const { data: frontmatter, content: body } = matter(content);

			// Compute word count
			const wordCount = body
				.replace(/<[^>]*>/g, '')
				.split(/\s+/)
				.filter((w) => w.length > 0).length;

			pages.push({
				section,
				subsection,
				slug: entry.name.replace(/\.md$/, ''),
				path: path.relative(CONTENT_DIR, fullPath).replace(/\\/g, '/'),
				meta: {
					...frontmatter,
					words: wordCount,
					published: frontmatter.published ?? true
				}
			});
		}
	}

	return pages;
}

const allPages = walk(CONTENT_DIR);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPages, null, 2));

console.log(`Generated manifest with ${allPages.length} pages to ${OUTPUT_FILE}`);
