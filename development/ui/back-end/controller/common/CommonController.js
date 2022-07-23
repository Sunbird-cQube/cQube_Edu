const path = require('path');
const { reportTypes, appNames } = require("../../core/config/config");
const XLSX = require('xlsx');
const fs = require('fs');
const _ = require('lodash');
const csvToJson = require('csvtojson');
const { getFileData, getAllFiles, getFileRawData, uploadFile } = require('../../service/storage_service');
const { states } = require('../../core/config/state-codes');
const { isArray, property } = require('lodash');

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
            return res.status(500).send({
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

	filterRes = applyFilters(filters, rawData, groupByColumn, level);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;
	level = filterRes.level ? filterRes.level : level;

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
				
				if (metricFilter && metricFilter.value === dimension.property) {
					data['indicator'] = value;
				} else if (data['indicator'] && dimension.name === 'indicator') {
					data[dimension.property] = value;
				} else {
					data[dimension.name] = value;
				}
				
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
	let { columns, filters, mainFilter, gaugeChart, sortByProperty, sortDirection } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage || col.aggegration).length > 0;
	let groupByColumn = reportConfig.defaultLevel;
	let isTransposeNeeded = columns.filter(col => col.transposeColumn).length > 0;
	let level = reqBody.appName === appNames.nvsk ? 'state' : 'district';

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
		});
	}

	filterRes = applyFilters(filters, rawData, groupByColumn, level);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;
	level = filterRes.level ? filterRes.level : level;
	
	columns = columns.filter(col => !col.level || col.level === level);

	if (isTransposeNeeded) {
		const rows = columns.filter(col => !col.transposeColumn);
		const transCol = columns.find(col => col.transposeColumn);
		const cols = [];
		
		let uniqueMap = new Map();
		rawData.forEach(rec => {
			if (!uniqueMap.has(rec[transCol.property])) {
				cols.push({
					name: rec[transCol.property],
					property: rec[transCol.property],
					isHeatMapRequired: transCol.isHeatMapRequired,
					color: transCol.color
				});
				uniqueMap.set(rec[transCol.property], true)
			}
		});
		
		let pivotMap = new Map();
		let result = [];
		rawData.forEach(data => {
			let key = '';
			let dataObj = {};
		
			rows.forEach(col => {
				key += key.length > 0 ? '_' + data[col.property] : data[col.property];
				dataObj[col.name] = data[col.name];
			});
		
			if (!pivotMap.has(key)) {
				pivotMap.set(key, result.length);
				
				if (transCol.weightedAverage) {
					dataObj[data[transCol.property]] = {
						numeratorSum: data[transCol.weightedAverage.property] && data[transCol.weightedAverage.against] ? data[transCol.weightedAverage.property] * data[transCol.weightedAverage.against] : 0,
						denominatorSum: data[transCol.weightedAverage.against] ? data[transCol.weightedAverage.against] : 0
					}
		
					result.push(dataObj);
		
					return;
				}
		
				dataObj[data[transCol.property]] = dataObj[data[transCol.property]];
			} else {
				dataObj = result[pivotMap.get(key)];
				if (transCol.weightedAverage) {
					dataObj[data[transCol.property]] = dataObj[data[transCol.property]] ? dataObj[data[transCol.property]] : { numeratorSum: 0, denominatorSum: 0};
					dataObj[data[transCol.property]].numeratorSum += data[transCol.weightedAverage.property] && data[transCol.weightedAverage.against] ? data[transCol.weightedAverage.property] * data[transCol.weightedAverage.against] : 0;
					dataObj[data[transCol.property]].denominatorSum += data[transCol.weightedAverage.against] ? data[transCol.weightedAverage.against] : 0;
					return;
				}
		
				dataObj[data[transCol.property]] = dataObj[data[transCol.property]];
			}
		});
		
		rawData = result.map(rec => {
			cols.forEach(col => {
				if (transCol.weightedAverage) {
					rec[col.property] = rec[col.property] && rec[col.property].denominatorSum > 0 ? Number((rec[col.property].numeratorSum / rec[col.property].denominatorSum).toFixed(2)) : 0;
				}
		
				rec[col.property] = rec[col.property] ? rec[col.property] : 0;
			});
		
			return rec;
		});

		columns = [...rows, ...cols];
	} else if (isWeightedAverageNeeded) {
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

					data[col.property] = Number((numeratorSum / denominatorSum).toFixed(2));
					return;
				}

				if(col.aggegration) {
					if (col.aggegration.type === "SUM") {
						let sum = 0;
				
						objs.forEach((obj, index) => {
							sum += obj[col.property] ? obj[col.property] : 0;
						});
						
						data[col.property] = Number(sum.toFixed(2));
						return;
					}
				}

				data[col.property] = objs[0][col.property];
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

	sortByProperty = sortByProperty ? sortByProperty : columns[0].property;
	sortDirection = sortDirection ? sortDirection : 'asc';
	rawData.sort((a,b) => compare(a[sortByProperty], b[sortByProperty], sortDirection));

	if (gaugeChart) {
		if (gaugeChart.aggegration && gaugeChart.aggegration.type === "AVG") {
			gaugeChart.percentage = gaugeChart.againstSum > 0 ? Number((gaugeChart.columnSum / gaugeChart.againstSum * 100).toFixed(2)) : 0;
		}
	}

	return {
		data: rawData,
		filters: filters,
		columns,
		gaugeChart,
		sortByProperty,
		sortDirection
	};
}

