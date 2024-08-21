const express = require("express");
const router = express.Router();
const farmerModel = require("../models/farmer");

const generateUniquePwd = async () => {
  let id = Math.floor(10000000 + Math.random() * 90000000);
  return id;
};

const generateUniqueID = async () => {
  let id = "F" + Math.floor(10000000 + Math.random() * 90000000);
  const existingLeave = await employeeModel.findOne({ empID: id });
  if (existingLeave) {
    return generateUniqueID();
  }
  return id;
};

router.post("/addFarmer", async (req, res) => {
    const farmerData = req.body;
    const farID = await generateUniqueID();
    farmerData.farmerID = farID;
    const newFarmer = new farmerModel(farmerData);
    try {
        await newFarmer.save();
        res.status(201).send("Farmer added successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get("/getAllFarmers", async (req, res) => {
    try {
        const farmers = await farmerModel.find();
        console.log('Fetched Farmers:', farmers); // Debug output
        if (farmers.length === 0) {
            return res.status(404).json({ message: 'No farmers found' });
        }
        res.status(200).json(farmers);
    } catch (error) {
        console.error('Error fetching farmers:', error); // Debug output
        res.status(500).json({ message: 'Server error' });
    }
});
  

router.post("/editEmployee", async (req, res) => {
  const employeeData = req.body;
  const empID = employeeData.empID;
  try {
    const existingEmail = await employeeModel.findOne({
      email: employeeData.email,
      empID: { $ne: empID },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingUsername = await employeeModel.findOne({
      username: employeeData.username,
      empID: { $ne: empID },
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Database error", error: error });
  }

  try {
    await employeeModel.findOneAndUpdate({ empID: empID }, employeeData);
    res.send("Employee updated successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/suspendEmployee", async (req, res) => {
  const employeeData = req.body;
  const empID = employeeData.empID;
  try {
    await employeeModel.findOneAndUpdate(
      { empID: empID },
      { status: "Suspended" }
    );
    res.send("Employee suspended successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/activeEmployee", async (req, res) => {
  const employeeData = req.body;
  const empID = employeeData.empID;
  try {
    await employeeModel.findOneAndUpdate(
      { empID: empID },
      { status: "Active" }
    );
    res.send("Employee activated successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getEmployeeByUserID", async (req, res) => {
  const employeeData = req.body;
  const userID = employeeData.userID;
  try {
    const employee = await employeeModel.findOne({ userID: userID });
    res.send(employee);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
