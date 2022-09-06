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
    }
}

module.exports = dataSourceInfo;