async function getScatterPlotReportData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { series, filters, levels, stateColumnFilter, propertyAsOption } = reportConfig;
	let groupByColumn = reportConfig.groupByDefault;
	let isWeightedAverageNeeded = Object.keys(series).filter(axis => series[axis].weightedAverage || series[axis].aggegration).length > 0;
	let level = reqBody.appName === appNames.nvsk ? 'state' : 'district';
	let currentLevel;
	levels = reqBody.levels ? reqBody.levels : levels;

	if (levels && levels.length > 0) {
		let selectedLevelInd = levels.findIndex(level => level.selected);
		if (selectedLevelInd > -1) {
			currentLevel = reportConfig.levels[selectedLevelInd];
		}

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

	if (reqBody.axisFilters && reqBody.axisFilters.length > 0) {
		axisFilters = reqBody.axisFilters;
	} else {
		axisFilters = Object.keys(series).map(axis => {
			return {
				name: series[axis].name,
				value: null,
				options: [],
				series: axis,
				property: series[axis].property,
				propertyAsOption: series[axis].propertyAsOption
			}
		});
	}
	
	let axisFilterRes = applyScatterChartAxisFilters(axisFilters, rawData, propertyAsOption);
	axisFilters = axisFilterRes.axisFilters;
	rawData = axisFilterRes.rawData;
	
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

	filterRes = applyFilters(filters, rawData, groupByColumn, level);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;
	level = filterRes.level ? filterRes.level : level;
	
	if (isWeightedAverageNeeded) {
		if (!groupByColumn && !currentLevel) {
			throw "Define group by column as you want to do some aggegration";
		}

		rawData = _.chain(rawData)
		.groupBy(groupByColumn ? groupByColumn : currentLevel.property)
		.map((objs, key) => {
			let data = {
				data: ""
			};

			levelPos =  levels.findIndex(level => level.selected);

			if (levelPos !== undefined) {
				if (levelPos > 0) {
					for (let i = 0; i <= levelPos; i++) {
						let level = reportConfig.levels[i];
						data.data += data.data && data.data.length > 0 ? '<br>' : '';
						data.data += level.tooltip.valueAsName ? `${objs[0][level.property]}: ${objs[0][level.tooltip.property]}` : `${level.tooltip.name.trim()}: ${objs[0][level.property]}`;
					}
				} else {
					data.data += data.data && data.data.length > 0 ? '<br>' : '';
					data.data += currentLevel.tooltip.valueAsName ? `${objs[0][currentLevel.property]}: ${objs[0][currentLevel.tooltip.property]}` : `${currentLevel.tooltip.name.trim()}: ${objs[0][currentLevel.property]}`;
				}
			}

			Object.keys(series).forEach(axis => {
				let axisFilter = axisFilters.find(filter => filter.series === axis);
				let axisFilterData = axisFilter.options.find(option => option.value === axisFilter.value);

				if (series[axis].weightedAverage) {
					let numeratorSum = 0;
					let denominatorSum = 0;
					
					objs.forEach((obj, index) => {
						if (!propertyAsOption) {
							let match = true;
							for (let i = 0; i < axisFilter.property.length; i++) {
								if (obj[axisFilter.property[i]] !== axisFilterData.data[i]) {
									match = false;
									break;
								}
							}

							if (match) {
								numeratorSum += obj[series[axis].weightedAverage.property] * obj[series[axis].weightedAverage.against];
								denominatorSum += obj[series[axis].weightedAverage.against];
							}

							return;
						}

						numeratorSum += obj[series[axis].weightedAverage.property] * obj[series[axis].weightedAverage.against];
						denominatorSum += obj[series[axis].weightedAverage.against];
					});
					
					data[axis] = denominatorSum > 0 ? Number((numeratorSum / denominatorSum).toFixed(2)) : 0;

					data.data += `<br>${series[axis].name}: ${data[axis]}`;
				}

				if (series[axis].aggegration) {
					let sum = 0;
					
					objs.forEach((obj, index) => {
						if (!propertyAsOption) {
							let match = true;
							for (let i = 0; i < filter.property.length; i++) {
								if (obj[filter.property[i]] !== filterData.data[i]) {
									match = false;
									break;
								}
							}

							if (match) {
								sum += obj[axisFilter.value];
							}

							return;
						}

						sum += obj[axisFilter.value];
					});
					
					data[axis] = Number((sum / objs.length).toFixed(2));

					data.data += `<br>${series[axis].name}: ${data[axis]}`;
				}
			});

			return data;
		});
	}

	return {
		data: rawData,
		filters,
		axisFilters,
		levels
	};
}

