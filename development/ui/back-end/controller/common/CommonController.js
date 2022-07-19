const path = require('path');
const { reportTypes, appNames } = require("../../core/config/config");
const XLSX = require('xlsx');
const fs = require('fs');
const _ = require('lodash');
const csvToJson = require('csvtojson');
const { getFileData, getAllFiles, getFileRawData, uploadFile } = require('../../service/storage_service');
const { states } = require('../../core/config/state-codes');
const { isArray } = require('lodash');

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
			} else if (reqBody.reportType === reportTypes.barChart) {
				reportData = await getBarChartData(reqBody, reportConfig, rawData);
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
	let { locations, latitude, longitude, dimensions, filters, levels, stateColumnFilter, groupByDefault, options } = reportConfig;
	let isWeightedAverageNeeded = dimensions.filter(dimension => dimension.weightedAverage || dimension.aggegration).length > 0;
	let groupByColumn = groupByDefault;
	let level = reqBody.appName === appNames.nvsk ? 'state' : 'district';
	let currentLevel;
	levels = reqBody.levels ? reqBody.levels : levels;
	latitude = latitude ? latitude : 'Latitude';
	longitude = longitude ? longitude : "Longitude";
	let code;
	let metricFilter = reqBody.metricFilter ? reqBody.metricFilter : [];

	if (levels && levels.length > 0) {
		currentLevel = levels.find(level => level.selected);

		if (!currentLevel) {
			levels[0].selected = true;
			currentLevel = levels[0];
			level = currentLevel.value;
		} else {
			level = currentLevel.value;
		}
	}

	if (stateColumnFilter) {
		rawData = rawData.filter(record => record[stateColumnFilter] && (record[stateColumnFilter] == states[reqBody.stateCode].Code));
	}

	if (dimensions && dimensions.length > 0 && metricFilter.length === 0) {
		metricFilter = {
			name: "Metrics to be shown",
			options: [],
			value: ""
		};

		if (!reportConfig.hasOwnProperty('overallMetricsOption') || reportConfig.overallMetricsOption) {
			metricFilter.options.push({
				label: "Overall",
				value: "overall"
			});

			metricFilter.value = "overall";
		}

		dimensions.forEach(dimension => {
			if (!dimension.includeAsMetricFilter) {
				return;
			}

			metricFilter.options.push({
				label: dimension.name,
				value: dimension.property
			});
		});

		if (metricFilter.value === "") {
			metricFilter.value = metricFilter.options[0].value;
		}
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: null,
				options: []
			}
		})
	}

	filterRes = applyFilters(filters, rawData, groupByColumn, code);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;

	if (isWeightedAverageNeeded) {
		if (!groupByColumn && !currentLevel) {
			throw "Define group by column as you want to do some aggegration";
		}

		rawData = _.chain(rawData)
		.groupBy(groupByColumn ? groupByColumn : currentLevel.property)
		.map((objs, key) => {
			let data = {
				tooltip: ""
			};

			locationLevelPos = locations.length === 0 ? 0 : locations.findIndex(location => location.level === level);

			if (locationLevelPos !== undefined) {
				let location = locations[locationLevelPos];
				if (location.isState) {
					let regex = new RegExp(`^${objs[0][location.property].split(' ')[0]}`, "i");
					let stateCode = Object.keys(states).find(stateCode => regex.test(states[stateCode].Name));
					if (stateCode) {
						data.Location = states[stateCode].Name;
						data.Latitude = states[stateCode].Latitude;
						data.Longitude = states[stateCode].Longitude;
					} else {
						data.Location = objs[0]['property'];
						data.Latitude = objs[0][latitude];
						data.Longitude = objs[0][longitude];
					}
				} else {
					data.Location = objs[0]['property'];
					data.Latitude = objs[0][latitude];
					data.Longitude = objs[0][longitude];
				}

				if (locationLevelPos > 0) {
					for (let i = 0; i <= locationLevelPos; i++) {
						let location = locations[i];
						if (location.isState) {
							let regex = new RegExp(`^${objs[0][location.property].split(' ')[0]}`, "i");
							let stateCode = Object.keys(states).find(stateCode => regex.test(states[stateCode].Name));
							if (stateCode) {
								data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
								data.tooltip += location.tooltip.valueAsName ? `${stateCode}: <b>${objs[0][location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${stateCode}</b>`;
							} else {
								data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
								data.tooltip += location.tooltip.valueAsName ? `${objs[0][location.property]}: <b>${objs[0][location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${objs[0][location.property]}</b>`;
							}
						} else {
							data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
							data.tooltip += location.tooltip.valueAsName ? `${objs[0][location.property]}: <b>${objs[0][location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${objs[0][location.property]}</b>`;
						}
					}
				} else {
					data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
					data.tooltip += location.tooltip.valueAsName ? `${objs[0][location.property]}: <b>${objs[0][location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${objs[0][location.property]}</b>`;
				}
			}

			dimensions.forEach(dimension => {
				if (dimension.weightedAverage) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						numeratorSum += obj[dimension.weightedAverage.property] * obj[dimension.weightedAverage.against];
						denominatorSum += obj[dimension.weightedAverage.against];
					});
					
					data[dimension.name] = Number((numeratorSum / denominatorSum).toFixed(2));

					if (dimension.tooltip) {
						data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
						data.tooltip += dimension.tooltip.valueAsName ? `${data[dimension.name]}: <b>${objs[0][dimension.tooltip.property]}</b>` : `${dimension.tooltip.name.trim()}: <b>${data[dimension.name]}</b>`;
					}

					return;
				}

				if (dimension.aggegration) {
					let value = 0;
					if(dimension.aggegration.type === "SUM") {
						let sum = 0;
					
						objs.forEach((obj, index) => {
							sum += obj[dimension.property] ? obj[dimension.property] : 0;
						});
						
						value = Number(sum.toFixed(2));
					} else if(dimension.aggegration.type === "AVG") {
						let sum = 0;
					
						objs.forEach((obj, index) => {
							sum += obj[dimension.property] ? obj[dimension.property] : 0;
						});

						value = Number((sum / objs.length).toFixed(2));
					}

					if (metricFilter && metricFilter.value === dimension.property) {
						data['indicator'] = value;
					} else if (data['indicator'] && dimension.name === 'indicator') {
						data[dimension.property] = value;
					} else {
						data[dimension.name] = value;
					}

					if (dimension.tooltip) {
						data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
						data.tooltip += dimension.tooltip.valueAsName ? `${data[dimension.name]}: <b>${objs[0][dimension.tooltip.property]}</b>` : `${dimension.tooltip.name.trim()}: <b>${value}</b>`;
					}

					return;
				}



				if (dimension.tooltip) {
					data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
					data.tooltip += dimension.tooltip.valueAsName ? `${objs[0][dimension.property]}: <b>${objs[0][dimension.tooltip.property]}</b>` : `${dimension.tooltip.name.trim()}: <b>${objs[0][dimension.property]}</b>`;
				}

				data[dimension.name] = objs[0][dimension.property];
			});

			return data;
		})
		.value();
	} else {
		rawData = rawData.map(record => {
			let data = {
				tooltip: ""
			};

			locationLevelPos = locations.length === 0 ? 0 : locations.findIndex(location => location.level === level);

			if (locationLevelPos !== undefined) {
				let location = locations[locationLevelPos];
				if (location.isState) {
					let regex = new RegExp(`^${record[location.property].split(' ')[0]}`, "i");
					let stateCode = Object.keys(states).find(stateCode => regex.test(states[stateCode].Name));
					if (stateCode) {
						data.Location = states[stateCode].Name;
						data.Latitude = states[stateCode].Latitude;
						data.Longitude = states[stateCode].Longitude;
					} else {
						data.Location = record['property'];
						data.Latitude = record[latitude];
						data.Longitude = record[longitude];
					}
				} else {
					data.Location = record['property'];
					data.Latitude = record[latitude];
					data.Longitude = record[longitude];
				}

				if (locationLevelPos > 0) {
					for (let i = 0; i <= locationLevelPos; i++) {
						let location = locations[i];
						if (location.isState) {
							let regex = new RegExp(`^${record[location.property].split(' ')[0]}`, "i");
							let stateCode = Object.keys(states).find(stateCode => regex.test(states[stateCode].Name));
							if (stateCode) {
								data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
								data.tooltip += location.tooltip.valueAsName ? `${stateCode}: <b>${record[location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${stateCode}</b>`;
							} else {
								data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
								data.tooltip += location.tooltip.valueAsName ? `${record[location.property]}: <b>${record[location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${record[location.property]}</b>`;
							}
						} else {
							data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
							data.tooltip += location.tooltip.valueAsName ? `${record[location.property]}: <b>${record[location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${record[location.property]}</b>`;
						}
					}
				} else {
					data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
					data.tooltip += location.tooltip.valueAsName ? `${record[location.property]}: <b>${record[location.tooltip.property]}</b>` : `${location.tooltip.name.trim()}: <b>${record[location.property]}</b>`;
				}
			}

			dimensions.forEach(dimension => {
				let value = record[dimension.property] ? record[dimension.property] : 0;
				if (dimension.tooltip) {
					data.tooltip += data.tooltip && data.tooltip.length > 0 ? '<br>' : '';
					data.tooltip += dimension.tooltip.valueAsName ? `${value}: <b>${record[dimension.tooltip.property]}</b>` : `${dimension.tooltip.name.trim()}: <b>${value}</b>`;
				}

				data[dimension.name] = value;
			});

			return data;
		});
	}

	return {
		data: rawData,
		filters: filters,
		options,
		levels,
		metricFilter
	};
}

