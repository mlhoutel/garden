// Base URL of the garden-media Cloudflare Worker (see worker/ at the repo root).
// The URL is not a secret: every endpoint requires a Bearer token.
// Override with VITE_MEDIA_API=http://localhost:8787 to develop against a local worker.
export const MEDIA_API =
	import.meta.env.VITE_MEDIA_API ?? 'https://garden-media.mlhoutel.workers.dev';

export const MEDIA_TOKEN_KEY = 'garden-media-token';
