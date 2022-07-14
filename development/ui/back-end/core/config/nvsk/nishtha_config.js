const dataSourceInfo = {
    programStatus: {
        map: {
            pathToFile: 'nishtha/nishtha_coverage_state_wise.json',
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
                    property: "Started",
                    tooltipDesc: 'Energised textbooks (State & NCERT adopted:'
                }
            ],
            filters: [
                {
                    name: 'Program',
                    column: 'Program',
                    defaultValue: true
                }
            ]
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
                    level: 'User District_Correct'
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;
