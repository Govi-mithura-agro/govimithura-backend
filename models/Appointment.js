const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

const Appointments = mongoose.model('appointments', appointmentSchema);

module.exports = Appointments;
