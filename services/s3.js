// Hnadles upload and retrieval of file with s3
const AWS = require('aws-sdk');
const fs = require('fs');




const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

exports.uploads3 = async (file) => {
    const data = fs.readFileSync(file.path);
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key:'uploads/' + Date.now() + '_' + file.originalname,  // makes so that each file is original named
        Body: data
    }


    const result = await s3.upload(params).promise();
    return result.location;
};

exports.downloads3 = async (filename) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: 'processed/${filename}'   
    };

    return s3.getSignedUrlPromise('getObject', params);
};