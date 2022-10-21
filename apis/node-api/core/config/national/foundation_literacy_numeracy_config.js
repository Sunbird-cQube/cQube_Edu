const dataSourceInfo = {
    loCoveredByTextbook: {
        barChart: {
            pathToFile: 'nipunbharat_lo-covered-by-textbook.json',
            defaultLevel: 'Textbook Name',
            columns: [
                {
                    name: "Textbook Name",
                    property: "Textbook Name"
                },
                {
                    name: "% LOs covered",
                    property: "% LOs covered",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: []
        }
    },
    gradeWiseConsumption: {
        barChart: {
            pathToFile: 'nipunbharat_content-consumption.json',
            defaultLevel: 'Grade',
            columns: [
                {
                    name: "Grade",
                    property: "Grade"
                },
                {
                    name: "Total No of Plays (App and Portal)",
                    property: "Total No of Plays (App and Portal)",
                    aggegration: {
                        type: "SUM"
                    }
                },
                {
                    name: "Total Play time(App and Portal)",
                    property: "Total Play time(App and Portal)",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: 'Subject',
                    column: 'Subject'
                }
            ]
        }
    },
    contentTypeWiseConsumption: {
        barChart: {
            pathToFile: 'nipunbharat_content-consumption.json',
            defaultLevel: 'Mime Type',
            columns: [
                {
                    name: "Mime Type",
                    property: "Mime Type"
                },
                {
                    name: "Total No of Plays (App and Portal)",
                    property: "Total No of Plays (App and Portal)",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: 'Medium',
                    column: 'Medium'
                },
                {
                    name: 'Grade',
                    column: 'Grade'
                },
                {
                    name: 'Subject',
                    column: 'Subject'
                }
            ]
        }
    },
    moduleWideStatus: {
        map: {
            pathToFile: 'nipun_bharat_entry_status.json',
            groupByDefault: "State",
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "Quarter",
                    property: "Quarter",
                    tooltip: {
                        name: "Quarter"
                    }
                },
                {
                    name: "Entry Value",
                    property: "Entry Value",
                    aggegration: {
                        type: "SUM"
                    },
                    tooltip: {
                        name: "Total modules"
                    }
                },
                {
                    name: "indicator",
                    property: "Entry Value",
                    aggegration: {
                        type: "AVG",
                        percentage: true
                    },
                    tooltip: {
                        name: "Modules completed",
                        valueSuffix: "%"
                    }
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [
                {
                    name: 'Module',
                    column: 'Module'
                },
                {
                    name: 'Quarter',
                    column: 'Quarter'
                }
            ],
            options: {
                legend: {
                    title: 'Module Completed'
                },
                tooltip: {
                    reportTypeIndicator: 'percent'
                }
            }
        }
    },
    detailedStatus: {
        loTable: {
            pathToFile: 'nipun_bharat_entry_status.json',
            columns: [
                {
                    name: "Module",
                    property: "Module",
                    sticky: true
                },
                {
                    name: "Sub Module",
                    property: "Sub Module",
                    sticky: true
                },
                {
                    name: "State",
                    property: "State",
                    transposeColumn: true,
                    isHeatMapRequired: true,
                    color: '#002966',
                    valueColumn: "Entry Status",
                    tooltip: {
                        property: "Entry Status"
                    }
                }
            ],
            filters: [
                {
                    name: 'Quarter',
                    column: 'Quarter'
                }
            ]
        },
    }
}

module.exports = dataSourceInfo;
