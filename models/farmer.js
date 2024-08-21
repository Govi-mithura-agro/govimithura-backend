const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
    {
        farmerID: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        idnumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        dob: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: "Unverified",
        },
    },
    { timestamps: true }
);

const farmerModel = mongoose.model('farmer', farmerSchema);
module.exports = farmerModel;
