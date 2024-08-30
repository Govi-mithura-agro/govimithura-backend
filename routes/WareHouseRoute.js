const express = require('express');
const router = express.Router();
const Warehouse = require('../models/Warehouse')

//add ware house 
router.post("/addwarehouse", async (req, res) => {

    const { warehouseID,warehouseName, district, province, phone,capacity } = req.body; 

    try {
        const new_warehouse = new Warehouse({ 
            warehouseID,
            warehouseName,
            district,
            province,
            phone,
            capacity

        });

        const request = await new_warehouse.save(); 

        res.send("Warehouse added Successfully!");
    } catch (error) {
        return res.status(400).json({ error });
    }
});


//get all ware house
router.get("/getallwarehouse",async(req,res)=>{

    try {
        const warehouse = await Warehouse.find()
        return res.json(warehouse);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});



  //getwarehouse
router.route("/getwarehouse/:id").post(async (req, res) => {
    const warehouseid = req.params.id;
  
    try {
      const warehouse = await Warehouse.findById(warehouseid);
      return res.status(200).json({ status: "Warehouse is fatched", warehouse });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Error with fatch warehouse", message: error });
    }
  });
  
 //update warehouse
router.route("/updatewarehouse/:id").put(async (req, res) => {
  const warehouseid = req.params.id;

  const { warehouseName, district, province, phone, capacity } = req.body; 

  const updatewarehouse = {
      warehouseName,
      district,
      province,
      phone,
      capacity
  };

  try {
    await Warehouse.findByIdAndUpdate(warehouseid, updatewarehouse);
    return res.status(200).json({ status: "Warehouse updated" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Error with update Warehouse", message: error.message });
  }
});

  
  //delete warehouse
router.route("/delete/:id").delete(async (req, res) => {
    const warehouseid = req.params.id;
  
    try {
      await Warehouse.findByIdAndDelete(warehouseid);
      return res.status(200).json({ status: "Warehouse deleted" });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Error with delete warehouse", massage: error });
    }
  });

module.exports = router;