async function getMultiBarChartData(reqBody, reportConfig, rawData) {
	console.log("process started");
	let { columns, filters, mainFilter, sortByProperty, sortDirection } = reportConfig;
	let isWeightedAverageNeeded = columns.filter(col => col.weightedAverage || col.aggegration).length > 0;
	let groupByColumn = reportConfig.defaultLevel;
	let level = reqBody.appName === appNames.nvsk ? 'state' : 'district';

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

	filterRes = applyFilters(filters, rawData, groupByColumn, level);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;
	level = filterRes.level ? filterRes.level : level;

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

	if (sortByProperty && sortDirection)
		rawData.sort((a,b) => compare(a[sortByProperty], b[sortByProperty], sortDirection));

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
	let level = reqBody.appName === appNames.nvsk ? 'state' : 'district';

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

	filterRes = applyFilters(filters, rawData, groupByColumn, level);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;
	level = filterRes.level ? filterRes.level : level;

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
	let level = reqBody.appName === appNames.nvsk ? 'state' : 'district';

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

	filterRes = applyFilters(filters, rawData, groupByColumn, level);
	filters = filterRes.filters;
	rawData = filterRes.rawData;
	groupByColumn = filterRes.groupByColumn;
	level = filterRes.level ? filterRes.level : level;

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

function compare(a, b, sortDirection) {
	return (a < b ? -1 : 1) * (sortDirection === 'asc' ? 1 : -1);
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

async function convertRawDataToJSONAndUploadToS3(fileContent, filePath) {
	let fileExt = path.extname(filePath).substring(1);
	let fileName = path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)));

	if (fileExt === 'xlsx') {
		const workbook = XLSX.read(fileContent);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		
		reportRawData = XLSX.utils.sheet_to_json(worksheet)
									.map(row => _.mapKeys(row, (value, key) => key.trim()));
	} else {
		reportRawData = await csvToJson({
			trim: true
		}).fromString(fileContent.toString('utf-8'));
		reportRawData = reportRawData.map(row => _.mapValues(row, (value, key) => typeof value === 'string' && !isNaN(Number(value.replace(/\,/g, ''))) ? Number(value.replace(/\,/g, '')) : value));
	}

	uploadFile(filePath, fileName, reportRawData);
}

