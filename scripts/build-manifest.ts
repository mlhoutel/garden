// scripts/generate-meta.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // Parse frontmatter from markdown
import readingTime from 'reading-time';
import type { Page } from '../src/library/types/types.ts';

// ---- Constants ----

const CONTENT_DIR = path.resolve('./src/content');
const META_DIR = path.resolve('./src/meta');
const OUTPUT_FILE = path.join(META_DIR, 'manifest.json');

// ---- Helpers ----

function walk(
	dir: string,
	section: string | null = null,
	subsection: string | null = null
): Page[] {
	const pages: Page[] = [];
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
			continue;
		}

		if (entry.isFile() && entry.name.endsWith('.md')) {
			const content = fs.readFileSync(fullPath, 'utf-8');
			const { data: frontmatter, content: body } = matter(content);
			const readStats = readingTime(body);

			const page: Page = {
				meta: {
					...frontmatter,
					words: readStats.words,
					time: readStats.time,
					published: typeof frontmatter.published === 'boolean' ? frontmatter.published : true,
					title: frontmatter?.title ?? '',
					date: frontmatter?.date ?? '',
					section: section ?? '',
					subsection: subsection ?? '',
					slug: entry.name.replace(/\.md$/, '')
				},
				path: path.relative(CONTENT_DIR, fullPath).replace(/\\/g, '/'),
				file: entry.name
			};

			pages.push(page);
		}
	}

	return pages;
}

// ---- Main ----

function generateMeta(): void {
	if (!fs.existsSync(CONTENT_DIR)) {
		console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
		process.exit(1);
	}

	const allPages: Page[] = walk(CONTENT_DIR);

	fs.mkdirSync(META_DIR, { recursive: true });
	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPages, null, 2));

	console.log(`\n✅ Generated metadata:
  • ${OUTPUT_FILE} (${allPages.length} pages)\n`);
}

// ---- Run ----

generateMeta();
