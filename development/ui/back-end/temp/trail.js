require("dotenv").config();
const csvToJson = require('convert-csv-to-json');
const path = require('path');
const AwsConfig = require("../core/config/aws-config");

//let reportRawData = csvToJson.formatValueByType().fieldDelimiter(',').getJsonFromCsv(path.join(__dirname, 'addresses.csv'));
//console.log(reportRawData);


async function isFileExist() {
    try {
        console.log(AwsConfig);
        console.log({ Bucket: AwsConfig.params.Bucket, Key: `${process.env.ROOT_FOLDER}/converted/nas/nas_data.json` });
        await AwsConfig.s3.headObject({ Bucket: AwsConfig.params.Bucket, Key: `${process.env.ROOT_FOLDER}/converted/nas/nas_data.json` }).promise();
        const response = await AwsConfig.s3.getObject({ Bucket: AwsConfig.params.Bucket, Key: `${process.env.ROOT_FOLDER}/converted/nas/nas_data.json` }).promise();
		const fileContent = JSON.parse(response.Body.toString('utf-8'));
        // Do stuff with signedUrl
        console.log(fileContent[0])
      } catch (error) {
        if (error.name === 'NotFound') {
          // Handle no object on cloud here...
          console.log("Error");
        } else {
          // Handle other errors here....
          console.log(error)
        }
    }
}

isFileExist();