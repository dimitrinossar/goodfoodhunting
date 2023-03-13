CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    user_id INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);

INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://placekitten.com/200/200');
INSERT INTO dishes (title, image_url) VALUES ('pudding', 'https://placekitten.com/200/200');

-- INSERT INTO users (email) VALUES ('dt@ga.co');
-- INSERT INTO users (email) VALUES ('dt@generalassemb.ly');

-- ALTER TABLE dishes ADD COLUMN user_id INTEGER;