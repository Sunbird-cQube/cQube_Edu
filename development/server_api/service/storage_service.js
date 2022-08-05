const { reject } = require("lodash");
const AwsConfig = require("../core/config/aws-config");
const { blobServiceClient, inputContainerName, outputContainerName } = require("../core/config/azure-config");

const storageServices = {
    AZURE_DATA_LAKE: "AZURE_DATA_LAKE",
    AWS_S3: "AWS_S3"
};
const storageServiceType = process.env.STORAGE_SERVICE;

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
                await AwsConfig.s3.headObject({ Bucket: AwsConfig.params.OutputBucket, Key: fileName }).promise();
                const response = await AwsConfig.s3.getObject({ Bucket: AwsConfig.params.OutputBucket, Key: fileName }).promise();
                resolve(JSON.parse(response.Body.toString('utf-8')));
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
			    AwsConfig.s3.deleteObject({ Bucket: AwsConfig.params.OutputBucket, Key: filePath }, function(s3Err, data) {
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

module.exports = { getAllFiles, getFileData, getFileRawData, uploadFile };
