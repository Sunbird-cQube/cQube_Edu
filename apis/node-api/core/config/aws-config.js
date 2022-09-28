const aws = require('aws-sdk');

// Initialize dotenv
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

let s3 = new aws.S3({ 'accessKeyId': accessKeyId, 'secretAccessKey': secretAccessKey });

let params = {
    InputBucket: process.env.INPUT_BUCKET_NAME, //replace example bucket with your s3 bucket name
    OutputBucket: process.env.OUTPUT_BUCKET, //replace example bucket with your s3 bucket name
    Key: '', // replace file location with your s3 file location
};

module.exports = {s3, params};