async function getLOTableReportData(reqBody, reportConfig, rawData) {
	let { columns, filters, mainFilter, gaugeChart } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage || col.aggegration).length > 0;
	let groupByColumn = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == states[reqBody.stateCode].Code));
	}

	if (gaugeChart) {
		if (gaugeChart.aggegration && gaugeChart.aggegration.type === "AVG") {
			gaugeChart.columnSum = 0;
			gaugeChart.againstSum = 0;
		}
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: null,
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
					return;
				}

				if(col.aggegration) {
					if (col.aggegration.type === "SUM") {
						let sum = 0;
				
						objs.forEach((obj, index) => {
							sum += obj[col.property] ? obj[col.property] : 0;
						});
						
						data[col.name] = Number(sum.toFixed(2));
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
				data[col.property] = record[col.property];
			});

			if (gaugeChart) {
				if (gaugeChart.aggegration && gaugeChart.aggegration.type === "AVG") {
					gaugeChart.columnSum += record[gaugeChart.aggegration.column] ? record[gaugeChart.aggegration.column] : 0;
					gaugeChart.againstSum += record[gaugeChart.aggegration.against] ? record[gaugeChart.aggegration.against] : 0;
				}
			}

			return data;
		});
	}

	if (gaugeChart) {
		if (gaugeChart.aggegration && gaugeChart.aggegration.type === "AVG") {
			gaugeChart.percentage = gaugeChart.againstSum > 0 ? Number((gaugeChart.columnSum / gaugeChart.againstSum * 100).toFixed(2)) : 0;
		}
	}

	return {
		data: rawData,
		filters: filters,
		columns,
		gaugeChart
	};
}

