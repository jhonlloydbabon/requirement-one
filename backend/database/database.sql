CREATE DATABASE requirement_one;

--Install this first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE feedback(
    feedback_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    occupation VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    profile VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    rate INT NOT NULL
);