CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    author_director VARCHAR(255),
    media_type VARCHAR(50) NOT NULL, -- 'book', 'movie', 'record'
    api_id VARCHAR(255) NOT NULL, -- external API identifier
    cover_image_url TEXT,
    metadata JSONB, -- flexible storage for API-specific data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);