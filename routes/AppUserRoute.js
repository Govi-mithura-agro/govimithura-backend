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



module.exports = router;