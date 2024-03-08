const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../model/user');



// User Registration API
router.post('/register', async (req, res) => {
    try {

        console.log("Request Body12:", req.body);
        const { email, username, password } = req.body;
        
        
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

      
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Create new user
        user = new User({ email, username, password });
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// User Login API
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user1 = await User.findOne({ username });
        if (!user1) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user1.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }
        res.json({ message: "Login successful", user: user1 }); 
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});





module.exports = router;
