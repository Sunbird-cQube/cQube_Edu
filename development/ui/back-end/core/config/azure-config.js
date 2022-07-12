const {
    AzureStorageDataLake,
    DataLakeServiceClient,
    StorageSharedKeyCredential
} = require("@azure/storage-file-datalake");

const accountName = process.env.STORAGE_ACCOUNT_NAME;
const accountKey = process.env.STORAGE_ACCOUNT_KEY;
const inputContainerName = process.env.INPUT_CONTAINER_NAME;
const outputContainerName = process.env.OUTPUT_CONTAINER_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  
const datalakeServiceClient = new DataLakeServiceClient(`https://${accountName}.dfs.core.windows.net`, sharedKeyCredential);

function CreateFileSystem(datalakeServiceClient, containerName) {
    const fileSystemName = containerName;
    const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
    return fileSystemClient;
}

const inputContainerClient = CreateFileSystem(datalakeServiceClient, inputContainerName);
const outputContainerClient = CreateFileSystem(datalakeServiceClient, outputContainerName);


module.exports = { inputContainerClient, outputContainerClient };
