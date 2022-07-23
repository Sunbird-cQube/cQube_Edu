const dataSourceInfo = {
    pgi_performance: {
        map: {
            pathToFile: 'pgi_all-dashboard.json',
            locations: [
                {
                    name: "Location",
                    property: "state Name",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State Name"
                        //valueAsName: true,
                        //property: "Started"
                    }
                },
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
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "Effective Classroom Transaction",
                    property: "2. Effective Classroom Transaction",
                    tooltip: {
                        name: "Effective Classroom Transaction"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "Infrastructure, Facilities, Student Entitlements",
                    property: "3. Infrastructure, Facilities, Student Entitlements",
                    tooltip: {
                        name: "Infrastructure, Facilities, Student Entitlements"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "School Safety and Child Protection",
                    property: "4. School Safety and Child Protection",
                    tooltip: {
                        name: "School Safety and Child Protection"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "Digital Learning",
                    property: "5. Digital Learning",
                    tooltip: {
                        name: "Digital Learning"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "indicator",
                    property: "Grand Total",
                    tooltip: {
                        name: "Grand Total"
                    },
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [
                {
                    name: 'State',
                    column: 'state Name',
                    optionValueColumn: "State Code"
                }
            ],
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "state Name"
                },
                {
                    name: "District",
                    value: "district",
                    property: "District Name"
                }
            ],
            options: {
                legend: {
                    title: 'PGI Performance'
                }
            }
        }
    }
}

module.exports = dataSourceInfo;