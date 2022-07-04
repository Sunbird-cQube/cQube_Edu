const path = require('path');
const csv = require('csvtojson');
const _ = require('lodash');

exports.getNasMetrics = (req, res, next) => {
    return new Promise(async function (resolve, reject) {
        let NASMetrics = require(path.join(__dataFolderPath, 'nas/NasMenu.json'));
        try {
            res.status(200).send({
                status: 200,
                result: NASMetrics
            })
        } catch (error) {
            res.send({
                status: error.status || 500,
                message: error.message || "Internal server error",
                errorObject: error
            });
        }
    });
}