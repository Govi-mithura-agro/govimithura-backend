const express = require('express');
const router = express.Router();
const AppUsers = require('../models/AppUsers');
const crypto = require('crypto');

// In-memory storage for OTPs (replace with a database in production)
const otpStore = new Map();

// Function to generate OTP
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}

// Route to request OTP
router.route('/request-otp').post(async (req, res) => {
    const { contact } = req.body;

    try {
        const otp = generateOTP();
        // Store OTP with expiration time (5 minutes)
        otpStore.set(contact, {
            otp,
            expiry: Date.now() + 5 * 60 * 1000
        });

        // TODO: In production, integrate with SMS service to send OTP
        console.log(`OTP for ${contact}: ${otp}`);

        // Include the OTP in the response for testing purposes
        res.status(200).json({ status: "OTP sent successfully", otp: otp });
    } catch (error) {
        res.status(500).json({ status: "Error sending OTP", message: error.message });
    }
});


// Route to verify OTP
router.route('/verify-otp').post(async (req, res) => {
    const { contact, otp } = req.body;

    try {
        const storedOTP = otpStore.get(contact);

        if (!storedOTP) {
            return res.status(400).json({ status: "OTP not found or expired" });
        }

        if (Date.now() > storedOTP.expiry) {
            otpStore.delete(contact);
            return res.status(400).json({ status: "OTP expired" });
        }

        if (otp !== storedOTP.otp) {
            return res.status(400).json({ status: "Invalid OTP" });
        }

        // OTP is valid
        otpStore.delete(contact); // Remove used OTP
        res.status(200).json({ status: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ status: "Error verifying OTP", message: error.message });
    }
});

// Modified registration route
router.route('/register').post(async (req, res) => {

    const {
        name,
        email,
        contact,
        password
    } = req.body;

    const newUser = new AppUsers({

        name,
        email,
        contact,
        password

    });

    try {

        await newUser.save();
        return res.status(200).json({status: "User is registered successfully"});

    } catch (error) {

        return res.status(500).json({status: "Error with register user", messsage: error});
    }
});
router.route('/login').post(async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {
        const user = await AppUsers.findOne({ email: email, password: password });

        if (user) {

            const loginUser = {

                _id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact
                
            }

            return res.status(200).json({ status: "Login Success", loginUser});        
        } 
        else {
            return res.status(500).json({ status: "The email or password is incorrect" });
        }

    } catch (error) {
        return res.status(500).json({ status: "Error during login", message: error });
    }
});


router.route('/edituser/:id').put(async (req, res) =>{

    const userId = req.params.id;

    const {
        name,
        email,
        contact,
        password
    } = req.body;

    const updateUser = {

        name,
        email,
        contact,
        password
    }
    
    try {
        
        await AppUsers.findByIdAndUpdate(userId, updateUser);
        return res.status(200).json({status: "User updated"});

    } catch (error) {
        
        return res.status(500).json({status: "Error with update user", message: error});

    }
});

router.route('/deleteuser/:id').delete(async (req, res) => {

    const userId = req.params.id;

    try {
        
        await AppUsers.findByIdAndDelete(userId);
        return res.status(200).json({status : "User is deleted"});

    } catch (error) {
        
        return res.status(400).json({status : "Error with delete user", message : error});

    }
});


module.exports = router;