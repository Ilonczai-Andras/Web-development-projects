CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    picture TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
