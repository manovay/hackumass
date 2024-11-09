// Sets up the Express server
// recieves file and upload request, sends to aws using dataController.js and s3.js
require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const route = require('./routes/dataRoutes.js');

const app = express();
const Port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/data', route);

app.listen(Port, ()=> {
    console.log("Currently running on port,", Port);
})