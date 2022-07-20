const dataSourceInfo = {
    programStatus: {
        map: {
            pathToFile: 'nishtha/nishtha_coverage_state_wise.json',
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "Program",
                    property: "Program",
                    tooltip: {
                        valueAsName: true,
                        property: "Started"
                    }
                },
                {
                    name: "indicator",
                    property: "Started"
                }
            ],
            filters: [
                {
                    name: 'Program',
                    column: 'Program',
                    defaultValue: true
                }
            ],
            options: {
                legend: {
                    title: 'Nishtha started'
                }
            }
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
                    aggegration: {
                        type: "SUM"
                    }
                },
                {
                    name: "Total Certifications",
                    property: "Total Certifications",
                    aggegration: {
                        type: "SUM"
                    }
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
            pathToFile: 'nishtha/State or Course Enrollment and Completion.json',
            defaultLevel: "Course Name",
            columns: [
                {
                    name: "Course Name",
                    property: "Course Name"
                },
                {
                    name: "Enrollments",
                    property: "Enrollments",
                    aggegration: {
                        type: "SUM"
                    }
                },
                {
                    name: "Completion",
                    property: "Completion",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: 'Program',
                    column: 'Program',
                    includeAll: true
                },
                {
                    name: 'State Name',
                    column: 'State Name',
                    optionValueColumn: "State Code",
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
    },
    totalCoursesAndMedium:{
        loTable: {
            pathToFile: 'nishtha/Total Courses and Medium.json',
            defaultLevel: 'State Name',
            columns: [
                {
                    name: "State Name",
                    property: "State Name"
                    
                },
                {
                    name: "Distinct Count of Course id",
                    property: "Distinct Count of Course id",
                    aggegration: {
                        type: "SUM"
                    }
                },
                {
                    name: "Medium",
                    property: "Medium",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: "Program Name",
                    column: "Program Name"
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;
