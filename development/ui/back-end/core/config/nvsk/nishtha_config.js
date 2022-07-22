const dataSourceInfo = {
    programStatus: {
        map: {
            pathToFile: 'nishtha/diksha_nishtha_program-started.json',
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
                },
                {
                    name: "state_code",
                    property: "State Code"
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
            pathToFile: 'nishtha/diksha_nishtha_percentage-enrollment-certification.json',
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
            pathToFile: 'nishtha/diksha_nishtha_consumption-by-course.json',
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
                    defaultValue: true
                },
                {   
                    name: 'State Name',
                    column: 'State Name',
                    optionValueColumn: "State Code"
                }
            ]
        }
    },
    enrollmentAgainstTargets: {
        stackedBarChart: {
            pathToFile: 'nishtha/diksha_nishtha_percentage-enrollment-certification.json',
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
            pathToFile: 'nishtha/diksha_nishtha_percentage-enrollment-certification.json',
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
            pathToFile: 'nishtha/diksha_nishtha_tot-courses-medium.json',
            defaultLevel: 'State Name',
            sortByProperty: 'Total Courses',
            columns: [
                {
                    name: "State Name",
                    property: "State Name",
                    class: "text-center"
                    
                },
                {
                    name: "Total Courses",
                    property: "Total Courses",
                    class: "text-center",
                    aggegration: {
                        type: "SUM"
                    }
                },
                {
                    name: "Total Medium",
                    property: "Total Medium",
                    class: "text-center",
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
