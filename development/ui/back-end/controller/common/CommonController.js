const path = require('path');
const { reportTypes, appNames } = require("../../core/config/config");
const XLSX = require('xlsx');
const fs = require('fs');
const _ = require('lodash');
const csvToJson = require('csvtojson');
const { getFileData, getAllFiles, getFileRawData, uploadFile } = require('../../service/storage_service');
const { stateCodes } = require('../../core/config/state-codes');

exports.getReportData = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let reqBody = req.body;
		let reportData;

		try {
			if (!reqBody.appName || !reqBody.dataSourceName || !reqBody.reportName || !reqBody.reportType || (reqBody.appName === appNames.vsk && !reqBody.stateCode)) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			if (reqBody.appName === appNames.vsk) {
				reqBody.stateCode = reqBody.stateCode;
			}
			
			let dataSourceConfig = require(path.join(__basedir, `core/config/${reqBody.appName}/${reqBody.dataSourceName}_config.js`));
			let reportConfig = dataSourceConfig[reqBody.reportName][reqBody.reportType];
			let dataSourcePath = reportConfig.pathToFile;

			let rawData = await getFileData(dataSourcePath);

			if (reqBody.reportType === reportTypes.map) {
				reportData = await getMapReportData(reqBody, reportConfig, rawData);
			} else if (reqBody.reportType === reportTypes.loTable) {
				reportData = await getLOTableReportData(reqBody, reportConfig, rawData);
			} else if (reqBody.reportType === reportTypes.scatterPlot) {
				reportData = await getScatterPlotReportData(reqBody, reportConfig, rawData);
			} else if (reqBody.reportType === reportTypes.multiBarChart) {
				reportData = await getMultiBarChartData(reqBody, reportConfig, rawData);
			} else if (reqBody.reportType === reportTypes.stackedBarChart) {
				reportData = await getStackedBarChartData(reqBody, reportConfig, rawData);
			} else {
				throw `Invalid report type: ${reqBody.reportType}`;
			}
			
			res.status(200).send({
				status: 200,
				result: reportData
			});
		} catch (error) {
			if (error.name === 'NotFound') {
				// Handle no object on cloud here...
				res.send({
					status: 500,
					message: "Report file not found in the specified location",
					errorObject: error
				});
			} else {
				res.send({
					status: error.status || 500,
					message: error.message || "Internal server error",
					errorObject: error
				});
			}
		}
	});
}

exports.uploadSourceData = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		try {
			const filePaths = await getAllFiles();
			filePaths.forEach(async (filePath) => {
				const fileContent = await getFileRawData(filePath);
				await convertRawDataToJSONAndUploadToS3(fileContent, filePath);
			});

			res.send('Success');
		} catch (error) {
            return reject({
                status: error.status || 500,
                message: error.message || "Internal server error",
                errorObject: error
            });
        }
	});
};

async function getMapReportData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { columns, filters, mainFilter } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage).length > 0;
	let groupByColumn = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == stateCodes[reqBody.stateCode]));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: "",
				options: []
			}
		})
	}

	filterRes = applyFilters(filters, rawData, groupByColumn);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;

	if (isWeightedAverageNeeded) {
		rawData = _.chain(rawData)
		.groupBy(groupByColumn)
		.map((objs, key) => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = key;
					return;
				}

				if (col.weightedAverage) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						numeratorSum += obj[col.weightedAverage.property] * obj[col.weightedAverage.against];
						denominatorSum += obj[col.weightedAverage.against];
					});

					data[col.name] = Number((numeratorSum / denominatorSum).toFixed(2));
				}

				data[col.name] = objs[0][col.property];
			});

			return data;
		})
		.value();
	} else {
		rawData = rawData.map(record => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = record[col.property];
					return;
				}

				if (col.tooltipDesc) {
					data[col.name] = col.tooltipDesc + ' ' + record[col.property];
					return;
				}

				data[col.name] = record[col.property];
			});

			return data;
		});
	}

	return {
		data: rawData,
		filters: filters,
		level: groupByColumn ? groupByColumn : "State"
	};
}

