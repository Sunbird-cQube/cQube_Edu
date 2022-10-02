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
    entryStatus: {
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
