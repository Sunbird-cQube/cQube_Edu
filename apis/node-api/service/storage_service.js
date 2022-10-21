const fs = require("fs");
const path = require("path");

const storageServices = {
    AZURE_DATA_LAKE: "AZURE_DATA_LAKE",
    AWS_S3: "AWS_S3",
    ON_PREMISE: "ON_PREMISE"
};
const storageServiceType = process.env.STORAGE_SERVICE;
if(storageServiceType === storageServices.AZURE_DATA_LAKE) {
    var { blobServiceClient, inputContainerName, outputContainerName } = require("../core/config/azure-config");
}
else if(storageServiceType === storageServices.AWS_S3) {
    var AwsConfig = require("../core/config/aws-config");
}

const getAllFiles = async () => {
    return new Promise(async function (resolve, reject) {
        try {
            if (storageServiceType === storageServices.AZURE_DATA_LAKE) {
                let containerClient = blobServiceClient.getContainerClient(inputContainerName);
                // List the blob(s) in the container.
                let filePaths = [];
                for await (const blob of containerClient.listBlobsFlat()) {
                    filePaths.push(blob.name);
                }
                resolve(filePaths);
            } else if (storageServiceType === storageServices.AWS_S3) {
                AwsConfig.s3.listObjectsV2({ Bucket: AwsConfig.params.InputBucket }, function (err, listObjectRes) {
                    if (err) {
                        reject("Invalid AWS S3 credentials or can't connect to the server");
                        return;
                    }
    
                    const filePaths = listObjectRes.Contents.filter((content, ind) => content.Key.split('/').slice(-1).length > 0 && content.Key.split('/').slice(-1)[0] !== '').map(file => file.Key);
                    resolve(filePaths);
                });
            } else if (storageServiceType === storageServices.ON_PREMISE) {
                console.log(process.env.INPUT_DIR);
                fs.readdir(process.env.INPUT_DIR, (err, files) => {
                    if (err) {
                        reject("Invalid input directory");
                        return;
                    }

                    resolve(files);
                });
            }
        } catch(e) {
            reject(e);
        }
    });
}

const getFileData = async (fileName) => {
    return new Promise(async function (resolve, reject) {
        try {
            if (storageServiceType === storageServices.AZURE_DATA_LAKE) {
                let containerClient = blobServiceClient.getContainerClient(outputContainerName);
                const blockBlobClient = containerClient.getBlockBlobClient(fileName);
                const downloadBlockBlobResponse = await blockBlobClient.download(0);
                resolve(JSON.parse(await streamToText(downloadBlockBlobResponse.readableStreamBody)));
            } else if (storageServiceType === storageServices.AWS_S3) {
                //await AwsConfig.s3.headObject({ Bucket: AwsConfig.params.OutputBucket, Key: fileName }).promise();
                const response = await AwsConfig.s3.getObject({ Bucket: AwsConfig.params.OutputBucket, Key: fileName }).promise();
                resolve(JSON.parse(response.Body.toString('utf-8')));
            } else if (storageServiceType === storageServices.ON_PREMISE) {
                fs.readFile(path.join(process.env.OUTPUT_DIR, fileName), {encoding: 'utf-8'}, function(err, data) {
                    if (err) {
                        reject("No file found in the specified path");
                        return;
                    }

                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        reject("Error while reading the file");
                    }
                });
            }
        } catch(e) {
            reject(e);
        }
    });
}

const getFileRawData = async (fileName) => {
    return new Promise(async function (resolve, reject) {
        if (storageServiceType === storageServices.AZURE_DATA_LAKE) {
            try {
                let containerClient = blobServiceClient.getContainerClient(inputContainerName);
                const blockBlobClient = containerClient.getBlockBlobClient(fileName);
                const downloadBlockBlobResponse = await blockBlobClient.download(0);
                resolve(streamToBuffer(downloadBlockBlobResponse.readableStreamBody));
            } catch(e) {
                reject(e);
            }
        } else if (storageServiceType === storageServices.AWS_S3) {
            try {
			    const response = await AwsConfig.s3.getObject({ Bucket: AwsConfig.params.InputBucket, Key: fileName }).promise();
                resolve(response.Body);
            } catch(e) {
                reject(e);
            }
        } else if (storageServiceType === storageServices.ON_PREMISE) {
            fs.readFile(path.join(process.env.INPUT_DIR, fileName), function(err, data) {
                if (err) {
                    reject("No file found in the specified path");
                    return;
                }

                try {
                    resolve(data);
                } catch (err) {
                    reject("Error while reading the file");
                }
            });
        }
    });
}