async function getLOTableReportData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { columns, filters, mainFilter } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage).length > 0;
	let groupByColumn = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == stateCodes[reqBody.stateCode]));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: "",
				options: []
			}
		})
	}

	filterRes = applyFilters(filters, rawData, groupByColumn);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;

	if (isWeightedAverageNeeded) {
		rawData = _.chain(rawData)
		.groupBy(groupByColumn)
		.map((objs, key) => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = key;
					return;
				}

				if (col.weightedAverage) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						numeratorSum += obj[col.weightedAverage.property] * obj[col.weightedAverage.against];
						denominatorSum += obj[col.weightedAverage.against];
					});

					data[col.name] = Number((numeratorSum / denominatorSum).toFixed(2));
				}

				data[col.name] = objs[0][col.property];
			});

			return data;
		})
		.value();
	} else {
		rawData = rawData.map(record => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = record[col.property];
					return;
				}

				if (col.tooltipDesc) {
					data[col.name] = col.tooltipDesc + ' ' + record[col.property];
					return;
				}

				data[col.name] = record[col.property];
			});

			return data;
		});
	}

	return {
		data: rawData,
		filters: filters,
		columns
	};
}

async function getScatterPlotReportData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { columns, filters, mainFilter } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage).length > 0;
	let groupByColumns = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter].toLowerCase() == reqBody.stateCode));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: "",
				options: []
			}
		});
	}

	filterRes = applyFilters(filters, rawData, groupByColumn);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;

	let currentGroupCol = 0;
	rawData = _.chain(rawData)
		.groupBy(groupByColumns[0])
		.map((objs, key) => {
			
		});
		

	return {
		data: rawData,
		filters: filters,
		level: groupByColumn ? groupByColumn : "State"
	};
}

async function getMultiBarChartData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { columns, filters, mainFilter } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage).length > 0;
	let isAggegrationNeeded = columns.filter(col => col.aggegration).length > 0;
	let groupByColumn = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == stateCodes[reqBody.stateCode]));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: "",
				options: []
			}
		})
	}

	filterRes = applyFilters(filters, rawData, groupByColumn);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;

	if (isWeightedAverageNeeded || isAggegrationNeeded) {
		rawData = _.chain(rawData)
		.groupBy(groupByColumn)
		.map((objs, key) => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = key;
					return;
				}

				if (col.key) {
					data[col.name] = key;
					return;
				}

				if (col.weightedAverage) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						numeratorSum += obj[col.property] * obj[col.weightedAverage.against];
						denominatorSum += obj[col.weightedAverage.against];
					});

					data[col.name] = Number((numeratorSum / denominatorSum).toFixed(2));
					return;
				}

				if (col.aggegration) {
					if (col.aggegration === 'SUM') {
						data[col.name] = _.sumBy(objs, col.property);
						return;
					}
				}

				data[col.name] = objs[0][col.property];
			});

			return data;
		})
		.value();
	} else {
		rawData = rawData.map(record => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = record[col.property];
					return;
				}

				if (col.tooltipDesc) {
					data[col.name] = col.tooltipDesc + ' ' + record[col.property];
					return;
				}

				data[col.name] = record[col.property];
			});

			return data;
		});
	}

	return {
		data: rawData,
		filters: filters
	};
}

