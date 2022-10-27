const router = require('express').Router();
const { logger } = require('../../lib/logger');
const auth = require('../../middleware/check-auth');
var const_data = require('../../lib/config');
const fs = require('fs');
const config = require('../../lib/readFiles');
const { BlobServiceClient } = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONN_STR
  );

const inputDir = `${process.env.EMISSION_DIRECTORY}/`;
var path = require('path');
const { params } = require('../../../../../node-api/core/config/aws-config');
router.post('/', auth.authController, async (req, res) => {
    try {
        logger.info('--- telemetry api ---');
      
        //check if file is there, and append new data
        var formData = req.body.formData;
        var timeStamp = req.body.timeStamp;
        let storageType = config.storageType;
        var fileName = `data_replay_${timeStamp}.json`;
        if (req.body.dataType == 'retention') {
            formData = req.body.retData;
            fileName = `data_retention.json`;
        }
        var params = {
            Bucket: const_data['getParams1']['Bucket'],
            Key: fileName
        };
        console.log("emission name",params.Bucket);
        var localPath = inputDir + fileName;
        var response = await storageType == "s3" ? await saveToS3(params, fileName, formData) : storageType == "azure"?await saveToAzure(params, fileName, formData) :await saveToLocal(localPath, formData);

        res.status(200).json(response);
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
});

module.exports = router


function saveToS3(params, fileName, formData) {
    console.log("S3 bucket");
    return new Promise((resolve, reject) => {
        try {
            const_data['s3'].headObject(params, function (err, metadata) {
                if (err && err.code === 'NotFound') {
                    //=====================Upload new files..........
                    var params1 = {
                        Bucket: const_data['getParams1']['Bucket'],
                        Key: fileName,
                        Body: JSON.stringify(formData)
                    };
                    const_data['s3'].upload(params1, function (error, result) {
                        if (error) {
                            reject({ errMsg: "Internal error" });
                        } else {
                            logger.info('--- upload new file successful1---');
                            resolve({ msg: "Data Replay Operation Successfully Initiated" });
                        }
                    });
                } else {
                    const_data['s3'].getSignedUrl('getObject', params, (erro, response) => {
                        const_data['getParams1']['Key'] = fileName;
                        const_data['s3'].getObject(const_data['getParams1'], function (error, data) {
                            if (error) {
                                logger.error(error);
                                reject({ errMsg: "Something went wrong" });
                            } else if (!data) {
                                logger.error("No data found in s3 file");
                                reject({ errMsg: "No such data found" });
                            } else {
                                let dataObj = formData;
                                params1 = {
                                    Bucket: const_data['getParams1']['Bucket'],
                                    Key: fileName,
                                    Body: JSON.stringify(dataObj)
                                };
                                const_data['s3'].upload(params1, function (e, result) {
                                    if (e) {
                                        reject({ errMsg: "Internal error" });
                                    } else {
                                        logger.info('--- update to file successful---');
                                        resolve({ msg: "Data Replay Operation Successfully Initiated" });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        } catch (e) {
            reject(e);
        }
    })
}
function saveToLocal(fileName, formData) {
    console.log("local");
    
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(fileName)) {
    
                var data = JSON.parse(fs.readFileSync(fileName).toString());
                data = formData;
                fs.writeFile(fileName, JSON.stringify(data), (err) => {
                    if (!err) {
                        logger.info('--- file data updated successfully1---');
                        resolve({ msg: "Data Replay Operation Successfully Initiated1" });
                    } else {
                        console.log('err1', err)
                        reject({ errMsg: "Internal error" });
                    }
                })
            } else {
              
                const dirname = path.dirname(fileName);
                fs.mkdir(dirname, { recursive: true }, (err) => {
                    if (err) {
                        console.log('err2', err)
                        reject({ errMsg: "Internal error" });
                    } else {
                        fs.writeFile(fileName, JSON.stringify(formData), (err) => {
                            console.log('elseenters')
                            if (!err) {
                                logger.info('--- upload new file successful2---');
                                resolve({ msg: "Data Replay Operation Successfully Initiated2" });
                            } else {
                                console.log('err2', err)
                                reject({ errMsg: "Internal error" });
                            }
                        })
                    }

                })
              
            }
        } catch (e) {
            console.log('error', e)
            reject(e);
        }
    })

}

function saveToAzure(params, fileName, formData)
{
    
        return new Promise(async function (resolve, reject) {
                try {
                    console.log("bucket name azure:", params.Bucket);
                    let containerClient = blobServiceClient.getContainerClient(params.Bucket);
                    const blockBlobClient = containerClient.getBlockBlobClient(`${fileName}`);
                    let stringObj = JSON.stringify(formData);
                    console.log("string ob is", stringObj);
                    const uploadBlobResponse = await blockBlobClient.upload(stringObj, stringObj.length);
                    console.log("uploadBlob response", uploadBlobResponse);
                    console.log("File uploaded through Azure")
                    console.log('Uploaded');
                    // deleteFile(fileName);
                    resolve({ msg: "Data Replay Operation Successfully Initiated" });
                } catch(e) {
                    reject(e);
                }
            });
}

const deleteFile = async (filePath) => {
        return new Promise(async function (resolve, reject) {
                try {
                    let containerClient = blobServiceClient.getContainerClient(const_data['getParams1']['Bucket']);
                    const blockBlobClient = containerClient.getBlockBlobClient(filePath);
                    blockBlobClient.delete({ deleteSnapshots: "include" });
                    resolve('Success');
                } catch(e) {
                    reject(e);
                }
        });
    }




    // }
    // const response =   uploadFile();

// function saveToAzure(fileName, formData) {
 
//     return new Promise((resolve, reject) => {
//         try {

           
//         } catch (e) {

//             reject(e);
//         }
//     })
// }
