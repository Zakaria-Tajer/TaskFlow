-- Users table
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       first_name VARCHAR(255),
                       last_name VARCHAR(255),
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255),
                       image VARCHAR(255),
                       roles VARCHAR(50)
);

-- Tasks table
CREATE TABLE tasks (
                       id BIGSERIAL PRIMARY KEY,
                       title VARCHAR(255),
                       description TEXT,
                       status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
                       created_at TIMESTAMP,
                       updated_at TIMESTAMP,
                       user_id BIGINT,
                       CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);