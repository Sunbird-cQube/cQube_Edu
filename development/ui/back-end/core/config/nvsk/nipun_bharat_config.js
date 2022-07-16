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
            pathToFile: 'nipun_bharat/gradeWiseConsumption.json',
            defaultLevel: 'State Name',
            columns: [
                {
                    name: "State Name",
                    property: "State Name",
                    isLocationName: true
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
                    column: 'medium_new'
                },
                {
                    name: 'Grade',
                    column: 'grade_new'
                },
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
            defaultLevel: 'State Name',
            columns: [
                {
                    name: "State Name",
                    property: "State Name",
                    isLocationName: true
                },
                {
                    name: "Total No of Plays (App and Portal)",
                    property: "Total No of Plays (App and Portal)",
                    aggegration: "SUM"
                }
            ],
            filters: []
        }
    }
}

module.exports = dataSourceInfo;
