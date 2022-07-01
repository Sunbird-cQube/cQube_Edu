const path = require('path');
const fs = require('fs');

exports.getStateWiseETBCoverageData = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        let stateWiseETBCoverageData = require(path.join(__dataFolderPath, 'etb/StateWiseETBCoverageData.json'));

		try {
			res.status(200).send({
				status: 200,
				result: stateWiseETBCoverageData
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

exports.getStateWiseOverallETBCoverageData = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let stateWiseOverallETBCoverageData = require(path.join(__dataFolderPath, 'etb/StateWiseOverallETBCoverageData.json'));

		try {
			res.status(200).send({
				status: 200,
				result: stateWiseOverallETBCoverageData
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
