const User = require('../models/userModel');
const responseLib = require('../libs/responseLib');
const passwordLib = require('../libs/passwordLib');
const jwtLib = require('../libs/jwtLib');
const appConfig = require('../../config/appConfig');
const fs = require('fs');
const path = require('path');

// Helper function to get full image URL
const getFullImageUrl = (req, imagePath) => {
  if (!imagePath) return null;
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}${imagePath}`;
};

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobile }] 
    });

    if (existingUser) {
      const message = existingUser.email === email 
        ? "User with this email already exists" 
        : "User with this mobile number already exists";
      const apiResponse = responseLib.generate(true, message, null);
      return res.status(400).send(apiResponse);
    }

    // Hash password
    const hashedPassword = await passwordLib.hash(password);

    // Create user
    const userData = {
      name,
      email,
      mobile,
      password: hashedPassword
    };

    const newUser = await User.create(userData);

    // Generate JWT token
    const tokenPayload = {
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name
    };
    const token = jwtLib.generateToken(tokenPayload);

    // Prepare response without password
    const userResponse = {
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      profilePicture: getFullImageUrl(req, newUser.profilePicture),
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
      token
    };

    const apiResponse = responseLib.generate(false, "User registered successfully", userResponse);
    return res.status(201).send(apiResponse);

  } catch (error) {
    console.error('Registration error:', error);
    const apiResponse = responseLib.generate(true, error.message, null);
    return res.status(500).send(apiResponse);
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      const apiResponse = responseLib.generate(true, "Invalid email or password", null);
      return res.status(401).send(apiResponse);
    }

    // Check if user is active
    if (!user.isActive) {
      const apiResponse = responseLib.generate(true, "Account is deactivated. Please contact support", null);
      return res.status(403).send(apiResponse);
    }

    // Verify password
    const isPasswordValid = await passwordLib.verify(password, user.password);

    if (!isPasswordValid) {
      const apiResponse = responseLib.generate(true, "Invalid email or password", null);
      return res.status(401).send(apiResponse);
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      name: user.name
    };
    const token = jwtLib.generateToken(tokenPayload);

    // Prepare response
    const userResponse = {
      userId: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      profilePicture: getFullImageUrl(req, user.profilePicture),
      isActive: user.isActive,
      token
    };

    const apiResponse = responseLib.generate(false, "Login successful", userResponse);
    return res.status(200).send(apiResponse);

  } catch (error) {
    console.error('Login error:', error);
    const apiResponse = responseLib.generate(true, error.message, null);
    return res.status(500).send(apiResponse);
  }
};

// List Users (Protected - requires JWT)
const listUsers = async (req, res) => {
  try {
    const { search = '' } = req.query;

    // Build search filter
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Get all users without password field
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    // Add full URL to profile pictures
    const usersWithFullUrl = users.map(user => ({
      ...user.toObject(),
      profilePicture: getFullImageUrl(req, user.profilePicture)
    }));

    const apiResponse = responseLib.generate(false, "Users retrieved successfully", usersWithFullUrl);
    return res.status(200).send(apiResponse);

  } catch (error) {
    console.error('List users error:', error);
    const apiResponse = responseLib.generate(true, error.message, null);
    return res.status(500).send(apiResponse);
  }
};

// Upload Profile Picture (Protected - requires JWT)
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      const apiResponse = responseLib.generate(true, "No file uploaded", null);
      return res.status(400).send(apiResponse);
    }

    const userId = req.user.userId;
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      // Delete uploaded file if user not found
      fs.unlinkSync(req.file.path);
      const apiResponse = responseLib.generate(true, "User not found", null);
      return res.status(404).send(apiResponse);
    }

    // Delete old profile picture if exists
    if (user.profilePicture) {
      const oldPicturePath = path.join(__dirname, '../../', user.profilePicture);
      if (fs.existsSync(oldPicturePath)) {
        fs.unlinkSync(oldPicturePath);
      }
    }

    // Update user with new profile picture path (dynamically use config path)
    const uploadBasePath = appConfig.local_storage_path.replace('./', '');
    const profilePicturePath = `/${uploadBasePath}/${req.file.filename}`;
    user.profilePicture = profilePicturePath;
    await user.save();

    const responseData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      profilePicture: getFullImageUrl(req, profilePicturePath)
    };

    const apiResponse = responseLib.generate(false, "Profile picture uploaded successfully", responseData);
    return res.status(200).send(apiResponse);

  } catch (error) {
    // Delete uploaded file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Upload profile picture error:', error);
    const apiResponse = responseLib.generate(true, error.message, null);
    return res.status(500).send(apiResponse);
  }
};

module.exports = {
  registerUser,
  loginUser,
  listUsers,
  uploadProfilePicture
};
