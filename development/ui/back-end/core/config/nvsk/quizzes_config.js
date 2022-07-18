const dataSourceInfo = {
    quizzesStarted: {
        map: {
            pathToFile: 'quizzes/quizzesStarted.json',
            groupByDefault: "State",
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State"
                    }
                }
            ],
            dimensions: [
                {
                    name: 'Quiz Name',
                    property: 'Quiz Name',
                    tooltip: {
                        name: "Quiz Name"
                    }
                },
                {
                    name: "indicator",
                    property: "Total Enrollments",
                    aggegration: {
                        type: "SUM"
                    },
                    tooltip: {
                        name: "Enrollments"
                    }
                }
            ],
            filters: [
                {
                    name: 'Quiz Name',
                    column: 'Quiz Name',
                    defaultValue: true
                }
            ],
            options: {
                legend: {
                    title: 'State Participation in Quiz'
                }
            }
        },
        loTable: {
            pathToFile: 'quizzes/quizzesStarted.json',
            defaultLevel: 'State',
            columns: [
                {
                    name: "State",
                    property: "State"
                },
                {
                    name: "Total Enrollments",
                    property: "Total Enrollments",
                    class: "text-center",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: "Quiz Name",
                    column: "Quiz Name"
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;
