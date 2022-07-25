const dataSourceInfo = {
    totalLearningSessions: {
        barChart: {
            pathToFile: 'diksha_etb_learning-session.json',
            mainFilter: 'State Code',
            defaultLevel: 'State Name',
            columns: [
                {
                    name: "State/UT name",
                    property: "State Name",
                    isLocationName: true
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
    }
}

module.exports = dataSourceInfo;
