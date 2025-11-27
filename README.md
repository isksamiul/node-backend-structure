# 🚀 Node.js Backend Structure

> **The Ultimate Production-Ready Boilerplate for Modern Web Development**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/isksamiul/node-backend-structure/graphs/commit-activity)

Stop wasting time setting up the same foundation for every project. **Node Backend Structure** provides a robust, scalable, and secure starting point for your next big idea. Whether you're building a startup MVP, a corporate API, or a personal project, this boilerplate handles the boring stuff so you can focus on what matters: **your business logic**.

---

## 🌟 Why Use This Boilerplate?

In the modern development landscape, speed and security are paramount. Starting from scratch is error-prone and time-consuming.

*   **⚡ Save 10+ Hours of Setup:** Authentication, Database connections, File uploads, and Validation are already done.
*   **🛡️ Enterprise-Grade Security:** Built-in JWT authentication, password hashing (Bcrypt), and input validation (Joi) ensure your data is safe.
*   **📈 Scalable Architecture:** Designed with a clean MVC (Model-View-Controller) pattern that grows with your application.
*   **🔌 Database Agnostic:** Native support for **MongoDB** (Mongoose) and **MySQL** (Sequelize). Switch or use both!
*   **🛠️ Developer Experience:** Hot-reloading, environment configuration, and standardized error handling make coding a breeze.

---

## 🚀 Quick Start

Get your project running in seconds with a single command.

### 1. Create Your Project
Run this command in your terminal. No need to clone or download zip files manually!

```bash
npx node-backend-structure
```

This will magically scaffold the entire project structure in your current directory.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Coding
```bash
npm run start
```
Your server is now running at `http://localhost:3000`! 

---

## ✨ Key Features

*   **🔐 Authentication:** Complete user registration and login flow with JWT Bearer tokens.
*   **📝 Input Validation:** Request data validation using `Joi` to prevent bad data from reaching your controllers.
*   **📂 File Uploads:** Integrated `Multer` support for handling profile pictures and file uploads locally.
*   **🗄️ Multi-Database Support:** 
    *   **MongoDB** (Mongoose) for flexible schema-less data.
    *   **MySQL** (Sequelize) for structured relational data.
*   **📡 Standardized API Responses:** Consistent success and error response structures across the entire app.
*   **⚙️ Environment Management:** Easy configuration using `.env` files.

---

## 🛠️ Tech Stack

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Databases:** MongoDB (Mongoose), MySQL (Sequelize)
*   **Authentication:** JWT (JSON Web Tokens), Bcrypt
*   **Validation:** Joi
*   **File Handling:** Multer
*   **Utilities:** Axios, Moment-timezone, Dotenv

---

## 📂 Project Structure

A clean structure that makes sense.

```
.
├── config/               # Database and App configuration
│   ├── appConfig.js
│   └── db.js
├── src/
│   ├── controllers/      # Request handlers (Business logic)
│   │   └── userController.js
│   ├── libs/             # Reusable libraries
│   │   ├── encLib.js
│   │   ├── jwtLib.js
│   │   ├── passwordLib.js
│   │   ├── responseLib.js
│   │   └── rsaKeyLib.js
│   ├── middlewares/      # Express middlewares
│   │   ├── auth.js
│   │   ├── fileUpload.js
│   │   └── validator.js
│   ├── models/           # Database models
│   │   └── userModel.js
│   └── routes/           # API route definitions
│       └── userRouter.js
├── views/
│   └── index.html
├── uploads/              # Storage for uploaded files
├── .env.example          # Environment variable template
├── .gitignore
├── app.js                # App entry point
└── package.json          # Dependencies and scripts
```

## ⚙️ Configure Environment

1.  **Copy the example file:**
    ```bash
    cp .env.example .env
    ```

2.  **Edit `.env`:**
    Open the `.env` file and update the following variables:
    *   `MDB_URI`: Your MongoDB connection string.
    *   `JWT_SECRET`: A strong secret key for signing tokens.
    *   `REST_PORT`: Port to run the server (default: 3000).

---

## 📖 API Documentation

The boilerplate comes with pre-built endpoints to get you started:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/register` | Register a new user | ❌ |
| `POST` | `/api/v1/login` | Login and get JWT token | ❌ |
| `GET` | `/api/v1/users` | Get list of users | ✅ |
| `POST` | `/api/v1/upload-profile-picture` | Upload user avatar | ✅ |

---

## 🤝 Contributing

Open source is at the heart of this project. We welcome contributions from everyone!

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

<!-- ## 📄 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

--- -->

<p align="center">
  Made with ❤️ for the developer community.
</p>