function applyFilters(filters, rawData, groupByColumn, level = undefined) {
	filters.map((filter, index) => {
		let filterOptionMap = new Map();
		let filterProperty = filter.optionValueColumn ? filter.optionValueColumn : filter.column;

		if (index === 0 || filters[index - 1].includeAll || filters[index - 1].defaultValue || (filters[index - 1].value && filters[index - 1].value !== '')) {
			filter.options = [];
			rawData.forEach(record => {
				if (!filterOptionMap.has(record[filterProperty])) {
					filter.options.push({
						label: record[filter.column],
						value: record[filterProperty]
					});

					filterOptionMap.set(record[filterProperty], true);
				}
			});
		}

		return filter;
	});

	filters.map(filter => {
		if (filter.options.length > 1) {
			filter.options.sort((a, b) => compare(a.label, b.label, 'asc'));
		}

		if (filter.defaultValue && filter.options.length > 0) {
			filter.value = filter.options[0].value;
		}

		if (filter.includeAll) {
			filter.options.unshift({
				label: 'Overall',
				value: 'overall'
			});

			filter.value = 'overall';
		}

		return filter;
	});
	
	filters.forEach((filter, index) => {
		let filterProperty = filter.optionValueColumn ? filter.optionValueColumn : filter.column;

		if (filter.value && filter.value !== '' && filter.value !== 'overall') {
			rawData = rawData.filter(record => {
				return record[filterProperty] === filter.value;
			});

			if (filter.level) {
				groupByColumn = filter.level.property;
				level = filter.level.value;
			}
		}
	});

	return {
		filters,
		rawData,
		groupByColumn,
		level
	}
}

function applyScatterChartAxisFilters(axisFilters, rawData, propertyAsOption) {
	axisFilters.map((axisFilter, index) => {
		if (!propertyAsOption) {
			let axisFilterOptionMap = new Map();

			if (axisFilter.options.length === 0 && axisFilter.value === null) {
				axisFilterData = axisFilter.options.find(option => option.value === axisFilter.value);
				axisFilter.options = [];
				
				rawData = rawData.filter(record => {
					let value = "";
					let data = [];

					axisFilter.property.forEach((property, index) => {
						value += index === 0 ? record[property] : "-" + record[property];
						data.push(record[property]);
					});
					
					if (!axisFilterOptionMap.has(value)) {
						axisFilter.options.push({
							label: value,
							value,
							data
						});

						if (axisFilter.value === null) {
							axisFilter.value = value;
							axisFilter.data = data;
						}

						axisFilterOptionMap.set(value, true);
					}

					for (let i = 0; i < axisFilter.property.length; i++) {
						if (record[axisFilter.property[i]] === axisFilter.data[i]) {
							return true;
						}
					}

					return false;
				});
			} else if (axisFilter.value !== null) {
				axisFilterData = axisFilter.options.find(option => option.value === axisFilter.value);
				rawData = rawData.filter(record => {
					for (let i = 0; i < axisFilter.property.length; i++) {
						if (record[axisFilter.property[i]] === axisFilterData.data[i]) {
							return true;
						}
					}

					return false;
				});
			}
		} else {
			if (axisFilter.options && axisFilter.options.length === 0) {
				axisFilter.property.forEach(property => axisFilter.options.push({
					label: property,
					value: property
				}));

				axisFilter.value = axisFilter.options[0].value;
			}
		}

		return axisFilter;
	});

	return {
		axisFilters,
		rawData
	}
}
