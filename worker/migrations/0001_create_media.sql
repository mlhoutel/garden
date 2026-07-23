-- Media log: one row per consumed item (article, book, paper, film, ...)
CREATE TABLE media (
	id       TEXT PRIMARY KEY,
	title    TEXT NOT NULL,
	type     TEXT NOT NULL,
	author   TEXT NOT NULL DEFAULT '',
	url      TEXT NOT NULL DEFAULT '',
	year     INTEGER,
	topics   TEXT NOT NULL DEFAULT '[]',
	rating   INTEGER CHECK (rating IS NULL OR rating BETWEEN 1 AND 5),
	note     TEXT NOT NULL DEFAULT '',
	added_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX idx_media_added_at ON media (added_at DESC);
