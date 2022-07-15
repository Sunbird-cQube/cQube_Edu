const dataSourceInfo = {
    statesEnergizedTextBooks: {
        map: {
            pathToFile: 'etb/ETB_states_running_program.json',
            columns: [
                {
                    name: "State",
                    property: "State",
                    isLocationName: true
                },
                {
                    name: "Location Code",
                    property: "State Code"
                },
                {
                    name: "Latitude",
                    property: "Latitude"
                },
                {
                    name: "Longitude",
                    property: "Longitude"
                },
                {
                    name: "status",
                    property: "Energised textbooks (State & NCERT adopted)",
                    tooltipDesc: 'Energised textbooks (State & NCERT adopted:'
                }
            ],
            filters: []
        },
        multiBarChart: {
            pathToFile: 'nishtha/Enrollments And Completion.json',
            defaultLevel: "State",
            columns: [
                {
                    name: "Location",
                    key: true
                },
                {
                    name: "Total Enrollments",
                    property: "Total Enrollments",
                    aggegration: "SUM"
                },
                {
                    name: "Total Certifications",
                    property: "Total Certifications",
                    aggegration: "SUM"
                }
            ],
            filters: [
                {
                    name: 'Program',
                    column: 'Program',
                    defaultValue: true
                },
                {
                    name: 'State',
                    column: 'State',
                    optionValueColumn: "State Code",
                    level: 'User District_Correct',
                    includeAll: true
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;
