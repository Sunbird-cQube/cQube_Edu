const dataSourceInfo = {
   
    stateOrDistrictWiseEnrollments: {
        multiBarChart: {
            pathToFile: 'diksha_nishtha_consumption-by-district.json',
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
                    name: 'State/UT',
                    column: 'State',
                    optionValueColumn: "State Code",
                    level: {
                        value: "district",
                        property: "User District_Correct"
                    },
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

}

module.exports = dataSourceInfo;