async function getStackedBarChartData(reqBody, reportConfig, rawData) {
	console.log("stacked bar process started");
	let { columns, filters, mainFilter } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage).length > 0;
	let isAggegrationNeeded = columns.filter(col => col.aggegration).length > 0;
	let groupByColumn = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == stateCodes[reqBody.stateCode]));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: "",
				options: []
			}
		})
	}

	filterRes = applyFilters(filters, rawData, groupByColumn);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;

	if (isWeightedAverageNeeded || isAggegrationNeeded) {
		rawData = _.chain(rawData)
		.groupBy(groupByColumn)
		.map((objs, key) => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = key;
					return;
				}

				if (col.key) {
					data[col.name] = key;
					return;
				}

				if (col.weightedAverage) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						numeratorSum += obj[col.property] * obj[col.weightedAverage.against];
						denominatorSum += obj[col.weightedAverage.against];
					});

					data[col.name] = Number((numeratorSum / denominatorSum).toFixed(2));
					return;
				}

				if (col.aggegration) {
					if (col.aggegration === 'SUM') {
						data[col.name] = _.sumBy(objs, col.property);
						return;
					}
				}

				data[col.name] = objs[0][col.property];

				console.log(data[col.name]);
			});

			return data;
		})
		.value();
	} else {
		rawData = rawData.map(record => {
			let data = {};
			columns.forEach(col => {
				if (col.isLocationName) {
					data.Location = record[col.property];
					return;
				}

				if (col.tooltipDesc) {
					data[col.name] = col.tooltipDesc + ' ' + record[col.property];
					return;
				}
				
				data[col.name] = (!isNaN(Number(record[col.property]))) ? Number(Number(record[col.property]).toFixed(2)) : record[col.property];
			});

			return data;
		});
	}

	return {
		data: rawData,
		filters: filters
	};
}

var nest = function (seq, keys) {
    if (!keys.length)
        return seq;
    var first = keys[0];
    var rest = keys.slice(1);
    return _.mapValues(_.groupBy(seq, first), function (value) { 
        return nest(value, rest)
    });
};

function convertRawDataToJSON(sourceFilePath, destinationFilePath) {
	let fileExt = path.extname(sourceFilePath).substring(1);
	let reportRawData;
	
	if (fileExt === 'xlsx') {
		const workbook = XLSX.readFile(sourceFilePath);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		
		reportRawData = XLSX.utils.sheet_to_json(worksheet);
	} else {
		reportRawData = csvToJson.formatValueByType().fieldDelimiter(',').getJsonFromCsv(sourceFilePath);
	}

	fs.mkdirSync(destinationFilePath.split(/[\/\\]/).slice(0, -1).join("\/"), { recursive: true });
	fs.writeFileSync(destinationFilePath, JSON.stringify(reportRawData));
}

async function convertRawDataToJSONAndUploadToS3(fileContent, filePath) {
	console.log(filePath);
	let fileExt = path.extname(filePath).substring(1);
	let fileName = path.join(path.dirname(filePath),path.basename(filePath, path.extname(filePath))).replace(/\\/g, "/").replace('input_files', 'converted');

	if (fileExt === 'xlsx') {
		const workbook = XLSX.read(fileContent);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		
		reportRawData = XLSX.utils.sheet_to_json(worksheet)
									.map(row => _.mapKeys(row, (value, key) => key.trim()));
	} else {
		reportRawData = await csvToJson({
			trim: true
		}).fromString(fileContent.toString('utf-8'));
	}

	uploadFile(fileName, reportRawData);
}

function applyFilters(filters, rawData, groupByColumn) {
	filters.map((filter, index) => {
		let filterOptionMap = new Map();
		let filterProperty = filter.optionValueColumn ? filter.optionValueColumn : filter.column;

		if (filter.value !== '' && filter.value !== 'overall') {
			rawData = rawData.filter(record => {
				return record[filterProperty] === filter.value;
			});

			if (filter.level) {
				groupByColumn = filter.level;
			}
		} else if (index === 0 || (filters[index - 1].value !== '')) {
			filter.options = [];
			if (filter.includeAll) {
				filter.options.push({
					label: 'Overall',
					value: 'overall'
				});

				filter.value = 'overall';
			}
			rawData = rawData.filter(record => {
				if (!filterOptionMap.has(record[filterProperty])) {
					if (filter.defaultValue && filter.options.length === 0) {
						filter.value = record[filterProperty];
					}

					filter.options.push({
						label: record[filter.column],
						value: record[filterProperty]
					});

					filterOptionMap.set(record[filterProperty], true);
				}

				if (filter.defaultValue) {
					return record[filterProperty] === filter.value;
				}

				return true;
			});
		}

		return filter;
	});

	return {
		filters,
		rawData,
		groupByColumn
	}
}
