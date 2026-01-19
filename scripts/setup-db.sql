-- eTaxMentor Database Setup Script
-- Run this as PostgreSQL superuser to create the database

-- Create database
CREATE DATABASE etaxmentor_dev;

-- Connect to the database
\c etaxmentor_dev;

-- The rest of the schema will be created by Prisma migrations
-- Run: npx prisma migrate dev

-- Optional: Create a dedicated user (recommended for production)
-- CREATE USER etaxmentor_user WITH ENCRYPTED PASSWORD 'your_secure_password';
-- GRANT ALL PRIVILEGES ON DATABASE etaxmentor_dev TO etaxmentor_user;
-- GRANT ALL ON SCHEMA public TO etaxmentor_user;