const uploadFile = async (filePath, fileName, data) => {
    return new Promise(async function (resolve, reject) {
        if (storageServiceType === storageServices.AZURE_DATA_LAKE) {
            try {
                let containerClient = blobServiceClient.getContainerClient(outputContainerName);
                const blockBlobClient = containerClient.getBlockBlobClient(`${fileName}.json`);
                let stringObj = JSON.stringify(data);
                const uploadBlobResponse = blockBlobClient.upload(stringObj, stringObj.length);
                deleteFile(filePath);
                resolve('Success');
                console.log('Uploaded');
            } catch(e) {
                reject(e);
            }
        } else if (storageServiceType === storageServices.AWS_S3) {
            try {
			    AwsConfig.s3.putObject({ Bucket: AwsConfig.params.OutputBucket, Key: `${fileName}.json`, Body: JSON.stringify(data) }, function(s3Err, data) {
                    deleteFile(filePath);
                    resolve('Success');
                });
            } catch(e) {
                reject(e);
            }
        } else if (storageServiceType === storageServices.ON_PREMISE) {
            fs.writeFile(path.join(process.env.OUTPUT_DIR, `${fileName}.json`), JSON.stringify(data), 'utf8', function(err, data) {
                if (err) {
                    reject("No file found in the specified path");
                    return;
                }

                try {
                    deleteFile(filePath);
                    resolve('Success');
                } catch (err) {
                    reject("Error while deleting the file");
                }
            });
        }
    });
}

const deleteFile = async (filePath) => {
    return new Promise(async function (resolve, reject) {
        if (storageServiceType === storageServices.AZURE_DATA_LAKE) {
            try {
                let containerClient = blobServiceClient.getContainerClient(inputContainerName);
                const blockBlobClient = containerClient.getBlockBlobClient(filePath);
                blockBlobClient.delete({ deleteSnapshots: "include" });
                resolve('Success');
            } catch(e) {
                reject(e);
            }
        } else if (storageServiceType === storageServices.AWS_S3) {
            try {
			    AwsConfig.s3.deleteObject({ Bucket: AwsConfig.params.InputBucket, Key: filePath }, function(s3Err, data) {
                    resolve('Success');
                });
            } catch(e) {
                reject(e);
            }
        } else if (storageServiceType === storageServices.ON_PREMISE) {
            try {
			    fs.unlink(path.join(process.env.INPUT_DIR, filePath), function(err) {
                    console.log(err);
                    resolve('Success');
                });
            } catch(e) {
                reject(e);
            }
        }
    });
}

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
}

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on('error', reject);
    });
}

const getFileMetaData = async (filePath) => {
    return new Promise(async function (resolve, reject) {
        if (storageServiceType === storageServices.AZURE_DATA_LAKE) {
            try {
                let containerClient = blobServiceClient.getContainerClient(outputContainerName);
                const blockBlobClient = containerClient.getBlockBlobClient(filePath);
                const metaData = await blockBlobClient.getProperties();
                
                resolve({
                    lastModified: metaData.lastModified,
                    createdOn: metaData.createdOn
                });
            } catch(e) {
                reject(e);
            }
        } else if (storageServiceType === storageServices.AWS_S3) {
            try {
			    AwsConfig.s3.headObject({ Bucket: AwsConfig.params.OutputBucket, Key: filePath }, function(err, data) {
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
        } else if (storageServiceType === storageServices.ON_PREMISE) {
            try {
                fs.stat(path.join(process.env.OUTPUT_DIR, filePath), (err, stats) => {
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
        }
    });
}

module.exports = { getAllFiles, getFileData, getFileRawData, uploadFile, getFileMetaData };
