const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
    {
        warehouseID: {
            type: String,
             
        },
        warehouseName: {
            type: String,
            required: true,
        },
        district: {
            type: String,
           required: true,
        },
        province: {
            type: String,
           required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number, 
            required: true,
        },
    },
    { timestamps: true }
);

const warehouseModel = mongoose.model("Warehouse", warehouseSchema);
module.exports = warehouseModel;
