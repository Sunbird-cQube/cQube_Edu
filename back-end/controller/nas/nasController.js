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

exports.getStateWiseEnrollmentData = (req, res, next) => {
    return new Promise(async function (resolve, reject) {
        let version = req.params.version;
        const enrollmentData = await csv({
            trim: true,
            colParser: { "Total Enrollments": 'number', "Total Completion": 'number', "Total Certifications": 'number', "Certification %": 'number' }
        }).fromFile(path.join(__dataFolderPath, `nishtha/${version}/enrollment_data.csv`));

        let stateWiseEntrollmentData = _(enrollmentData)
            .groupBy('State')
            .map((objs, key) => ({
                'State': key,
                'Total Enrollments': _.sumBy(objs, 'Total Enrollments'),
                'Total Completion': _.sumBy(objs, 'Total Completion'),
                'Total Certifications': _.sumBy(objs, 'Total Certifications'),
                'Certification %': _.sumBy(objs, 'Certification %'),
            }))
            .value();

        try {
            res.status(200).send({
                status: 200,
                result: stateWiseEntrollmentData
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
