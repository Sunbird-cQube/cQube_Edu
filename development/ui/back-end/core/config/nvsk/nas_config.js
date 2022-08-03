const dataSourceInfo = {
    studentPerformance: {
        map: {
            pathToFile: 'nas_all-dashboard.json',
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
                    }
                },
                {
                    name: "Location",
                    property: "District",
                    level: "district",
                    tooltip: {
                        name: "District Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "Learning Outcome",
                    property: "Learning Outcome",
                    tooltip: {
                        name: "Learning Outcome",
                        property: "Learning Outcome"
                    }
                },
                {
                    name: "indicator",
                    property: "Performance",
                    weightedAverage: {
                        property: "Performance",
                        against: "Students Surveyed"
                    },
                    tooltip: {
                        name: "Performance",
                        property: "Performance"
                    }
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [
                {
                    name: 'Grade',
                    column: 'Grade',
                    defaultValue: true
                },
                {
                    name: 'Subject',
                    column: 'Subject'
                },
                {
                    name: 'Learning Outcome Code',
                    column: 'Learning Outcome Code'
                },
                {
                    name: 'State/UT',
                    column: 'State',
                    optionValueColumn: "State Code",
                    level: ["district"]
                }
            ],
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State"
                },
                {
                    name: "District",
                    value: "district",
                    property: "District"
                }
            ],
            options: {
                legend: {
                    title: 'NAS Performance'
                },
                tooltip: {
                    reportTypeIndicator: 'percent'
                }
            }
        },
        loTable: {
            pathToFile: 'nas_all-dashboard.json',
            columns: [
                {
                    name: "Learning Outcome Code",
                    property: "Learning Outcome Code",
                    tooltip: {
                        property: "Learning Outcome"
                    }
                },
                {
                    name: "Grade",
                    property: "Grade"
                },
                {
                    name: "Subject",
                    property: "Subject"
                },
                {
                    name: "State",
                    property: "State",
                    transposeColumn: true,
                    isHeatMapRequired: true,
                    color: '#002966',
                    weightedAverage: {
                        property: "Performance",
                        against: "Students Surveyed"
                    },
                    level: "state"
                },
                {
                    name: "District",
                    property: "District",
                    transposeColumn: true,
                    isHeatMapRequired: true,
                    color: '#002966',
                    weightedAverage: {
                        property: "Performance",
                        against: "Students Surveyed"
                    },
                    level: "district"
                }
            ],
            filters: [
                {
                    name: 'Grade',
                    column: 'Grade'
                },
                {
                    name: 'Subject',
                    column: 'Subject'
                },
                {
                    name: 'State/UT',
                    column: 'State',
                    optionValueColumn: "State Code",
                    level: {
                        value: "district",
                        property: "District"
                    }
                }
            ]
        },
        scatterPlot: {
            pathToFile: 'nas_all-dashboard.json',
            series: {
                x: {
                    name: "X-Axis",
                    property: ["Grade", "Subject"],
                    weightedAverage: {
                        property: "Performance",
                        against: "Students Surveyed"
                    }
                },
                y: {
                    name: "Y-Axis",
                    property: ["Grade", "Subject"],
                    weightedAverage: {
                        property: "Performance",
                        against: "Students Surveyed"
                    }
                }
            },
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State",
                    tooltip: {
                        name: "State/UT name"
                    }
                },
                {
                    name: "District",
                    value: "district",
                    property: "District",
                    tooltip: {
                        name: "District Name"
                    }
                }
            ],
            filters: [
                {
                    name: 'State/UT',
                    column: 'State',
                    optionValueColumn: "State Code",
                    level: ["district"]
                }
            ]
        }
    },
    implementationStatus: {
        map: {
            pathToFile: "nas_program-started.json",
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
                        name: "Implemented NAS",
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
                    title: "Implemented NAS",
                },
            },
        },
    }
}

module.exports = dataSourceInfo;
