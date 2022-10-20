const router = require('express').Router();
const { logger } = require('../../lib/logger');
const auth = require('../../middleware/check-auth');
var const_data = require('../../lib/config');
const { storageType } = require('../../lib/readFiles');
const glob = require("glob");
const { BlobServiceClient } = require('@azure/storage-blob');

if(storageType === 'azure'){
    var azure = require('azure-storage');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONN_STR;
    
    var blobService = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
var containerName = process.env.AZURE_OUTPUT_STORAGE;
}

router.post('/listBuckets', auth.authController, async function (req, res) {
    try {
        logger.info(`listbucket of ${storageType} api`);
        let listBuckets = {};
        if (storageType == "s3") {
            listBuckets = {
                'input': process.env.INPUT_BUCKET_NAME,
                'output': process.env.OUTPUT_BUCKET_NAME,
                'emission': process.env.EMISSION_BUCKET_NAME
            }
        }  
        if (storageType == "azure") {
            listBuckets = {
                'input': process.env.AZURE_INPUT_STORAGE,
                'output': process.env.AZURE_OUTPUT_STORAGE,
                'emission': process.env.AZURE_EMISSION_STORAGE
            }   
        }
        else {
            listBuckets = {
                'input': process.env.INPUT_DIRECTORY,
                'output': process.env.OUTPUT_DIRECTORY,
                'emission': process.env.EMISSION_DIRECTORY
            }
        }
        logger.info(`listfolder of ${storageType} api response sent`);
        res.status(200).send({ listBuckets, storageType: storageType == "s3" ? "bucket" : storageType == "azure"? "bucket":"folder" });
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/listFiles', auth.authController, async function (req, res) {
    try {
        logger.info(`listfiles of ${storageType} api`);
        const param = {
            Bucket: req.body.bucketName
        };
        if (storageType == "s3") {
            async function getAllKeys(params, allKeys = []) {
                const response = await const_data['s3'].listObjectsV2(params).promise();
                response.Contents.forEach(obj => allKeys.push(obj.Key));

                if (response.NextContinuationToken) {
                    params.ContinuationToken = response.NextContinuationToken;
                    await getAllKeys(params, allKeys); // RECURSIVE CALL
                }
                return allKeys;
            }
            const list = await getAllKeys(param);
            logger.info(`listfiles of ${storageType} api response sent`);
            res.status(200).send(list);
        }
        else if(storageType == "azure")
        {
            console.log("Azure api list files");
            const getAllFiles = async () => {
                return new Promise(async function (resolve, reject) {
                    try {
                            console.log("inside azure try")
                            let containerClient = blobService.getContainerClient(containerName);
                            // List the blob(s) in the container.
                            let filePaths = [];
                            for await (const blob of containerClient.listBlobsFlat()) {
                            console.log("blob names", blob.name);
                                
                                filePaths.push(blob.name);
                            }
                            resolve(filePaths); 
                        }
                        catch(e)
                        {
                            reject(e)
                        }
                    });
                }
            const list = await getAllFiles();
            res.status(200).send(list);


        }
        else {
            var getDirectories = function (src, callback) {
                glob(src + '/**/*', callback);
            };
            getDirectories(req.body.bucketName, function (err, response) {
                if (err) {
                    logger.error('Error', err);
                } else {
                    let list = response.filter(a => { return a.includes(".json") || a.includes(".zip") });
                    logger.info(`listfiles of ${storageType} api response sent`);
                    res.status(200).send(list);
                }
            });
        }
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

router.post('/getDownloadUrl', auth.authController, async function (req, res) {
    try {
        logger.info(`---list s3 Files for bucket ${req.body.bucketName} and fileName ${req.body.fileName} api ---`);
        const params = {
            Bucket: req.body.bucketName,
            Key: req.body.fileName,
            Expires: 60 * 5
        };
        console.log("The params are:", params);
        if(storageType === "s3")
        {
            const_data['s3_download'].getSignedUrl('getObject', params, (err, url) => {
                logger.info(`--- list ${storageType}  file for bucket response sent.. ---`);
                res.status(200).send({ downloadUrl: url })
            });
        }
       
        else if(storageType === "azure")
        {
        const containerClient = blobService.getContainerClient(params.Bucket);
        const blockBlobClient = containerClient.getBlockBlobClient(params.Key);
        const downloadBlockBlobResponse = await blockBlobClient.downloadToFile(params.Key);
        console.log("\nDownloaded blob content...");
        // const response = await streamToText(downloadBlockBlobResponse.blobBody)
        // console.log("Response is", response);
        console.log("Blob is:",downloadBlockBlobResponse);
        // res.status(200).send({ downloadUrl: response })

        }
        
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
  }


module.exports = router;