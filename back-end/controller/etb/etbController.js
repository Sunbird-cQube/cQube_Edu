const path = require('path');
const fs = require('fs');

exports.getETBMetrics = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        let ETBMetrics = require(path.join(__dataFolderPath, 'etb/ETBMetrics.json'));

		try {
			res.status(200).send({
				status: 200,
				result: ETBMetrics
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

exports.getStateWiseETBCoverageData = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
        let stateWiseETBCoverageData = require(path.join(__dataFolderPath, 'etb/StateWiseETBCoverageData.json'));
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
					data: stateWiseETBCoverageData
				}
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
