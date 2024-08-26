const mongoose = require("mongoose");

const fertilizerProgressSchema = new mongoose.Schema(
    {
        fertilizerId: {
            type: String,
            required: true,
        },
        fertilizerName: { 
            type: String,
            required: true,
        },
        remainingTime: { 
            type: String,
            required: true,
        },
        quantity: { 
            type: Number, 
            required: true,
        },
        status: {
            type: String,
            required: true, 
            default: "In Progress",
        },        
    },
    { timestamps: true }
);

const FertilizerProgressModel = mongoose.model("FertilizerProgress", fertilizerProgressSchema); 
module.exports = FertilizerProgressModel;

