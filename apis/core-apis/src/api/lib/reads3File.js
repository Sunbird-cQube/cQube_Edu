var const_data = require('./config');
const { logger } = require('./logger');
const fs = require('fs');
const { BlobServiceClient } = require('@azure/storage-blob');
var baseDir = `${process.env.OUTPUT_DIRECTORY}`;
var storageType = `${process.env.STORAGE_TYPE}`;
const readS3File = (s3Key) => {
    return new Promise((resolve, reject) => {
        try {
            const_data['getParams']['Key'] = s3Key;
            const_data['s3'].getObject(const_data['getParams'], function (err, data) {
                if (err) {
                    logger.error(err);
                    reject({ errMsg: "Something went wrong" });
                } else if (!data) {
                    logger.error("No data found in s3 file");
                    reject({ errMsg: "No such data found" });
                } else {
                    var jsonData = JSON.parse(data.Body.toString());
                    resolve(jsonData)
                }
            });
        } catch (e) {
            reject(e)
        }
    })
}




const readLocalFile = (fileName) => {
    return new Promise((resolve, reject) => {
        try {
            fileName = baseDir + fileName;
            fs.readFile(fileName, function (err, data) {
                if (err) {
                    logger.error(err);
                    reject({ errMsg: "Something went wrong" });
                } else if (!data) {
                    logger.error("No data found in s3 file");
                    reject({ errMsg: "No such data found" });
                } else {
                    var jsonData = JSON.parse(data.toString());
                    resolve(jsonData)
                }
            });
        } catch (e) {
            reject(e)
        }
    })
}

//azure config
if(storageType === 'azure'){
    var azure = require('azure-storage');
    let AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONN_STR;
    // var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
    var containerName = process.env.AZURE_OUTPUT_STORAGE;
}


//reading file from azure
const readFromBlob = async (fileName) => {
    let container = containerName;
    console.log("The container name is:",containerName);
    return new Promise(async function(resolve, reject) {
        try {
            
                let containerClient = blobServiceClient.getContainerClient(containerName);
                const blockBlobClient = containerClient.getBlockBlobClient(fileName);
                const downloadBlockBlobResponse = await blockBlobClient.download(0);
                resolve(JSON.parse(await streamToText(downloadBlockBlobResponse.readableStreamBody)));
            
        }
        catch(e)
        {
            reject(e)
        }
    });
};

const readFileConfig = async (fileName) => {
    var data;
    if (storageType == "s3") {
        data = await readS3File(fileName);
    } else if (storageType == 'local') {
        data = await readLocalFile(fileName);
    } else if (storageType == 'azure') {
        data = await readFromBlob(fileName);
    };
    return data;
}

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
}

module.exports = {
    readFileConfig, storageType
};