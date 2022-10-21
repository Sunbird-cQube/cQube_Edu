const router = require('express').Router();
const { logger } = require('../../lib/logger');
const auth = require('../../middleware/check-auth');
var const_data = require('../../lib/config');
const { storageType } = require('../../lib/readFiles');
const glob = require("glob");
const { BlobServiceClient, StorageSharedKeyCredential,generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');
const storage  = require('@azure/storage-blob');


if(storageType === 'azure'){
    var azure = require('azure-storage');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONN_STR;
    
    var blobService = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
var containerName = process.env.AZURE_OUTPUT_STORAGE;
var conn_str_arr = process.env.AZURE_STORAGE_CONN_STR.split(";")
var account_name = conn_str_arr[1].split("=")[1];
var account_key = conn_str_arr[2].split("=")[1]
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
            console.log("S3 buckets are:", listBuckets);
        }  
        else if (storageType == "azure") {
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
                            let containerClient = blobService.getContainerClient(param.Bucket);
                            // List the blob(s) in the container.
                            let filePaths = [];
                            for await (const blob of containerClient.listBlobsFlat()) {
                                
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
        // const containerClient = blobService.getContainerClient(params.Bucket);
        // const blockBlobClient = containerClient.getBlockBlobClient(params.Key);
        // const downloadBlockBlobResponse = await blockBlobClient.downloadToFile();
        // console.log("\nDownloaded blob content...");
        // console.log("Blob is:",downloadBlockBlobResponse);
        const accountname =account_name;
        const key = account_key;
        console.log("storage")
        const cerds = new storage.StorageSharedKeyCredential(accountname,key);
        const blobServiceClient = new storage.BlobServiceClient(`https://${accountname}.blob.core.windows.net`,cerds);
        const containerName=params.Bucket;
        const client =blobServiceClient.getContainerClient(containerName)
        const blobName=params.Key;
        const blobClient = client.getBlobClient(blobName);

        const blobSAS = storage.generateBlobSASQueryParameters({
        containerName, 
        blobName, 
        permissions: storage.BlobSASPermissions.parse("racwd"), 
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 86400)
        },
        cerds 
        ).toString();
        
        const sasUrl= blobClient.url+"?"+ blobSAS;
        res.status(200).send({ downloadUrl: sasUrl })
        console.log("The SAS url is",sasUrl);
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