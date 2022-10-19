var const_data = require('./config');
const { logger } = require('./logger');
const fs = require('fs')
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
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONN_STR;
    var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var containerName = process.env.AZURE_OUTPUT_STORAGE;
}


//reading file from azure
const readFromBlob = async (blobName) => {
    let container = containerName;
    return new Promise((resolve, reject) => {
        blobService.getBlobToText(container, blobName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
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

const getFileMetaData = async (fileName) => {
    return new Promise(async (resolve, reject) => {
        if (storageType == "s3") {
            try {
                const_data['getParams']['Key'] = fileName;
                const_data['s3'].headObject(const_data['getParams'], function(err, data) {
                    if (err) {
                        reject("No file found in the specified path");
                        return;
                    }
    
                    resolve({
                        lastModified: data.LastModified
                    });
                });
            } catch(e) {
                reject(e);
            }
        } else if (storageType == 'local') {
            try {
                fs.stat(path.join(baseDir, fileName), (err, stats) => {
                    if (err) {
                        reject("No file found in the specified path");
                        return;
                    }
    
                    resolve({
                        lastModified: stats.mtime,
                        createdOn: stats.ctime
                    });
                })
            } catch(e) {
                reject(e);
            }
        } else if (storageType == 'azure') {
            try {
                let containerClient = blobService.getContainerClient(containerName);
                const blockBlobClient = containerClient.getBlockBlobClient(fileName);
                const metaData = await blockBlobClient.getProperties();
                
                resolve({
                    lastModified: metaData.lastModified,
                    createdOn: metaData.createdOn
                });
            } catch(e) {
                reject(e);
            }
        };
    });
}

module.exports = {
    readFileConfig, storageType, getFileMetaData
};