const dataSourceInfo = {
    implementationStatus: {
        loTable: {
            pathToFile: 'diksha_nishtha_program-started.json',
            defaultLevel: 'Program',
            sortByProperty: 'Program',
            mainFilter: 'State Code',
            columns: [
                {
                    name: "Program Name",
                    property: "Program",
                    class: "text-center"
                    
                },
                {
                    name: "NISHTHA Started",
                    property: "Started",
                    class: "text-center"
                }
            ],
            filters: []
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
                    name: "Certifications",
                    property: "Certification",
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
    enrollmentAgainstTargets: {
        stackedBarChart: {
            pathToFile: 'diksha_nishtha_percentage-enrollment-certification.json',
            defaultLevel: "Program",
            mainFilter: 'State Code',
            columns: [
                {
                    name: "Location",
                    property: "Program"
                },
                {
                    name: "% Target Achieved- Enrolment",
                    property: "% Target Achieved- Enrolment",
                    tooltip: {
                        name: "Target Achieved",
                        valueSuffix: '%'
                    }
                },
                {
                    name: "Total Enrolments",
                    property: "Total Enrolments",
                    tooltip: {
                        name: "Actual Enrolment",
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
            filters: []
        }
    },
    certificationAgainstTargets: {
        stackedBarChart: {
            pathToFile: 'diksha_nishtha_percentage-enrollment-certification.json',
            defaultLevel: "Program",
            mainFilter: "State Code",
            columns: [
                {
                    name: "Location",
                    property: "Program"
                },
                {
                    name: "% Target Achieved- Certificates",
                    property: "% Target Achieved- Certificates",
                    tooltip: {
                        name: "Target Achieved",
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
            filters: []
        }
    },
    totalCoursesAndMedium:{
        loTable: {
            pathToFile: 'diksha_nishtha_tot-courses-medium.json',
            defaultLevel: 'Program Name',
            sortByProperty: 'Program Name',
            mainFilter: 'State Code',
            sortDirection: 'asc',
            columns: [
                {
                    name: "Program Name",
                    property: "Program Name",
                    class: "text-center"
                    
                },
                {
                    name: "Total Courses Launched",
                    property: "Total Courses",
                    class: "text-center",
                    aggegration: {
                        type: "SUM"
                    }
                },
                {
                    name: "Total Mediums",
                    property: "Total Medium",
                    class: "text-center",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: []
        }
    }
}

module.exports = dataSourceInfo;
