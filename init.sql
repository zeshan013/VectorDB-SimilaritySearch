-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create enum type if not already exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'severity_enum') THEN
        CREATE TYPE severity_enum AS ENUM ('Low', 'Medium', 'High', 'Critical');
    END IF;
END
$$;

-- Create table if not exists
CREATE TABLE IF NOT EXISTS "cisco" (
  "id" TEXT PRIMARY KEY,
  "severity" severity_enum NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "iacontrols" TEXT,
  "ruleID" TEXT,
  "fixid" TEXT,
  "fixtext" TEXT,
  "checkid" TEXT,
  "checktext" TEXT,
  "title_vector" VECTOR(384),
  "description_vector" VECTOR(384),
  "checktext_vector" VECTOR(384),
  "fixtext_vector" VECTOR(384)
);
