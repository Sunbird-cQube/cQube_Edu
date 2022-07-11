const path = require('path');
const { configFiles } = require("../../core/config/config");
const AwsConfig = require("../../core/config/aws-config");

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
						const response = await AwsConfig.s3.getObject({ Bucket: AwsConfig.params.OutputBucket, Key: subMetric.pathToFile }).promise();
						const fileContent = JSON.parse(response.Body.toString('utf-8'));
						
						if (subMetric.aggegration === 'SUM') {
							let sum = 0;
							fileContent.forEach(record => {
								let value = record[subMetric.columnName] && typeof record[subMetric.columnName] === 'string' ? +record[subMetric.columnName].replace(/\,/g, "") : record[subMetric.columnName];
								sum += value;
							});
							subMetric.value = sum;
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
