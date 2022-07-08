const path = require('path');
const { reportTypes, dataSourceInfo, appNames } = require("../../core/config/config");
const XLSX = require('xlsx');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
const _ = require('lodash');

exports.getReportData = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let reqBody = req.body;
		let reportData;

		try {
			if (!reqBody.appName || !reqBody.dataSourceName || !reqBody.reportName || !reqBody.reportType || (reqBody.appName === appNames.vsk && !reqBody.stateCode)) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			reqBody.stateCode = reqBody.stateCode.toLowerCase();
			let dataSourcePath = dataSourceInfo[reqBody.dataSourceName][reqBody.reportName][reqBody.reportType].pathToFile;
			let reportPath = path.join(__convertedDataFolderPath, `${dataSourcePath}.json`);
			if (!fs.existsSync(reportPath)) {
				if (fs.existsSync(path.join(__rawDataFolderPath, `${dataSourcePath}.xlsx`))) {
					convertRawDataToJSON(path.join(__rawDataFolderPath, `${dataSourcePath}.xlsx`), reportPath);
				} else if (fs.existsSync(path.join(__rawDataFolderPath, `${dataSourcePath}.csv`))) {
					convertRawDataToJSON(path.join(__rawDataFolderPath, `${dataSourcePath}.csv`), reportPath);
				} else {
					throw "Invalid report type";
				}
			}

			if (reqBody.reportType === reportTypes.map) {
				reportData = getMapReportData(reqBody, reportPath);
			} else {
				throw `Invalid report type: ${reqBody.reportType}`;
			}
			
			res.status(200).send({
				status: 200,
				result: reportData
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

function getMapReportData(reqBody, reportPath) {
	let rawData = require(reportPath);
	let { columns, filters } = dataSourceInfo[reqBody.dataSourceName][reqBody.reportName][reqBody.reportType];
	let mainFilterForSSP, groupByColumn;

	if (reqBody.appName === appNames.nvsk) {
		columns = columns.filter(col => !col.hasOwnProperty('isSSPColumn') || !col.isSSPColumn);
		groupByColumn = columns.filter(col => col.isGroupByColumn);
		filters = filters.filter(filter => !filter.hasOwnProperty('isSSPFilter') || !filter.isSSPFilter);
	} else {
		mainFilterForSSP = columns.filter(col => col.isMainFilterForSSP);
		columns = columns.filter(col => !col.hasOwnProperty('isSSPColumn') || col.isSSPColumn);
		groupByColumn = columns.filter(col => col.isGroupByColumn);
		filters = filters.filter(filter => !filter.hasOwnProperty('isSSPFilter') || filter.isSSPFilter);

		if (mainFilterForSSP && mainFilterForSSP.length > 0) {
			rawData = rawData.filter(record => record[mainFilterForSSP[0].property] && (record[mainFilterForSSP[0].property].toLowerCase() == reqBody.stateCode));
		}
	}

	rawData = _.chain(rawData)
		.groupBy(groupByColumn[0].property)
		.map((objs, key) => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = key;
					return;
				}

				if (col.weightedAverageAgainst) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						numeratorSum += obj[col.property] * obj[col.weightedAverageAgainst];
						denominatorSum += obj[col.weightedAverageAgainst];
					});

					data[col.property] = Number((numeratorSum / denominatorSum).toFixed(2));
				}

				data[col.property] = objs[0][col.property];
			});

			return data;
		})
		.value();

	filters = filters.map(filter => {
		return {
			name: filter.name,
			property: filter.property,
			value: '',
			options: []
		}
	});

	return {
		data: rawData,
		filters: filters
	};
}

function getLOTableReportData(reqBody, reportPath) {
	let rawData = require(reportPath);
	let { columns, filters } = dataSourceInfo[reqBody.dataSourceName][reqBody.reportName][reqBody.reportType];
	let mainFilterForSSP, groupByColumn;

	if (reqBody.appName === appNames.nvsk) {
		columns = columns.filter(col => !col.hasOwnProperty('isSSPColumn') || !col.isSSPColumn);
		groupByColumn = columns.filter(col => col.isGroupByColumn);
		filters = filters.filter(filter => !filter.hasOwnProperty('isSSPFilter') || !filter.isSSPFilter);
	} else {
		mainFilterForSSP = columns.filter(col => col.isMainFilterForSSP);
		columns = columns.filter(col => !col.hasOwnProperty('isSSPColumn') || col.isSSPColumn);
		groupByColumn = columns.filter(col => col.isGroupByColumn);
		filters = filters.filter(filter => !filter.hasOwnProperty('isSSPFilter') || filter.isSSPFilter);

		if (mainFilterForSSP && mainFilterForSSP.length > 0) {
			rawData = rawData.filter(record => record[mainFilterForSSP[0].property] == reqBody.stateCode);
		}
	}

	rawData = _.chain(rawData)
		.groupBy(groupByColumn[0].property)
		.map((objs, key) => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = key;
					return;
				}

				if (col.weightedAverageAgainst) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						numeratorSum += obj[col.property] * obj[col.weightedAverageAgainst];
						denominatorSum += obj[col.weightedAverageAgainst];
					});

					data[col.property] = Number((numeratorSum / denominatorSum).toFixed(2));
				}

				data[col.property] = objs[0][col.property];
			});

			return data;
		})
		.value();

	filters = filters.map(filter => {
		return {
			name: filter.name,
			property: filter.property,
			value: '',
			options: []
		}
	});

	return {
		data: rawData,
		filters: filters
	};
}

function convertRawDataToJSON(sourceFilePath, destinationFilePath) {
	let fileExt = path.extname(sourceFilePath).substring(1);
	let reportRawData;
	
	if (fileExt === 'xlsx') {
		const workbook = XLSX.readFile(sourceFilePath);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		
		reportRawData = XLSX.utils.sheet_to_json(worksheet);
	} else {
		reportRawData = csvToJson.formatValueByType().getJsonFromCsv(sourceFilePath);
	}

	fs.mkdirSync(destinationFilePath.split(/[\/\\]/).slice(0, -1).join("\/"), { recursive: true });
	fs.writeFileSync(destinationFilePath, JSON.stringify(reportRawData));
}
