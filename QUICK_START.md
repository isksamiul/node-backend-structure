# 🚀 Quick Start Guide

Get your API up and running in 5 minutes!

## Installation

```bash
npm install node-rest-api-boilerplate
```

## Setup

1. **Copy environment file:**
```bash
cp .env.example .env
```

2. **Edit `.env` with your settings:**
```env
NODE_ENV=development
REST_PORT=3000
DB_TYPE=mongo
DB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=change-this-to-a-secure-random-string
JWT_EXPIRES_IN=7d
```

3. **Start the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## First API Call

### Register a User

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "password": "SecurePass123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

Copy the `token` from the response.

### List Users (Protected Route)

```bash
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [NPM_PUBLISHING_GUIDE.md](NPM_PUBLISHING_GUIDE.md) to publish your own version
- Customize the API for your needs

## Need Help?

- Check the API documentation in README.md
- Open an issue on GitHub
- Review the code examples in the controllers

Happy coding! 🎉
