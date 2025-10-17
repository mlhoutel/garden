export interface BreadcrumbItem {
	text: string;
	href?: string; // optional, because the last item may not have a link
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

export interface NestedListItem {
	label?: string;
	items?: NestedListItem[];
	[key: string]: any; // for additional properties used by TreeListItem
}

export interface LinkItem {
	label: string;
	link: string;
}
export interface PageMeta {
	title: string;
	date: string;
	published: boolean;
	words: number;
	section?: string;
	subsection?: string;
	slug: string;
	time: number;
	[extra: string]: any;
}

export interface Page {
	meta: PageMeta;
	file: any;
	path: string;
	html?: string;
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
	id: string;
	label: string;
	size: number;
	meta?: any;
}

export interface Edge {
	id: string;
	size: number;
	source_id: string;
	target_id: string;
}

export interface GraphData {
	nodes: Node[];
	edges: Edge[];
}

export interface SimulationNode extends Node {
	x?: number;
	y?: number;
	fx?: number | null;
	fy?: number | null;
}

export interface SimulationLink extends Edge {
	source: SimulationNode | string;
	target: SimulationNode | string;
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
