const dataSourceInfo = {
    pgi_district_performance: {
        map: {
            pathToFile: 'pgi_all-dashboard.json',
            locations: [
                {
                    name: "Location",
                    property: "state Name",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
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
                    name: "Governance Processes",
                    property: "6.Governance Processes",
                    tooltip: {
                        name: "Governance Processes"
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
                        name: "Overall"
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
                    name: 'State/UT',
                    column: 'state Name',
                    optionValueColumn: "State Code"
                }
            ],
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
    pgi_state_performance: {
        map: {
            pathToFile: 'pgi_state-wise-performance.json',
            overallMetricsOption: false,
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
                        //valueAsName: true,
                        //property: "Started"
                    }
                }
            ],
            dimensions: [
                {
                    name: "Learning Outcomes & Quality",
                    property: "Learning Outcomes & Quality",
                    tooltip: {
                        name: "Learning Outcomes & Quality"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "Access",
                    property: "Access",
                    tooltip: {
                        name: "Access"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "Infrastructure & Facilities",
                    property: "Infrastructure & Facilities",
                    tooltip: {
                        name: "Infrastructure & Facilities"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "Equity",
                    property: "Equity",
                    tooltip: {
                        name: "Equity"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
                    }
                },
                {
                    name: "Governance Processes",
                    property: "Governance Processes",
                    tooltip: {
                        name: "Governance Processes"
                    },
                    includeAsMetricFilter: true,
                    aggegration: {
                        type: "AVG"
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
                    name: "State",
                    value: "state",
                    property: "State"
                }
            ],
            options: {
                legend: {
                    title: 'PGI State Performance'
                }
            }
        }
    },
    implementationStatus: {
        map: {
            pathToFile: "pgi_program-started.json",
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
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
                },
                {
                    name: "state_code",
                    property: "State Code",
                },
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