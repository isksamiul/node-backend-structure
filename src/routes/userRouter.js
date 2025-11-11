const express = require('express');
const appConfig = require('../../config/appConfig');
const userController = require('../controllers/userController');
const validator = require('../middlewares/validator');
const { authMiddleware } = require('../middlewares/auth');
const upload = require('../middlewares/fileUpload');

module.exports.setRouter = (app) => {
    const baseUrl = `${appConfig.apiVersion}`;

    // User Registration (Public)
    app.post(`${baseUrl}/register`, validator.registrationValidate, userController.registerUser);
    
    // User Login (Public)
    app.post(`${baseUrl}/login`, validator.loginValidate, userController.loginUser);
    
    // List Users (Protected - requires JWT token)
    app.get(`${baseUrl}/users`, authMiddleware, userController.listUsers);
    
    // Upload Profile Picture (Protected - requires JWT token)
    app.post(`${baseUrl}/upload-profile-picture`, authMiddleware, upload.single('profilePicture'), userController.uploadProfilePicture);
};
