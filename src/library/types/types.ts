export interface BreadcrumbItem {
	text: string;
	href?: string; // optional, because the last item may not have a link
}

export interface Node {
	label: string;
	count: number;
	pos: {
		x: number;
		y: number;
	};
}

export interface Edge {
	nodeA: Node;
	nodeB: Node;
}

export interface IframeProps {
	src: string;
	title?: string;
	fstyle?: string;
	fclass?: string;
}

export interface JSXGraphProps {
	draw: (JXG: any, id: string) => void; // JXG type is 'any' for now; you can refine later
	width?: string;
	height?: string;
}

export interface LoadingBarProps {
	loading: boolean;
}

export interface Project {
	short: string;
	title: string;
}

export interface SearchItem {
	id: number;
	slug: string;
	title: string;
	content: string;
	tags: string[];
	topics: string[];
	meta?: any;
}

export interface SearchIndex {
	[slug: string]: {
		title: string;
		content: string;
		tags: string[];
		topics: string[];
		meta?: any;
	};
}

export type SearchMode = 'compact' | 'fullpage';

export interface TopicPillProps {
	disabled?: boolean;
	topic: string;
	removable?: boolean;
}

export interface TagSelectProps {
	placeholder?: string;
	input?: string;
	options: string[];
	selected?: Set<string>;
	dropdown?: boolean;
}

export interface ArticleMeta {
	title: string;
	short: string;
	topic?: string;
	words: number;
	time: number;
}

export interface ArticleItem {
	path: string;
	meta: ArticleMeta;
}

export interface NestedListItem {
	label?: string;
	items?: NestedListItem[];
	[key: string]: any; // for additional properties used by ListItemGeneric
}

export interface LinkItem {
	label: string;
	link: string;
}
export interface PageMeta {
	title: string;
	date: string;
	published?: boolean;
	[extra: string]: any;
}

export interface PageManifestEntry {
	section: string;
	path: string;
	meta: PageMeta;
	html?: string;
}

export interface Page {
	file: any;
	section?: string;
	subsection?: string;
	slug?: string;
	path: string;
	meta: PageMeta & { words?: number };
	html?: string;
	words?: number;
	title?: string;
	date?: string;
	published?: boolean;
}

export interface LinkItem {
	label: string;
	link: string;
}

export interface ListPagesOptions {
	includeDrafts?: boolean;
}

export interface ResolvedFile {
	meta: Record<string, any>;
	html: string;
	path: string;
}

export type FileResolver = () => Promise<{
	default: { render: () => { html: string } };
	metadata: Record<string, any>;
}>;

export type ParamBase = string | number | string[];
export type ParamsMap = Record<string, ParamBase>;

export interface Vec2 {
	x: number;
	y: number;
}

export interface Node {
	label: string;
	count: number;
	pos: Vec2;
}

export interface Edge {
	nodeA: Node;
	nodeB: Node;
	count: number;
}

export interface PageLoadReturn {
	content: string;
	next: Page | null;
	title: string;
	short?: string;
	topic?: string;
	words?: number;
	published?: boolean;
	section: string;
	subsection: string;
}

export interface SectionLoadReturn {
	tree: NestedListItem[] | NestedListItem;
	title?: string;
	section?: string;
}

export type TreeNode = Record<string, any[]> | TreeNode[]; // Recursive structure
export type ConvertedNode = { label: string; items: ConvertedNode[] | any[] };
