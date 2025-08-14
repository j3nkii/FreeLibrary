-- Users
INSERT INTO users (username, email)
VALUES
('11111111-1111-1111-1111-111111111111', 'j3nkii', 'alice@example.com'),
('22222222-2222-2222-2222-222222222222', 'bob', 'bob@example.com'),

-- Groups
INSERT INTO groups (id, name, description, invite_code)
VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bookworms', 'A group for avid readers', 'INVITE123'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Movie Buffs', 'Discuss and share your favorite films', 'INVITE456');

-- User-Groups
INSERT INTO user_groups (user_id, group_id)
VALUES
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

-- Media
INSERT INTO media (id, title, author_director, media_type, api_id, cover_image_url, metadata)
VALUES
('44444444-4444-4444-4444-444444444444', 'The Hobbit', 'J.R.R. Tolkien', 'book', 'book_001', 'https://covers.example.com/the_hobbit.jpg', '{"pages": 310, "genre": "Fantasy"}'),
('55555555-5555-5555-5555-555555555555', 'Inception', 'Christopher Nolan', 'movie', 'movie_001', 'https://covers.example.com/inception.jpg', '{"runtime": "148 min", "genre": "Sci-Fi"}'),
('66666666-6666-6666-6666-666666666666', 'Dark Side of the Moon', 'Pink Floyd', 'record', 'record_001', 'https://covers.example.com/dark_side.jpg', '{"tracks": 10, "genre": "Progressive Rock"}');

-- User-Media
INSERT INTO user_media (user_id, media_id)
VALUES
('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444'),
('22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555'),
('33333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666');

-- Group-Media
INSERT INTO group_media (user_id, group_id, media_id)
VALUES
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444'),
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555'),
('33333333-3333-3333-3333-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '66666666-6666-6666-6666-666666666666');

-- CHATGPT GENERATED