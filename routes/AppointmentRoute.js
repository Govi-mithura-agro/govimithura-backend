const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

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
        // date and time will be set automatically
    });

    try {
        await newAppointment.save();
        return res.status(200).json({ status: "Appointment added successfully" });
    } catch (error) {
        return res.status(500).json({ status: "Error with adding appointment details", message: error.message });
    }

});

module.exports = router;


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

router.route('/deleteappointment/:id').delete(async (req, res) => {

    const appointmentId = req.params.id;

    try {

        await Appointment.findByIdAndDelete(appointmentId);
        return res.status(200).json({ status: "Appointment is deleted" });

    } catch (error) {

        return res.status(400).json({ status: "Error with delete appointment", message: error });

    }
});

router.route('/cancelappointment/:id').put(async (req, res) => {
    const appointmentID = req.params.id;

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentID, 
            { status: "Cancelled" }, 
            { new: true }
        );
        
        if (!updatedAppointment) {
            return res.status(404).json({ status: "Appointment not found" });
        }
        
        return res.status(200).json({ status: "Appointment cancelled", updatedAppointment });
    } catch (error) {
        return res.status(500).json({ status: "Error cancelling appointment", message: error.message });
    }
});


module.exports = router;
