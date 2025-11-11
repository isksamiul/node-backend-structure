# Node.js REST API Boilerplate

[![npm version](https://img.shields.io/npm/v/node-project.svg)](https://www.npmjs.com/package/node-project)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A production-ready Node.js REST API boilerplate with MongoDB/MySQL support, JWT authentication, user management, file uploads, and analytics tracking. Built with Express.js and following best practices for scalable backend applications.

## ✨ Features

- 🔐 **JWT Authentication** - Secure registration and login with token-based auth
- 👤 **User Management** - Complete CRUD operations with profile picture uploads
- 📊 **Analytics Tracking** - Built-in event tracking and user metrics
- 🗄️ **Multi-Database Support** - MongoDB, MySQL, or both simultaneously
- 🔒 **Password Security** - Bcrypt hashing with configurable salt rounds
- ✅ **Request Validation** - Joi schema validation for all endpoints
- 📁 **File Upload** - Multer integration for profile pictures and documents
- 🐳 **Docker Ready** - Includes Dockerfile and docker-compose.yml
- 🔄 **Redis Support** - Optional Redis integration for caching
- 📝 **Standardized Responses** - Consistent API response format
- 🛡️ **Protected Routes** - Middleware-based authentication
- 🔍 **Search & Pagination** - Built-in search and pagination support

## 📋 Prerequisites

- **Node.js** >= 14.x
- **MongoDB** >= 4.4 (if using MongoDB)
- **MySQL** >= 5.7 (if using MySQL)
- **Redis** (optional, for caching)

## 🚀 Quick Start

### Installation

```bash
npm install node-project
```

### Basic Setup

1. **Create environment file:**

```bash
cp .env.example .env
```

2. **Configure your `.env` file:**

```env
NODE_ENV=development
REST_PORT=3000
DB_TYPE=mongo
DB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
```

3. **Start the server:**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/v1/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "err": false,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User
```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### User Management (Protected)

#### List Users
```http
GET /api/v1/users?search=john&page=1&limit=10
Authorization: Bearer <your-jwt-token>
```

#### Upload Profile Picture
```http
POST /api/v1/users/upload-profile
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data

profilePicture: <file>
```

### Analytics Endpoints

#### Track Event
```http
POST /api/v1/analytics/track
Content-Type: application/json

{
  "event_name": "PAGE_VIEW",
  "category": "Navigation",
  "description": "User viewed homepage",
  "parameters": {
    "page": "/home",
    "user_id": "123"
  }
}
```

#### Get Event Counts
```http
GET /api/v1/analytics/event-counts?startDate=2025-01-01&endDate=2025-01-31&event=ALL
```

#### Get Active Users
```http
GET /api/v1/analytics/active-users?type=daily
```

## 🏗️ Project Structure

```
node-project/
├── app.js                      # Application entry point
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variables template
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
├── config/
│   ├── db.js                   # Database connection handler
│   └── appConfig.js            # Application configuration
├── src/
│   ├── controllers/
│   │   └── userController.js   # User business logic
│   ├── models/
│   │   └── userModel.js        # Database schemas
│   ├── routes/
│   │   └── userRouter.js       # API route definitions
│   ├── middlewares/
│   │   ├── auth.js             # JWT authentication
│   │   ├── validator.js        # Request validation
│   │   └── fileUpload.js       # File upload handling
│   └── libs/
│       ├── jwtLib.js           # JWT utilities
│       ├── passwordLib.js      # Password hashing
│       ├── responseLib.js      # Response formatter
│       └── encLib.js           # Encryption utilities
├── uploads/                    # File upload directory
└── views/
    └── index.html              # API documentation page
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `development` |
| `REST_PORT` | Server port | `3000` |
| `DB_TYPE` | Database type (mongo/mysql/multi) | `mongo` |
| `DB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | Secret key for JWT signing | - |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `REDIS_URL` | Redis connection URL (optional) | - |

### Database Configuration

**MongoDB:**
```env
DB_TYPE=mongo
DB_URI=mongodb://localhost:27017/myapp
```

**MySQL:**
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=myapp
DB_USER=root
DB_PASS=password
```

**Multi-Database:**
```env
DB_TYPE=multi
# Configure both MongoDB and MySQL variables
```

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Start all services (app + MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker

```bash
# Build image
docker build -t node-project .

# Run container
docker run -p 3000:3000 --env-file .env node-project
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Joi schema validation on all inputs
- **Protected Routes**: Middleware-based route protection
- **CORS Support**: Configurable CORS policies
- **Environment Variables**: Sensitive data in .env files

## 📦 Dependencies

### Core Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `sequelize` - MySQL ORM
- `jsonwebtoken` - JWT implementation
- `bcrypt` - Password hashing
- `joi` - Schema validation
- `multer` - File upload handling
- `dotenv` - Environment configuration

### Optional Dependencies
- `redis` - Caching layer
- `axios` - HTTP client
- `moment-timezone` - Date/time handling

## 🧪 Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "err": false,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "err": true,
  "message": "Error description",
  "data": null
}
```

## 🛠️ Development

### Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create model in `src/models/`
3. Define routes in `src/routes/`
4. Add validation in `src/middlewares/validator.js`

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/node-project)
- [GitHub Repository](https://github.com/yourusername/node-project)
- [Documentation](https://github.com/yourusername/node-project#readme)

---

**Made with ❤️ for the Node.js community**
