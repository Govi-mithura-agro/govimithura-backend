const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to format date as DD-MM-YYYY
const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    voicemessage: {
        type: String,
        required: false,
        default: "The voice message is not available.",
        set: (val) => val === "" ? undefined : val  // Set default if empty string
    },
    textmessage: {
        type: String,
        required: false,
        default: "The text message is not entered.",
        set: (val) => val === "" ? undefined : val  // Set default if empty string
    },
    file: {
        type: String,
        required: false,
        default: "The file is not uploaded.",
        set: (val) => val === "" ? undefined : val  // Set default if empty string
    },
    date: {
        type: String,
        required: true,
        default: () => formatDate(new Date())  // Automatically set the formatted current date as DD-MM-YYYY
    },
    time: {
        type: String,
        required: true,
        default: () => new Date().toLocaleTimeString()  // Automatically set the current time
    }
});

const Appointments = mongoose.model('appointments', appointmentSchema);

module.exports = Appointments;
