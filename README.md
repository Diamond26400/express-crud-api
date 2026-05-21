# Express CRUD API

A production-ready REST API built with Node.js and Express, featuring full CRUD operations, JWT authentication, rate limiting, and PostgreSQL database integration.

## Live Demo
https://express-crud-api-production-76cb.up.railway.app/users

## Stack
- Node.js + Express.js
- PostgreSQL (Railway)
- JWT Authentication (jsonwebtoken)
- bcrypt password hashing
- express-rate-limit
- dotenv

## Features
- Full CRUD operations on users resource
- JWT authentication with protected routes
- Rate limiting on login endpoint (brute force protection)
- PostgreSQL database with persistent storage
- Environment variables for secure configuration
- Deployed on Railway

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get single user |
| POST | /users | Create user |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login and get JWT token |
| GET | /auth/profile | Get profile (protected) |

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with your values
4. Run `nodemon server2.js`
