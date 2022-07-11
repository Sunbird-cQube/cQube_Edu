const path = require('path');
const { reportTypes, dataSourceInfo, appNames } = require("../../core/config/config");
const XLSX = require('xlsx');
const fs = require('fs');
const _ = require('lodash');
const AwsConfig = require("../../core/config/aws-config");
const csvToJson = require('csvtojson');

exports.getReportData = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let reqBody = req.body;
		let reportData;

		try {
			if (!reqBody.appName || !reqBody.dataSourceName || !reqBody.reportName || !reqBody.reportType || (reqBody.appName === appNames.vsk && !reqBody.stateCode)) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			if (reqBody.appName === appNames.vsk) {
				reqBody.stateCode = reqBody.stateCode.toLowerCase();
			}
			
			let dataSourceConfig = require(path.join(__basedir, `core/config/${reqBody.appName}/${reqBody.dataSourceName}_config.js`));
			let reportConfig = dataSourceConfig[reqBody.reportName][reqBody.reportType];
			let dataSourcePath = reportConfig.pathToFile;

			await AwsConfig.s3.headObject({ Bucket: AwsConfig.params.OutputBucket, Key: `${dataSourcePath}` }).promise();

			if (reqBody.reportType === reportTypes.map) {
				reportData = await getMapReportData(reqBody, reportConfig);
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
			AwsConfig.s3.listObjectsV2({ Bucket: AwsConfig.params.InputBucket }, async function (err, listObjectRes) {
                if (err) {
					res.status(500).send({
                        message: "Invalid AWS S3 credentials or can't connect to the server"
                    });
                } else {
					try {               
						const filePaths = listObjectRes.Contents.filter((content, ind) => content.Key.split('/').slice(-1).length > 0 && content.Key.split('/').slice(-1)[0] !== '');
						filePaths.forEach(async (filePathObj) => {
							const response = await AwsConfig.s3.getObject({ Bucket: AwsConfig.params.InputBucket, Key: filePathObj.Key }).promise();
							const fileContent = response.Body;
							await convertRawDataToJSONAndUploadToS3(fileContent, filePathObj);
						});
						res.json(filePaths);
					} catch (error) {
						return reject({
							status: error.status || 500,
							message: error.message || "Internal server error",
							errorObject: error
						});
					}
				}
			});
		} catch (error) {
            return reject({
                status: error.status || 500,
                message: error.message || "Internal server error",
                errorObject: error
            });
        }
	});
};

async function getMapReportData(reqBody, reportConfig) {
	const response = await AwsConfig.s3.getObject({ Bucket: AwsConfig.params.OutputBucket, Key: `${reportConfig.pathToFile}` }).promise();
	let rawData = JSON.parse(response.Body.toString('utf-8'));
	let { columns, filters } = reportConfig;
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
		reportRawData = csvToJson.formatValueByType().fieldDelimiter(',').getJsonFromCsv(sourceFilePath);
	}

	fs.mkdirSync(destinationFilePath.split(/[\/\\]/).slice(0, -1).join("\/"), { recursive: true });
	fs.writeFileSync(destinationFilePath, JSON.stringify(reportRawData));
}

async function convertRawDataToJSONAndUploadToS3(fileContent, filePathObj) {
	let fileExt = path.extname(filePathObj.Key).substring(1);
	let fileName = path.join(path.dirname(filePathObj.Key),path.basename(filePathObj.Key, path.extname(filePathObj.Key))).replace(/\\/g, "/").replace('input_files', 'converted');

	if (fileExt === 'xlsx') {
		const workbook = XLSX.read(fileContent);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		
		reportRawData = XLSX.utils.sheet_to_json(worksheet);
	} else {
		let tempFilePath = path.join(__basedir, `temp/${path.basename(filePathObj.Key)}`);
		fs.writeFileSync(tempFilePath, fileContent.toString('utf-8'));
		reportRawData = await csvToJson({
			trim: true
		}).fromFile(tempFilePath);
		fs.unlinkSync(tempFilePath);
	}

	AwsConfig.s3.putObject({ Bucket: AwsConfig.params.OutputBucket, Key: `${fileName}.json`, Body: JSON.stringify(reportRawData) }, function(s3Err, data) {
		if (s3Err) throw s3Err
	});
}
