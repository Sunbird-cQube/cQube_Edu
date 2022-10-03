const { getFileData } = require("../../service/storage_service");
const _ = require('lodash');
const { configFiles } = require("../../core/config/config");

exports.getDashboardMetrics = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, forMenu } = req.params;

		try {
			if (!appName) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}
			let metrics = await getFileData(configFiles.dashboardMenu);
            metrics = metrics.filter(metric => metric['Metric Type'] === 'Key Metric');
			metrics = metrics.sort((a, b) => compare(a['Sequence Number'], b['Sequence Number'], 'asc'));
			
            metricsRes = _.chain(metrics)
                .groupBy("Program ID")
                .map((objs, key) => {
                    let data = {
                        programId: key,
                        title: forMenu && forMenu === 'true' ? objs[0]['Menu Name'] : objs[0]['Program'],
                        metrics: [],
						tooltip: objs[0]['Program Information'],
						navigationURL: objs[0]['Navigation URL'],
						icon: objs[0]['Image URL']
                    };

                    data.metrics = objs.filter(metric => metric["Metric Name"] !== null && metric["Metric Name"] !== 0).map(metric => {
                        return {
                            name: metric['Metric Name'],
                            value: metric['Metric Value'] && metric['Metric Value'] !== '' ? metric['Metric Value'] : 0,
                            tooltip: metric['Metric Information']
                        }
                    });

                    return data;
                });

			res.status(200).send({
				status: 200,
				result: metricsRes
			});
		} catch (error) {
			res.status(500).send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
		}
	});
}

exports.getVanityMetrics = async (req, res, next) => {
	return new Promise(async function (resolve, reject) {
		let { appName, programId } = req.params;
        
		try {
			if (!appName || !programId) {
				throw "Some of the parameters are missing, make sure all the required parameters are present";
			}

			let metrics = await getFileData(configFiles.dashboardMenu);
            vanityMetrics = metrics.filter(metric => metric['Program ID'] === programId && metric['Metric Type'] === 'Vanity Metric' && metric['Metric Name']);

			vanityMetrics = vanityMetrics.map(vanityMetric => {
				return {
					name: vanityMetric['Metric Name'],
					value: vanityMetric['Metric Value'] ? vanityMetric['Metric Value'] : 0,
					tooltip: vanityMetric['Metric Information']
				};
			});

			res.status(200).send({
				status: 200,
				result: vanityMetrics
			});
		} catch (error) {
			res.status(500).send({
				status: error.status || 500,
				message: error.message || "Internal server error",
				errorObject: error
			});
		}
	});
}

function compare(a, b, sortDirection) {
	return (a < b ? -1 : 1) * (sortDirection === 'asc' ? 1 : -1);
}
