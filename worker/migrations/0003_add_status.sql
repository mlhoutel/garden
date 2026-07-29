-- Reading state: 'todo' (backlog, not read yet) or 'done' (consumed, in the log).
ALTER TABLE media ADD COLUMN status TEXT NOT NULL DEFAULT 'done' CHECK (status IN ('todo', 'done'));
