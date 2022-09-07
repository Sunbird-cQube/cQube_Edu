const path = require('path');
const { configFiles } = require("../../core/config/config");
const { getFileData } = require('../../service/storage_service');

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
							if(subMetric.value >= 10000000){
								subMetric.value = (subMetric.value/10000000).toFixed(2) + ' Cr';
							}
							else if(subMetric.value >= 100000) {
								subMetric.value = (subMetric.value/100000).toFixed(2) + ' L';
							}
							else if(subMetric.value >= 1000){
								 subMetric.value = (subMetric.value/1000).toFixed(2) + ' K';
							}
						} else if(subMetric.aggegration === ''){
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
				if(vanityMetrics[i].title == program){
					metric = vanityMetrics[i];
					 
				if (metric.metrics.length > 0) {
					for (let j = 0; j < metric.metrics.length; j++) {
						
						let subMetric = metric.metrics[j];
						
						if(metric.title === program){
							const fileContent = await getFileData(subMetric.pathToFile);
							if (subMetric.aggegration === 'SUM') {
								let sum = 0;
								fileContent.forEach(record => {
									let value = record[subMetric.columnName] && typeof record[subMetric.columnName] === 'string' ? +record[subMetric.columnName].replace(/\,/g, "") : record[subMetric.columnName];
									sum += value;
								});
								subMetric.value = sum;
								if(subMetric.value >= 10000000){
									subMetric.value = (subMetric.value/10000000).toFixed(2) + ' Cr';
								}
								else if(subMetric.value >= 100000) {
									subMetric.value = (subMetric.value/100000).toFixed(2) + ' L';
								}
								else if(subMetric.value >= 1000){
									 subMetric.value = (subMetric.value/1000).toFixed(2) + ' K';
								}
							} else if(subMetric.aggegration === ''){
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
