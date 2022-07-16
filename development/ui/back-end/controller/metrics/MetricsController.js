const { getFileData } = require("../../service/storage_service");
const _ = require('lodash');

exports.getDashboardMetrics = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName } = req.params;

		try {
			if (!appName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let metrics = await getFileData('dashboard/key_vanity_metrics.json');
            metrics = metrics.filter(metric => metric['Metric Type'] === 'Key Metric');

            metricsRes = _.chain(metrics)
                .groupBy("Program ID")
                .map((objs, key) => {
                    let data = {
                        programId: key,
                        title: objs[0]['Program'],
                        metrics: []
                    };

                    data.metrics = objs.map(metric => {
                        return {
                            name: metric['Metric Name'],
                            value: metric['Metric Value'] && metric['Metric Value'] !== '' ? metric['Metric Value'] : 0,
                            information: metric['Metric Information']
                        }
                    });

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

exports.getVanityMetrics = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, configName, program } = req.params;
		  
        
		try {
			if (!appName || !configName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let vanityMetrics = 

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
