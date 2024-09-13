const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Define your routes here
router.route('/addappointment').post(async (req, res) => {

    const {
        name,
        email,
        contact,
        district,
        voicemessage,
        textmessage,
        file
    } = req.body;

    const newAppointment = new Appointment({
        name,
        email,
        contact,
        district,
        voicemessage,
        textmessage,
        file
    });

    try {
        await newAppointment.save();
        return res.status(200).json({ status: "Apppointment are added successfully" });
    } catch (error) {
        return res.status(500).json({ status: "Error with adding appointment details", message: error.message });
    }

});

router.route('/getappointments').post(async (req, res) => {

    try {

        const appointments = await Appointment.find();

        if (!appointments) {
            return res.status(404).json({ status: "Appointments not found" });
        }

        return res.status(200).json({ status: "Appointments are fatched", appointments });

    } catch (error) {

        return res.status(500).json({ status: "Error with fetch Appointments", message: error });

    }
});

module.exports = router;
