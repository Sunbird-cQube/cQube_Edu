const dataSourceInfo = {
    udise_performance: {
        map: {
            pathToFile: 'udise/UDISE_District_wise_Data.json',
            overallMetricsOption: false,
            locations: [
                {
                    name: "Location",
                    property: "State Name",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State Name"
                        //valueAsName: true,
                        //property: "Started"
                    }
                },
                {
                    name: "Location",
                    property: "District Name",
                    level: "district",
                    tooltip: {
                        name: "District Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "PTR",
                    property: "PTR",
                    tooltip: {
                        name: "Outcome"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "% schools having toilet",
                    property: "% schools having toilet",
                    tooltip: {
                        name: "% schools having toilet"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "% schools having drinking water",
                    property: "% schools having drinking water",
                    tooltip: {
                        name: "% schools having drinking water"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "% schools having electricity",
                    property: "% schools having electricity",
                    tooltip: {
                        name: "% schools having electricity"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "% schools having library",
                    property: "% schools having library",
                    tooltip: {
                        name: "% schools having library"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "% govt aided schools received textbook",
                    property: "% govt aided schools received textbook",
                    tooltip: {
                        name: "% govt aided schools received textbook"
                    },
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "% schools with Ramp",
                    property: "% schools with Ramp",
                    tooltip: {
                        name: "% schools with Ramp"
                    },
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [
                {
                    name: 'State',
                    column: 'State Name',
                    optionValueColumn: "State Code"
                }
            ],
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State Name"
                },
                {
                    name: "District",
                    value: "district",
                    property: "District Name"
                }
            ],
            options: {
                legend: {
                    title: 'PGI Performance'
                }
            }
        },
        scatterPlot: {
            pathToFile: 'udise/UDISE_District_wise_Data.json',
            series: {
                x: {
                    name: "X-Axis",
                    property: ["% schools having toilet", "% schools having drinking water", "% schools having electricity", "% schools having library", "% govt aided schools received textbook", "% schools with Ramp"],
                    aggegration: {
                        type: "AVG"
                    }
                },
                y: {
                    name: "Y-Axis",
                    property: ["% schools having toilet", "% schools having drinking water", "% schools having electricity", "% schools having library", "% govt aided schools received textbook", "% schools with Ramp"],
                    aggegration: {
                        type: "AVG"
                    }
                }
            },
            propertyAsOption: true,
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State Name",
                    tooltip: {
                        name: "State Name"
                    }
                },
                {
                    name: "District",
                    value: "district",
                    property: "District Name",
                    tooltip: {
                        name: "District Name"
                    }
                }
            ],
            filters: [
                {
                    name: 'State',
                    column: 'State Name',
                    optionValueColumn: "State Code"
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;