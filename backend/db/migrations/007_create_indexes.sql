-- Claude told me to do this.
CREATE INDEX idx_user_groups_user_id ON user_groups(user_id);
CREATE INDEX idx_user_groups_group_id ON user_groups(group_id);
CREATE INDEX idx_user_media_user_id ON user_media(user_id);
CREATE INDEX idx_user_media_media_id ON user_media(media_id);
CREATE INDEX idx_group_media_group_id ON group_media(group_id);
CREATE INDEX idx_group_media_user_id ON group_media(user_id);
CREATE INDEX idx_media_type ON media(media_type);
CREATE INDEX idx_media_api_id ON media(api_id);