-- Dated comment thread per entry, stored inline as a JSON array.
ALTER TABLE media ADD COLUMN comments TEXT NOT NULL DEFAULT '[]';
