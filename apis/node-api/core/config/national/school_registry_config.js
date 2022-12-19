const dataSourceInfo = {
    udise_performance: {
        map: {
            pathToFile: 'udise-all-dashboard.json',
            overallMetricsOption: false,
            locations: [
                {
                    name: "Location",
                    property: "State Name",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
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
                        name: "PTR"
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
                // {
                //     name: "% schools having library",
                //     property: "% schools having library",
                //     tooltip: {
                //         name: "% schools having library"
                //     },
                //     includeAsMetricFilter: true,
                //     aggegration: {
                //         type: "AVG"
                //     }
                // },
                // {
                //     name: "% govt aided schools received textbook",
                //     property: "% govt aided schools received textbook",
                //     tooltip: {
                //         name: "% govt aided schools received textbook"
                //     },
                //     aggegration: {
                //         type: "AVG"
                //     }
                // },
                // {
                //     name: "% schools with Ramp",
                //     property: "% schools with Ramp",
                //     tooltip: {
                //         name: "% schools with Ramp"
                //     },
                //     aggegration: {
                //         type: "AVG"
                //     }
                // },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [
                {
                    name: 'State/UT',
                    column: 'State Name',
                    optionValueColumn: "State Code",
                    level: ["district"]
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
                    title: 'UDISE+ Performance'
                }
            }
        },
        scatterPlot: {
            pathToFile: 'udise-all-dashboard.json',
            series: {
                x: {
                    name: "X-Axis",
                    property: ["% schools having toilet", "% schools having drinking water", "% schools having electricity", "% govt aided schools received textbook", "% schools with Ramp"],
                    aggegration: {
                        type: "AVG"
                    },
                    valueSuffix: '%'
                },
                y: {
                    name: "Y-Axis",
                    property: ["% schools having toilet", "% schools having drinking water", "% schools having electricity", "% govt aided schools received textbook", "% schools with Ramp"],
                    aggegration: {
                        type: "AVG"
                    },
                    valueSuffix: '%'
                }
            },
            propertyAsOption: true,
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State Name",
                    tooltip: {
                        name: "State/UT name"
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
                    name: 'State/UT',
                    column: 'State Name',
                    optionValueColumn: "State Code",
                    level: ["district"]
                }
            ]
        }
    },
    implementationStatus: {
        map: {
            pathToFile: "udise_program-started.json",
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State/UT name",
                    },
                },
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "Started",
                    tooltip: {
                        name: "Implemented UDISE+",
                    },
                },
                {
                    name: "state_code",
                    property: "State Code",
                },
            ],
            filters: [],
            options: {
                legend: {
                    title: "Implemented UDISE+",
                },
            },
        },
    }
}

module.exports = dataSourceInfo;