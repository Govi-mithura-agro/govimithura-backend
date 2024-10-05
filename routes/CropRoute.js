const express = require('express');
const router = express.Router();
const CropData = require('../models/CropData');

router.route('/addcropdata').post(async (req, res) => {
    const {
        crop,
        cropName,
        scientificName,
        plantingSeason,
        soilType,
        growthDuration,
        averageYield,
        waterRequirements,
        region,
        description
    } = req.body;

    try {
        // Check if a crop with the same scientific name already exists
        const existingCrop = await CropData.findOne({ scientificName: scientificName });
        if (existingCrop) {
            return res.status(400).json({
                status: "Error",
                message: "A crop with this scientific name already exists in the database."
            });
        }

        // If no existing crop found, proceed with creating a new one
        const newCropData = new CropData({
            crop,
            cropName,
            scientificName,
            plantingSeason,
            soilType,
            growthDuration,
            averageYield,
            waterRequirements,
            region,
            description
        });

        await newCropData.save();
        return res.status(200).json({ status: "Crop details are added successfully" });
    } catch (error) {
        return res.status(500).json({ status: "Error with adding crop details", message: error.message });
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

router.route('/getcropdata/:province').get(async (req, res) => {
    const cropProvince = req.params.province;

    try {
        // Use MongoDB's $in operator to check if the province is in the region array
        const crop = await CropData.find({ region: { $in: [cropProvince] } });

        if (!crop || crop.length === 0) {
            return res.status(404).json({ status: "Crop not found" });
        }

        return res.status(200).json({ status: "Crop is fetched", crop });

    } catch (error) {
        return res.status(500).json({ status: "Error with fetch Crop", message: error });
    }
});


router.route('/editcrop/:id').put(async (req, res) =>{

    const cropID = req.params.id;

    const {
        crop,
        cropName,
        scientificName,
        plantingSeason,
        soilType,
        growthDuration,
        averageYield,
        waterRequirements,
        region,
        description
    } = req.body;

    const editcrop = {
        crop,
        cropName,
        scientificName,
        plantingSeason,
        soilType,
        growthDuration,
        averageYield,
        waterRequirements,
        region,
        description
    }
    
    try {
        
        await CropData.findByIdAndUpdate(cropID , editcrop);
        return res.status(200).json({status: "Crop updated"});

    } catch (error) {
        
        return res.status(500).json({status: "Error with update crop", message: error});

    }
});

router.route('/deletecrop/:id').delete(async (req, res) => {

    const cropId = req.params.id;

    try {
        
        await CropData.findByIdAndDelete(cropId);
        return res.status(200).json({status : "Crop is deleted"});

    } catch (error) {
        
        return res.status(400).json({status : "Error with delete crop", message : error});

    }
});


module.exports = router;
