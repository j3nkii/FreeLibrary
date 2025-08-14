DROP TABLE IF EXISTS media;
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    release_year INTEGER,
    description TEXT,
    image_url TEXT,
    external_id VARCHAR(100),
    creators JSONB NOT NULL, -- All the people!
    metadata JSONB NOT NULL  -- Everything else
);


-- BOOKS
-- creators: {
--   "authors": ["George Orwell"],
--   "translators": ["Maria Lopez"] // if applicable
-- }

-- MOVIES
-- creators: {
--   "directors": ["Christopher Nolan"],
--   "writers": ["Christopher Nolan", "Jonathan Nolan"],
--   "cast": ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
-- }

-- MUSIC
-- creators: {
--   "artists": ["Pink Floyd"],
--   "songwriters": ["Roger Waters", "David Gilmour"],
--   "producers": ["Alan Parsons"]
-- }


-- // Book metadata
-- {
--   "pages": 328,
--   "publisher": "Penguin",
--   "subjects": ["Fiction", "Dystopian"]
-- }

-- // Movie metadata  
-- {
--   "runtime_minutes": 142,
--   "director": "Christopher Nolan",
--   "cast": ["Leonardo DiCaprio", "Marion Cotillard"],
--   "genres": ["Sci-Fi", "Thriller"]
-- }

-- // Music metadata
-- {
--   "format": "vinyl", // or "cd"
--   "artist": "Pink Floyd", // could duplicate in creators
--   "label": "Harvest Records",
--   "track_count": 10
-- }