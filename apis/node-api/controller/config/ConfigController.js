const path = require('path');
const { configFiles, reportTypes, appNames } = require("../../core/config/config");
const { getFileData } = require('../../service/storage_service');

const _ = require('lodash');
// const { getFileData, getAllFiles, getFileRawData, uploadFile } = require('../../service/storage_service');
const { states } = require('../../core/config/state-codes');

exports.getConfig = (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, configName } = req.params;

		try {
			if (!appName || !configName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let menu = require(path.join(__dataFolderPath, `${appName}/${configFiles[configName]}`));
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

exports.getMetrics = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, configName } = req.params;

		try {
			if (!appName || !configName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let metrics = require(path.join(__basedir, `core/config/${appName}/${configName}_config.js`));

			for (let i = 0; i < metrics.length; i++) {
				let metric = metrics[i];

				if (metric.metrics.length > 0) {
					for (let j = 0; j < metric.metrics.length; j++) {
						let subMetric = metric.metrics[j];
						const fileContent = await getFileData(subMetric.pathToFile);

						if (subMetric.aggegration === 'SUM') {
							let sum = 0;
							fileContent.forEach(record => {
								let value = record[subMetric.columnName] && typeof record[subMetric.columnName] === 'string' ? +record[subMetric.columnName].replace(/\,/g, "") : record[subMetric.columnName];
								sum += value;
							});
							subMetric.value = +sum.toFixed(2);
							if (subMetric.value >= 10000000) {
								subMetric.value = (subMetric.value / 10000000).toFixed(2) + ' Cr';
							}
							else if (subMetric.value >= 100000) {
								subMetric.value = (subMetric.value / 100000).toFixed(2) + ' L';
							}
							else if (subMetric.value >= 1000) {
								subMetric.value = (subMetric.value / 1000).toFixed(2) + ' K';
							}
						} else if (subMetric.aggegration === '') {
							subMetric.value = fileContent.length;
						}
					}
				}
			}

			res.status(200).send({
				status: 200,
				result: metrics
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

exports.getVanityMetrics = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, configName, program } = req.params;


		try {
			if (!appName || !configName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let vanityMetrics = require(path.join(__basedir, `core/config/${appName}/${configName}_dashboard_config.js`));
			for (let i = 0; i < vanityMetrics.length; i++) {
				let metric
				if (vanityMetrics[i].title == program) {
					metric = vanityMetrics[i];

					if (metric.metrics.length > 0) {
						for (let j = 0; j < metric.metrics.length; j++) {

							let subMetric = metric.metrics[j];

							if (metric.title === program) {
								const fileContent = await getFileData(subMetric.pathToFile);
								if (subMetric.aggegration === 'SUM') {
									let sum = 0;
									fileContent.forEach(record => {
										let value = record[subMetric.columnName] && typeof record[subMetric.columnName] === 'string' ? +record[subMetric.columnName].replace(/\,/g, "") : record[subMetric.columnName];
										sum += value;
									});
									subMetric.value = sum;
									if (subMetric.value >= 10000000) {
										subMetric.value = (subMetric.value / 10000000).toFixed(2) + ' Cr';
									}
									else if (subMetric.value >= 100000) {
										subMetric.value = (subMetric.value / 100000).toFixed(2) + ' L';
									}
									else if (subMetric.value >= 1000) {
										subMetric.value = (subMetric.value / 1000).toFixed(2) + ' K';
									}
								} else if (subMetric.aggegration === '') {
									subMetric.value = fileContent.length;
								}
							}


						}
					}
				}

				// let metric = vanityMetrics[i];


			}

			res.status(200).send({
				status: 200,
				result: vanityMetrics
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

///////////////////////////////////////////// testing   //////////////////////////////////////////
exports.getMenuConfig = async (req, res, next) => {

	return new Promise(async function (resolve, reject) {
		let { appName } = req.params;
		console.log('enterrreeeeeeeeeeeeee')
		try {
			if (!appName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let data = [{
				"data_source": "Diksha",
				"IMAGE URL": "ETB & E-Content.png",
				"section_name": "statesEnergizedTextBooks",
				"section_description": "des",
				"report_name": "Bar-report heading",
				"report_type": "bar",
				"description": "This dashboard provides information about student's performance in the Semester Assessment Test",
				"columns": [{
					"columns_name": "State\/UT name",
					"columns_property": "State Name",
					"columns_islocationname": "true"
				}],
				"filters": [{
					"filters_name": "medium",
					"filters_columns": "Medium",
					"filter_xyz": "abc"
				}]
			}, {
				"data_source": "Diksha",
				"IMAGE URL": "ETB & E-Content.png",
				"section_name": "qrCodeCoverageAcrossStates",
				"section_description": "des",
				"report_name": "bar_repo2",
				"report_type": "bar",
				"description": "This geo-location-based dashboard provides insights on student Periodic Assessment Test (PAT) performance across Uttar Pradesh.",
				"columns": [{
					"columns_name": "State\/UT name",
					"columns_property": "State Name",
					"columns_islocationname": "TRUE"
				}],
				"filters": [{
					"filters_name": "subject",
					"filters_columns": "Subject",
					"filter_xyz": "abf"
				}]
			}, {
				"data_source": "Diksha",
				"IMAGE URL": "ETB & E-Content.png",
				"section_name": "qrCodeCoverageAcrossStates",
				"section_description": "des",
				"report_name": "map-_repo2",
				"report_type": "map",
				"description": "This dashboard provides insights on student performance at the question level",
				"columns": [{
					"columns_name": "state_code",
					"columns_property": "State Code",
					"columns_islocationname": "TRUE"
				}],
				"filters": [{
					"filters_name": "",
					"filters_columns": "",
					"filter_xyz": ""
				}]
			}, {
				"data_source": "Diksha",
				"IMAGE URL": "ETB & E-Content.png",
				"section_name": "qrCodeCoverageAcrossStates",
				"section_description": "des",
				"report_name": "map-_repo3",
				"report_type": "map",
				"description": "This dashboard provides insights on student performance at the question level",
				"columns": [{
					"columns_name": "State\/UT name",
					"columns_property": "State Name",
					"columns_islocationname": "TRUE"
				}],
				"filters": [{
					"filters_name": "",
					"filters_columns": "",
					"filter_xyz": ""
				}]
			}, {
				"data_source": "Diksha",
				"IMAGE URL": "ETB & E-Content.png",
				"section_name": "qrCodeCoverageAcrossStates",
				"section_description": "des",
				"report_name": "map-_repo1",
				"report_type": "map",
				"description": "This dashboard provides insights on student performance at the question level.",
				"columns": [{
					"columns_name": "Location",
					"columns_property": "State Name",
					"columns_islocationname": "true"
				}],
				"filters": [{
					"filters_name": "grade",
					"filters_columns": "Grade",
					"filter_xyz": "pqr"
				}]
			}, {
				"data_source": "NCF",
				"IMAGE URL": "ETB & E-Content.png",
				"IMAGE URL": "ETB & E-Content.png",
				"section_name": "progressOfNCF",
				"section_description": "des",
				"report_name": "map-_repo1",
				"report_type": "map",
				"description": "This dashboard provides insights on student performance at the question level.",
				"columns": [{
					"columns_name": "Location",
					"columns_property": "State Name",
					"columns_islocationname": "true"
				}],
				"filters": [{
					"filters_name": "grade",
					"filters_columns": "Grade",
					"filter_xyz": "pqr"
				}]
			}]

			metricsRes = _.chain(data)
				.groupBy("data_source")
				.map((objs, key) => {
					let data = {
						programId: key,
						title: key.toUpperCase(),
						metrics: [],
						navigationURL: `/program/${key.toLowerCase()}`,
						icon: objs[0]['IMAGE URL']
					};


					return data;
				});




			res.status(200).send({
				status: 200,
				result: metricsRes
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


exports.getSubCAtegoryData = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let reqBody = req.body;
		let reportData;
		console.log('enterrrrrrred22222')

		try {
			if (!reqBody.appName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			// if (reqBody.appName === appNames.state) {
			// 	reqBody.stateCode = reqBody.stateCode;
			// }

			// let dataSourceConfig = require(path.join(__basedir, `core/config/${reqBody.appName}/${reqBody.dataSourceName}_config.js`));
			let dataSourceConfig = require(path.join(__basedir, `core/config/${reqBody.appName}/common_config.js`));
			let reportConfig = dataSourceConfig;
			if(reqBody.program){
				let data = {};
				reportConfig.forEach(obj => {
					let temp = {}
					if(obj['data_source'].toLowerCase() === reqBody.program){
						temp = {
							dataSourceName: obj['data_source'],
							reportName: obj['report_name'],
    						reportType: obj['report_type'],
						};
						if(data[obj['section_name']]){
							let t = data[obj['section_name']];
							t.push(temp);
							data[obj['section_name']] = t;
						}
						else{
							let t = [];
							t.push(temp)
							data[obj['section_name']] = t;
						}
					}
					
				});
				res.status(200).send({
					status: 200,
					result: data,
				});
			}
			else{
				// console.log('incha', reportConfig)
			let data1 = {}
			metricsRes = reportConfig.map(data => {
				data1 = {
					programId: data.data_source,
					section_name: data.section_name,
				};

			})
			// metricsRes = _.chain(reportConfig)
			// 	.groupBy("data_source")
			// 	.map((objs, key) => {
			// 		console.log('objs', key)
			// 		let data = {
			// 			programId: key,
			// 			section_name: "",

			// 		};


			// 		return data;
			// 	});

			res.status(200).send({
				status: 200,
				result: data1,

			});
			}
			
		} catch (error) {
			if (error.name === 'NotFound') {
				// Handle no object on cloud here...
				res.status(500).send({
					status: 500,
					message: "Report file not found in the specified location",
					errorObject: error
				});
			} else {
				res.status(500).send({
					status: error.status || 500,
					message: error.message || "Internal server error",
					errorObject: error
				});
			}
		}
	});
}