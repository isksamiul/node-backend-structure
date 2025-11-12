# Node Backend Structure

Production‑ready Node.js REST API boilerplate with MongoDB/MySQL support, JWT authentication, input validation, file uploads, and clean module structure.

This package helps you bootstrap secure REST APIs fast. It includes user registration/login, protected routes, profile picture upload, and common utilities like JWT, password hashing, and standardized API responses.

## Features

- **Express** server with structured routes/controllers
- **MongoDB (Mongoose)** first, optional **MySQL (Sequelize)** wiring
- **JWT** authentication middleware (Bearer token)
- **Input validation** using Joi (with @joi/date)
- **Multer** file uploads to local storage
- **Standardized responses** via `responseLib`
- **Environment-based config** with `.env`
- **Ready scripts** for dev and prod

## Installation

```bash
# using npm
npm install node-backend-structure

# or add to an existing project
npm i node-backend-structure
```

If you're using this repository directly (recommended for starting a new service):

```bash
git clone https://github.com/isksamiul/node-backend-structure.git
npm install
```

## Quick Start

1) Copy environment template and configure values

```bash
cp .env.example .env
```

Key variables:

- `NODE_ENV=development`
- `REST_PORT=3000`
- `DB_TYPE=mongo`  (options: `mongo`, `mysql`, `multi`)
- `MDB_URI=your-mongodb-uri`
- `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production`
- `JWT_EXPIRES_IN=7d`
- `REDIS_URL=redis://localhost:6379` (optional)

2) Start the server

```bash
# development (w/ reload)
npm run dev

# production
npm start
```

By default the API will listen on `http://localhost:3000` and expose routes under `/api/v1`.

> Note: The `config/appConfig.js` exposes `apiVersion='/api/v1'` and `local_storage_path='./uploads'`.

## API Endpoints

Base URL: `/api/v1`

- **POST** `/register` — Create user
  - Body: `{ name, email, mobile(10 digits), password(min 6) }`
  - Validated via Joi; returns JWT token and user profile

- **POST** `/login` — Authenticate user
  - Body: `{ email, password }`
  - Returns JWT token and user profile

- **GET** `/users` — List users (protected)
  - Headers: `Authorization: Bearer <token>`
  - Query: `search` (optional; matches name/email/mobile)

- **POST** `/upload-profile-picture` — Upload profile image (protected)
  - Headers: `Authorization: Bearer <token>`
  - Form-Data: `profilePicture` (file)
  - Stores file in `./uploads` and returns full URL

### Example Requests

Register:

```bash
curl -X POST http://localhost:3000/api/v1/register \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "mobile": "9876543210",
    "password": "secret123"
  }'
```

Login:

```bash
curl -X POST http://localhost:3000/api/v1/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "jane@example.com",
    "password": "secret123"
  }'
```

List users:

```bash
curl -H 'Authorization: Bearer <JWT_TOKEN>' \
  'http://localhost:3000/api/v1/users?search=jane'
```

Upload profile picture:

```bash
curl -X POST http://localhost:3000/api/v1/upload-profile-picture \
  -H 'Authorization: Bearer <JWT_TOKEN>' \
  -F 'profilePicture=@/path/to/image.png'
```

## Validation Rules

- Registration:
  - `name`: string 2–100
  - `email`: valid email
  - `mobile`: exactly 10 digits
  - `password`: min 6 chars
- Login:
  - `email` and `password` required

Errors are returned as standardized objects from `responseLib`.

## Authentication

- Send `Authorization: Bearer <token>` for protected routes
- Tokens are signed with `JWT_SECRET` and expire based on `JWT_EXPIRES_IN`

## File Uploads

- Uses Multer with disk storage
- Allowed types: jpeg, jpg, png, gif, webp
- Max size: 5 MB
- Field name: `profilePicture`
- Files saved under `./uploads` (auto-created)

## Project Structure

```
.
├── config/
│   ├── appConfig.js          # apiVersion, uploads base path
│   └── db.js                 # DB bootstrap for Mongo/MySQL
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── libs/                 # jwtLib, passwordLib, responseLib, etc.
│   ├── middlewares/          # auth, validator, fileUpload
│   ├── models/
│   │   └── userModel.js
│   └── routes/
│       └── userRouter.js
├── uploads/                  # local file storage
├── .env.example
├── package.json
└── README.md
```

## Scripts

- `npm run dev` — start with nodemon
- `npm start` — start in production

## Configuration Notes

- MongoDB connection is taken from `MDB_URI`. Alternatively, set the individual parts (`MDB_HOST`, `MDB_PORT`, `MDB_NAME`, `MDB_USER`, `MDB_PASS`).
- `DB_TYPE` controls which databases to start: `mongo`, `mysql`, or `multi` to run both.
- Redis is optional and currently disabled by default in `config/db.js`.

## Using As a Boilerplate

If you installed via npm but want to customize, you’ll typically clone or copy this repository, then:

- Replace the `author`, `repository`, and `homepage` fields in `package.json`
- Update the service name and `name` field for npm publishing uniqueness
- Add your own routes/models/controllers

## Publishing to npm

1) Ensure `package.json` has a unique `name`, valid `version`, `license`, and `repository`.
2) Add a `.npmignore` to exclude dev files (already provided here).
3) Login and publish:

```bash
npm login
npm publish --access public
```

> Tip: The `main` field currently points to `app.js`. Ensure your entry file exists and exports/starts your server as needed before publishing.

## License

ISC

---

Questions or need help? Open an issue in your repository or start a discussion.

