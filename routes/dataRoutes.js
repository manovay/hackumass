// Routes for fileupload, databricks trigger, and retrieving the download
const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/dataCOntroller');

const upload = multer({ dest: 'uploads/'});

router.post('/upload', upload.single('file'), controller.uploadFile);


router.get('/download', controller.getCleanedData);

module.exports = router;