require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./config/db');
const appConfig = require('./config/appConfig');

const routesPath = path.join(__dirname, 'src', 'routes');
const modelsPath = path.join(__dirname, 'src', 'models');

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - dynamically use upload path from config
// const uploadPath = path.resolve(__dirname, appConfig.local_storage_path);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/views', express.static(path.join(__dirname, 'views')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'Node Server',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Boot sequence: DB -> Models -> Routes
(async () => {
  try {
    // Start database connection
    await database.startDB(app, process.env.DB_TYPE);

    // Load all models
    if (fs.existsSync(modelsPath)) {
      fs.readdirSync(modelsPath).forEach(file => {
        if (file.endsWith('.js')) {
          require(path.resolve(modelsPath, file));
          console.log(`✅ Model loaded: ${file}`);
        }
      });
    }

    // Load all routes
    if (fs.existsSync(routesPath)) {
      fs.readdirSync(routesPath).forEach(file => {
        if (file.endsWith('.js')) {
          const route = require(path.resolve(routesPath, file));
          if (typeof route.setRouter === 'function') {
            route.setRouter(app);
            console.log(`✅ Route loaded: ${file}`);
          }
        }
      });
    }

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });

    // Error handler
    app.use((err, req, res, next) => {
      console.error('[Error]', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    });

  } catch (error) {
    console.error('❌ Application startup failed:', error);
    process.exit(1);
  }
})();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});