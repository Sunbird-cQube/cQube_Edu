const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONN_STR;
const inputContainerName = process.env.INPUT_CONTAINER;
const outputContainerName = process.env.OUTPUT_CONTAINER;

// Create the BlobServiceClient object which will be used to create a container client
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
);

//module.exports = { inputContainerClient, outputContainerClient };
module.exports = { blobServiceClient, inputContainerName, outputContainerName };
