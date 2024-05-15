CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES profiles(id),
    content TEXT
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    username TEXT,
    bio TEXT,
    clerk_id TEXT 
);