async function getScatterPlotReportData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { columns, filters, mainFilter } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage).length > 0;
	let groupByColumns = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == states[reqBody.stateCode].Code));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: null,
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
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage || col.aggegration).length > 0;
	let groupByColumn = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == states[reqBody.stateCode].Code));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: null,
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
					if (col.aggegration.type === 'SUM') {
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
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == states[reqBody.stateCode].Code));
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: null,
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
					if (col.aggegration.type === 'SUM') {
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

async function getBarChartData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { columns, filters, mainFilter, gaugeChart } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage).length > 0;
	let isAggegrationNeeded = columns.filter(col => col.aggegration).length > 0;
	let groupByColumn = reportConfig.defaultLevel;

	if (mainFilter) {
		rawData = rawData.filter(record => record[mainFilter] && (record[mainFilter] == states[reqBody.stateCode].Code));
	}

	if (gaugeChart) {
		if (gaugeChart.aggegration && gaugeChart.aggegration.type === "AVG") {
			gaugeChart.columnSum = 0;
			gaugeChart.againstSum = 0;
		}
	}

	if (reqBody.filters && reqBody.filters.length > 0) {
		filters = reqBody.filters;
	} else {
		filters = filters.map(filter => {
			return {
				...filter,
				value: null,
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
					if (col.aggegration.type === 'SUM') {
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

			if (gaugeChart) {
				if (gaugeChart.aggegration && gaugeChart.aggegration.type === "AVG") {
					gaugeChart.columnSum += record[gaugeChart.aggegration.column] ? record[gaugeChart.aggegration.column] : 0;
					gaugeChart.againstSum += record[gaugeChart.aggegration.against] ? record[gaugeChart.aggegration.against] : 0;
				}
			}

			return data;
		});
	}

	if (gaugeChart) {
		if (gaugeChart.aggegration && gaugeChart.aggegration.type === "AVG") {
			gaugeChart.percentage = gaugeChart.againstSum > 0 ? Number((gaugeChart.columnSum / gaugeChart.againstSum * 100).toFixed(2)) : 0;
		}
	}

	return {
		data: rawData,
		filters: filters,
		gaugeChart: gaugeChart
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
		reportRawData = reportRawData.map(row => _.mapValues(row, (value, key) => !isNaN(Number(value)) ? Number(value) : value));
	}

	uploadFile(fileName, reportRawData);
}

function applyFilters(filters, rawData, groupByColumn, code = undefined) {
	filters.map((filter, index) => {
		let filterOptionMap = new Map();
		let filterProperty = filter.optionValueColumn ? filter.optionValueColumn : filter.column;

		if (filter.value && filter.value !== '' && filter.value !== 'overall') {
			rawData = rawData.filter(record => {
				return record[filterProperty] === filter.value;
			});

			if (filter.level) {
				groupByColumn = filter.level;
				code = Object.keys(states)[filter.value];
			}
		} else if (index === 0 || (filters[index - 1].value && filters[index - 1].value !== '')) {
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
		groupByColumn,
		code
	}
}
