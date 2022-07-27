const dataSourceInfo = {
    pgi_district_performance: {
        map: {
            pathToFile: 'pgi_all-dashboard.json',
            mainFilter: 'State Code',
            locations: [
                {
                    name: "Location",
                    property: "District Name",
                    level: "district",
                    tooltip: {
                        name: "District Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "Outcome",
                    property: "1. Outcome",
                    tooltip: {
                        name: "Outcome"
                    },
                    includeAsMetricFilter: true
                },
                {
                    name: "Effective Classroom Transaction",
                    property: "2. Effective Classroom Transaction",
                    tooltip: {
                        name: "Effective Classroom Transaction"
                    },
                    includeAsMetricFilter: true
                },
                {
                    name: "Infrastructure, Facilities, Student Entitlements",
                    property: "3. Infrastructure, Facilities, Student Entitlements",
                    tooltip: {
                        name: "Infrastructure, Facilities, Student Entitlements"
                    },
                    includeAsMetricFilter: true
                },
                {
                    name: "School Safety and Child Protection",
                    property: "4. School Safety and Child Protection",
                    tooltip: {
                        name: "School Safety and Child Protection"
                    },
                    includeAsMetricFilter: true
                },
                {
                    name: "Digital Learning",
                    property: "5. Digital Learning",
                    tooltip: {
                        name: "Digital Learning"
                    },
                    includeAsMetricFilter: true
                },
                {
                    name: "indicator",
                    property: "Grand Total",
                    tooltip: {
                        name: "Grand Total"
                    }
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [],
            levels: [
                {
                    name: "District",
                    value: "district",
                    property: "District Name"
                }
            ],
            options: {
                legend: {
                    title: 'PGI District Performance'
                }
            }
        }
    },
    implementationStatus: {
        map: {
            pathToFile: "pgi_program-started.json",
            mainFilter: 'State Code',
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "district",
                    isState: true,
                    tooltip: {
                        name: "State/UT name",
                    },
                },
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "Started",
                    tooltip: {
                        name: "Implemented PGI",
                    },
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: "Implemented PGI",
                },
            },
        },
    }
}

module.exports = dataSourceInfo;