const path = require('path');
const { reportTypes, paths } = require("../../core/config/config");
var XLSX = require('xlsx');

exports.getReportData = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, dataSourceName, reportName, reportType } = req.params;
		let reqBody = req.body;

		try {
			if (!appName || !dataSourceName || !reportName || !reportType) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}	

			if (reportType === reportTypes.map) {
				getMapReportData(appName, dataSourceName, reportName, reportType, reqBody);
			} else {
				throw "Invalid report type";
			}
			
			res.status(200).send({
				status: 200,
				result: menu
			});
		} catch (error) {
			res.send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
		}
	});
}

function getMapReportData(appName, dataSourceName, reportName, reportType, reqBody) {
	
}

function getFileExtension(filename) {
	return filename.split('.').pop();	
}
