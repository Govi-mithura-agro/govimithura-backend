const express = require("express");
const router = express.Router();
const farmerModel = require("../models/Farmer");

const generateUniqueID = async () => {
  let id = "F" + Math.floor(10000000 + Math.random() * 90000000);
  const existingFarmer = await farmerModel.findOne({ farmerID: id });
  if (existingFarmer) {
    return generateUniqueID();
  }
  return id;
};

router.post("/addFarmer", async (req, res) => {
  console.log('Request received:', req.body); // Log the request body
  const farmerData = req.body;
  try {
    const farID = await generateUniqueID();
    farmerData.farmerID = farID;
    const newFarmer = new farmerModel(farmerData);
    await newFarmer.save();
    res.status(201).send("Farmer added successfully");
  } catch (error) {
    console.error('Error adding farmer:', error); // Log the error
    res.status(400).json({ message: error.message });
  }
});


router.get("/getAllFarmers", async (req, res) => {
  try {
    // Check for existing email and username
    const existingEmail = await farmerModel.findOne({
      email: farmerData.email,
      farmerID: { $ne: farmerID },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await farmerModel.findOne({
      username: farmerData.username,
      farmerID: { $ne: farmerID },
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const farmers = await farmerModel.find();
    if (farmers.length === 0) {
      return res.status(404).json({ message: "No farmers found" });
    }
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/editFarmer", async (req, res) => {
  const farmerData = req.body;
  const farmerID = farmerData.farmerID; // Ensure this is the correct field
  try {
    console.log('Received farmerData:', farmerData);

    const updatedFarmer = await farmerModel.findOneAndUpdate(
      { farmerID: farmerID }, // Ensure this matches the field used in the schema
      farmerData,
      { new: true, runValidators: true } // Use runValidators to ensure schema validation
    );

    if (updatedFarmer) {
      console.log('Farmer updated successfully:', updatedFarmer);
      res.send("Farmer updated successfully");
    } else {
      console.log('Farmer not found with ID:', farmerID);
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (error) {
    console.error('Error updating farmer:', error.message);
    res.status(500).json({ message: "Database error", error: error.message });
  }
});


router.post("/verifyFarmer", async (req, res) => {
  const farmerData = req.body;
  const farmerID = farmerData.farmerID;
  try {
    await farmerModel.findOneAndUpdate(
      { farmerID: farmerID },
      { status: "Verified" },
      { new: true }
    );
    res.send("Farmer Verified successfully");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/getFarmerByID", async (req, res) => {
  const farmerData = req.body;
  const farmerID = farmerData.farmerID;
  try {
    const farmer = await farmerModel.findOne({ farmerID: farmerID });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.status(200).json(farmer);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
