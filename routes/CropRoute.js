const express = require('express');
const router = express.Router();
const CropData = require('../models/CropData');

router.route('/addcropdata').post(async(req, res) => {

    const {
        crop,
        cropName,
        scientificName,
        plantingSeason,
        soilType,
        growthDuration,
        averageYield,
        waterRequirements,
        region
    } = req.body;

    const newCropData = new CropData({
        crop,
        cropName,
        scientificName,
        plantingSeason,
        soilType,
        growthDuration,
        averageYield,
        waterRequirements,
        region
    });
 
    try {
        await newCropData.save();
        return res.status(200).json({status: "Crop details are added successfully"});
    } catch (error) {
        return res.status(500).json({status: "Error with adding crop details", message: error.message});
    }  

});

router.route('/getcropdata').post(async(req, res) => {

    try {
        
        const crops = await CropData.find();

        if (!crops) {
            return res.status(404).json({ status: "Crops not found" });
        }

        return res.status(200).json({status: "Crops are fatched", crops});

    } catch (error) {
        
        return res.status(500).json({status: "Error with fetch Crops", message: error});

    }
});

module.exports = router;
