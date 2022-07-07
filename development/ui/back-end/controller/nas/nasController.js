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
                name: 'Indicator',
                property: 'Indicator'
            },
            {
                name: 'Grade',
                property: 'Grade'
            },
            {
                name: 'Subject',
                property: 'Subject'
            }
        ];

        Object.keys(NasData[0]).forEach((col, ind) => {
            if (ind > 2) {
                columns.push({
                    name: col,
                    property: col,
                    isHeatMapRequired: true,
				    color: [
                        "#81c784",
                        "#ffb300",
                        "#ffab91"
                    ]
                })
            }
        });

        NasData = NasData.map(rec => {
            Object.keys(rec).forEach((col, ind) => {
                if (ind > 2) {
                    rec[col] = isNaN(rec[col]) ? rec[col] : Number(Number(rec[col]).toFixed(2))
                }
            });

            return rec;
        });

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
