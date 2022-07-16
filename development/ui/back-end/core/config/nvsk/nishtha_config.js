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
        }
    },
    stateOrDistrictWiseEnrollments: {
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
                    includeAll: true
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
    },
    stateOrCourseWiseEnrollments: {
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
                    includeAll: true
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
    },
    enrollmentAgainstTargets: {
        stackedBarChart: {
            pathToFile: 'nishtha/Enrollment And Completion of Expected.json',
            defaultLevel: "State",
            columns: [
                {
                    name: "Location",
                    property: "State"
                },
                {
                    name: "% Target Achieved- Enrolment",
                    property: "% Target Achieved- Enrolment"
                }
            ],
            filters: [
                {
                    name: 'Program',
                    column: 'Program',
                    defaultValue: true
                }
            ]
        }
    },
    certificationAgainstTargets: {
        stackedBarChart: {
            pathToFile: 'nishtha/Enrollment And Completion of Expected.json',
            defaultLevel: "State",
            columns: [
                {
                    name: "Location",
                    property: "State"
                },
                {
                    name: "% Target Achieved- Certificates",
                    property: "% Target Achieved- Certificates"
                }
            ],
            filters: [
                {
                    name: 'Program',
                    column: 'Program',
                    defaultValue: true
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;
