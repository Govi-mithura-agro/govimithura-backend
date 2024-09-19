const express = require('express');
const router = express.Router();
const AppUsers = require('../models/AppUsers');

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