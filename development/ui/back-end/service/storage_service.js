const { reject } = require("lodash");
const AwsConfig = require("../core/config/aws-config");
const { inputContainerClient, outputContainerClient } = require("../core/config/azure-config");

const storageServices = {
    AZURE_DATA_LAKE: "AZURE_DATA_LAKE",
    AWS_S3: "AWS_S3"
};
const storageServiceType = process.env.STORAGE_SERVICE;

const getAllFiles = async () => {
    return new Promise(async function (resolve, reject) {
        if (storageServiceType === storageServices.AZURE_DATA_LAKE) {
            let iter = await inputContainerClient.listPaths({path: "dashboard", recursive: true});
            console.log(iter);
            for await (const path of iter) {

                console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
              }
            resolve(iter);
        } else if (storageServiceType === storageServices.AWS_S3) {
            AwsConfig.s3.listObjectsV2({ Bucket: AwsConfig.params.InputBucket }, function (err, listObjectRes) {
                if (err) {
                    reject("Invalid AWS S3 credentials or can't connect to the server");
                    return;
                }

                const filePaths = listObjectRes.Contents.filter((content, ind) => content.Key.split('/').slice(-1).length > 0 && content.Key.split('/').slice(-1)[0] !== '');
                resolve(filePaths);
            });
        }
    });
}

module.exports = { getAllFiles };
