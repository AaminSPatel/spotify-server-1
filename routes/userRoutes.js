import express from 'express';
import User from '../models/user.js'; // Import the User model
import bcrypt from 'bcrypt'; // For password hashing comparison
import jwt from 'jsonwebtoken'; // For token generation
import dotenv from 'dotenv'
dotenv.config();
const router = express.Router();

// Function to hash password using bcrypt
async function hashPassword(plainPassword) {
  const saltRounds = 10; // Determines the cost factor for hashing
  return await bcrypt.hash(plainPassword, saltRounds);
}

// GET /users - Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the users as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error response if fetching fails
  }
});


// POST /signin - Sign in a user
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret', // Use an environment variable for the secret in production
      { expiresIn: '1h' } // Token expiry time
    );

    // Send back the user information (excluding the password) and token
    res.json({
      message: 'Sign-in successful',
      success:true,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        mobile: user.mobile,
        profile_pic: user.profile_pic,
      },
      token, // Send the token if needed for authentication
    });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error response if fetching fails
  }
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
//to verify jswebtoken 
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route
    
  } catch (error) {
    return res.status(403).json({ message: 'Invalid Token.' });
  }
}
router.get('/profile', authenticateToken,async (req, res) => {
  /* res.json({ message: 'Access Granted to Sign In.', user: req.user }); */
  //console.log(req.user.email);
  const {email,userId} = req.user
  //console.log(email,userId);
  
  // to sign in if token is present
 try{
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   
   
    // Compare the provided password with the stored hashed password
    /* if(user._id == userId){
      console.log('Mil gya user');
      
    } */
    res.json({user:user})
  }
  catch{

  }
});

// POST /signup - Add a new user
router.post('/signup', async (req, res) => {
  const { email, full_name, password } = req.body;

  try {
    // Ensure password is hashed correctly
    const hashedPassword = await hashPassword(password); // Await the hashing function

    // Create a new user with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword, // Store the hashed password
      mobile: null,
      full_name,
      profile_pic: null,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists. Please use another email.' });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

// PUT /users/:id - Update an existing user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, mobile, full_name, profile_pic } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, password, mobile, full_name, profile_pic },
      { new: true }
    );
    res.json(updatedUser); // Send the updated user as a JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Send error response if updating fails
  }
});

// DELETE /users/:id - Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id); // Delete the user from the database
    res.json({ message: 'User deleted successfully.' }); // Send a success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error response if deletion fails
  }
});

export default router;
