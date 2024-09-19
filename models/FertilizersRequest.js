const mongoose = require("mongoose");

const fertilizerRequestSchema = new mongoose.Schema(
    {
        warehouseID: { 
            type: String,
            required: true,
        },
       
        fertilizerName: { 
            type: String,
            required: true,
        },
       requestDate: { 
           type: String,
          required: true,
          },

        wantedDate: { 
            type: String,
            required: true,
        },
        quantity: { 
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true, 
            default: "Pending",
        },        
    },
    { timestamps: true }
);

const requestFertilizerModel = mongoose.model("FertilizerRequest", fertilizerRequestSchema);
module.exports = requestFertilizerModel;
