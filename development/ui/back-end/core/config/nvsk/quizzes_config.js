const dataSourceInfo = {
    quizzesStarted: {
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
                    class: "text-center"
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
