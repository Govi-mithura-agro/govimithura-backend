const mongoose = require("mongoose");

const fertilizerSchema = new mongoose.Schema(
    {
        warehouseID: {
            type: String,
            
        },
        fertilizerName: { 
            type: String,
            required: true,
        },
        quantity: { 
            type: Number, 
            required: true,
        },
        date: { 
            type: String, 
            
        },
    },
    { timestamps: true }
);

const FertilizerModel = mongoose.model("Fertilizer", fertilizerSchema); 
module.exports = FertilizerModel;
