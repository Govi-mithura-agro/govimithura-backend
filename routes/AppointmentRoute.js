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

router.route('/getappointments/:email').post(async (req, res) => {

    const appointmentUseremail = req.params.email;

    try {

        const appointment = await Appointment.find({email: appointmentUseremail});

        if (!appointment) {
            return res.status(404).json({ status: "Appointment not found" });
        }

        return res.status(200).json({ status: "Appointment is fatched", appointment });

    } catch (error) {

        return res.status(500).json({ status: "Error with fetch Appointment", message: error });

    }
});

router.route('/editappointment/:id').put(async (req, res) => {

    const appointmentID = req.params.id;

    const {
        name,
        email,
        contact,
        district,
        voicemessage,
        textmessage,
        file
    } = req.body;

    const editcrop = {
        name,
        email,
        contact,
        district,
        voicemessage,
        textmessage,
        file
    }

    try {

        await Appointment.findByIdAndUpdate(appointmentID, editcrop);
        return res.status(200).json({ status: "Appointment updated" });

    } catch (error) {

        return res.status(500).json({ status: "Error with update appointment", message: error });

    }
});
module.exports = router;
