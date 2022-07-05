const path = require('path');
const csv = require('csvtojson');
const _ = require('lodash');

const data = require('../../data/nas/NasMenu.json')

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

exports.getStateWiseNasData = (req, res, next) => {
    return new Promise(async function (resolve, reject) {
        let NasData = require(path.join(__dataFolderPath, 'nas/NasStateLotable.json'));
        let columns = [
            {
                name: 'State Name',
                property: 'State Name'
            },
            {
                name: 'Total Physical',
                property: 'Total Physical textbooks excluding adopted (Curriculum+Supplementary)',
                isHeatMapRequired: true,
                color: '#ffb300'
            },
            {
                name: 'State energised (ETB)',
                property: 'State energised (ETB)',
                isHeatMapRequired: true,
                color: '#ffab91'
            },
            {
                name: 'ETB Coverage',
                property: 'ETB Coverage',
                isHeatMapRequired: true,
                color: '#81c784'
            }
        ];

        try {
            res.status(200).send({
                status: 200,
                result: {
                    columns,
                    data: NasData
                }
            })
        } catch (error) {
            res.send({
                status: error.status || 500,
                message: error.message || "Internal server error",
                errorObject: error
            });
        }


    })
}
