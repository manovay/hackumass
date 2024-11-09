// Upload page where users can submit there files

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // To securely load environment variables

const app = express();

// Configure AWS S3
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Set up multer for temporary storage
const upload = multer({ dest: 'uploads/' });

// Upload route
app.post('/upload', upload.single('uploadedFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Prepare the upload parameters
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME, // Your bucket name
        Key: Date.now() + path.extname(req.file.originalname), // Unique file name
        Body: fs.createReadStream(req.file.path) // Read the file from local storage
    };

    // Upload file to S3
    s3.upload(uploadParams, (err, data) => {
        // Delete the file from local storage after upload
        fs.unlink(req.file.path, () => {});

        if (err) {
            return res.status(500).send(`Failed to upload to S3: ${err}`);
        }
        
        res.send(`File uploaded successfully! S3 URL: ${data.Location}`);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
