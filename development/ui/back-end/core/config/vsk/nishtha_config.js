const dataSourceInfo = {
    programStatus: {
        map: {
            pathToFile: 'diksha_nishtha_program-started.json',
            mainFilter: 'State Code',
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "district",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
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
                    title: 'NISHTHA started'
                }
            }
        }
    },
    stateOrDistrictWiseEnrollments: {
        multiBarChart: {
            pathToFile: 'diksha_nishtha_consumption-by-district.json',
            mainFilter: 'State Code',
            defaultLevel: "District Code",
            columns: [
                {
                    name: "Location",
                    key: "User District_Correct"
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
                }
            ]
        }
    },
    stateOrCourseWiseEnrollments: {
        multiBarChart: {
            pathToFile: 'diksha_nishtha_consumption-by-course.json',
            defaultLevel: "Course Name",
            mainFilter: 'State Code',
            sortByProperty: 'Enrollments',
            sortDirection: 'desc',
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
                }
            ]
        }
    },
    enrollmentAgainstTargets: {
        stackedBarChart: {
            pathToFile: 'diksha_nishtha_percentage-enrollment-certification.json',
            defaultLevel: "State",
            mainFilter: 'State Code',
            columns: [
                {
                    name: "Location",
                    property: "State"
                },
                {
                    name: "% Target Achieved- Enrolment",
                    property: "% Target Achieved- Enrolment",
                    tooltip: {
                        name: "Target Acheived",
                        valueSuffix: '%'
                    }
                },
                {
                    name: "Total Enrolments",
                    property: "Total Enrolments",
                    tooltip: {
                        name: "Actaul Enrolment",
                        localeString: 'en-IN'
                    }
                },
                {
                    name: "Total Expected Enrolment",
                    property: "Total Expected Enrolment",
                    tooltip: {
                        name: "Total Expected Enrolment",
                        localeString: 'en-IN'
                    }
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
            pathToFile: 'diksha_nishtha_percentage-enrollment-certification.json',
            defaultLevel: "State",
            mainFilter: "State Code",
            columns: [
                {
                    name: "Location",
                    property: "State"
                },
                {
                    name: "% Target Achieved- Certificates",
                    property: "% Target Achieved- Certificates",
                    tooltip: {
                        name: "Target Acheived",
                        valueSuffix: '%'
                    }
                },
                {
                    name: "Actual Certification",
                    property: "Total Certificates Issued",
                    tooltip: {
                        name: "Actual Certification",
                        localeString: 'en-IN'
                    }
                },
                {
                    name: "Total Expected Enrolment",
                    property: "Total Expected Enrolment",
                    tooltip: {
                        name: "Total Expected Enrolment",
                        localeString: 'en-IN'
                    }
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
            pathToFile: 'diksha_nishtha_tot-courses-medium.json',
            defaultLevel: 'State Name',
            sortByProperty: 'Total Courses',
            mainFilter: 'State Code',
            sortDirection: 'desc',
            columns: [
                {
                    name: "State/UT Name",
                    property: "State Name",
                    class: "text-center"
                    
                },
                {
                    name: "Count of courses launched",
                    property: "Total Courses",
                    class: "text-center",
                    aggegration: {
                        type: "SUM"
                    }
                },
                {
                    name: "Count of course mediums",
                    property: "Total Medium",
                    class: "text-center",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: "Program",
                    column: "Program Name"
                }
            ]
        }
    }

}

module.exports = dataSourceInfo;
