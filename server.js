const express = require("express");
const dotenv = require('dotenv');
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Sample data for Sri Lankan provinces, districts
const locations = [
  { province: "North Central", district: "Anuradhapura", coordinates: [8.3114, 80.4037] },
  { province: "North Central", district: "Polonnaruwa", coordinates: [7.9403, 81.0181] },
  { province: "Southern", district: "Galle", coordinates: [6.0535, 80.2210] },
  { province: "Western", district: "Colombo", coordinates: [6.9271, 79.8612] },
  { province: "Western", district: "Gampaha", coordinates: [7.0915, 79.9999] },
  { province: "Western", district: "Kalutara", coordinates: [6.5854, 79.9607] },
  { province: "Southern", district: "Matara", coordinates: [5.9549, 80.5481] },
  { province: "Southern", district: "Hambantota", coordinates: [6.1248, 81.1185] },
  { province: "Eastern", district: "Ampara", coordinates: [7.3023, 81.6745] },
  { province: "Eastern", district: "Batticaloa", coordinates: [7.7102, 81.6924] },
  { province: "Eastern", district: "Trincomalee", coordinates: [8.5874, 81.2152] },
  { province: "Northern", district: "Jaffna", coordinates: [9.6615, 80.0255] },
  { province: "Northern", district: "Kilinochchi", coordinates: [9.3803, 80.3990] },
  { province: "Northern", district: "Mannar", coordinates: [8.9814, 79.9040] },
  { province: "Northern", district: "Vavuniya", coordinates: [8.7543, 80.4976] },
  { province: "Northern", district: "Mullaitivu", coordinates: [9.2671, 80.8145] },
  { province: "Central", district: "Kandy", coordinates: [7.2906, 80.6337] },
  { province: "Central", district: "Matale", coordinates: [7.4704, 80.6234] },
  { province: "Central", district: "Nuwara Eliya", coordinates: [6.9497, 80.7891] },
  { province: "Uva", district: "Badulla", coordinates: [6.9930, 81.0556] },
  { province: "Uva", district: "Monaragala", coordinates: [6.8721, 81.3507] },
  { province: "Sabaragamuwa", district: "Ratnapura", coordinates: [6.6828, 80.3992] },
  { province: "Sabaragamuwa", district: "Kegalle", coordinates: [7.2501, 80.3464] },
  { province: "North Western", district: "Kurunegala", coordinates: [7.4869, 80.3659] },
  { province: "North Western", district: "Puttalam", coordinates: [8.0362, 79.8570] }
];


  // Endpoint to get all districts
app.get("/api/locations", (req, res) => {
    res.json(locations);
  });
  
  // Endpoint to get districts by province
  app.get("/api/locations/:province", (req, res) => {
    const { province } = req.params;
    const filteredLocations = locations.filter(location => location.province === province);
    res.json(filteredLocations);
  });

const dbconfig = require('./db');
const farmersRoute = require('./routes/FarmersRoute');
const employeesRoute = require('./routes/EmplyeesRoute');
const cropRoute = require('./routes/CropRoute');
const fertilizerRoute = require('./routes/FertilizerRoute');
const warehouseRoute = require('./routes/WareHouseRoute');
const appoinmentRoute = require('./routes/AppointmentRoute');
const MapTemplateRoute = require('./routes/MapTemplateRoute.js');
const CropPredictionFactorsRoute = require('./routes/CropPredictionFactorsRoute');


app.use('/api/farmers', farmersRoute);
app.use('/api/employees', employeesRoute);
app.use('/api/crops', cropRoute);
app.use('/api/fertilizers', fertilizerRoute);
app.use('/api/warehouses', warehouseRoute);
app.use('/api/appoinments', appoinmentRoute);
app.use('/api/mapTemplate', MapTemplateRoute);
app.use('/api/cropfactors', CropPredictionFactorsRoute);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
