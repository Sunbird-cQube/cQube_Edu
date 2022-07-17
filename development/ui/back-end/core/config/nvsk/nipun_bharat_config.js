const dataSourceInfo = {
    loCoveredByTextbook: {
        barChart: {
            pathToFile: 'nipun_bharat/loCoveredByTextbook.json',
            defaultLevel: 'Textbook Name',
            columns: [
                {
                    name: "Textbook Name",
                    property: "Textbook Name"
                },
                {
                    name: "% LOs covered",
                    property: "% LOs covered",
                    aggegration: "SUM"
                }
            ],
            filters: []
        }
    },
    gradeWiseConsumption: {
        barChart: {
            pathToFile: 'nipun_bharat/contentTypeWiseConsumption.json',
            defaultLevel: 'Grade',
            columns: [
                {
                    name: "Grade",
                    property: "Grade"
                },
                {
                    name: "Total No of Plays (App and Portal)",
                    property: "Total No of Plays (App and Portal)",
                    aggegration: "SUM"
                },
                {
                    name: "Total Play time(App and Portal)",
                    property: "Total Play time(App and Portal)",
                    aggegration: "SUM"
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
            pathToFile: 'nipun_bharat/contentTypeWiseConsumption.json',
            defaultLevel: 'Mime Type',
            columns: [
                {
                    name: "Mime Type",
                    property: "Mime Type"
                },
                {
                    name: "Total No of Plays (App and Portal)",
                    property: "Total No of Plays (App and Portal)",
                    aggegration: "SUM"
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
