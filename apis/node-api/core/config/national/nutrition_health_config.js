const dataSourceInfo = {
    PM_poshan_access: {
        map: {
            pathToFile: 'pm-poshan_access-across-india.json',
            overallMetricsOption: false,
            locations: [
                {
                    name: "Location",
                    property: "State Name",
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
                    name: "Total Enrolled",
                    property: "Enrolled In July",
                    tooltip: {
                        name: "Total Enrolled"
                    },
                    aggegration: {
                        type: "SUM"
                    },
                    includeAsMetricFilter: true,
                },
                // {
                //     name: "Meal Served",
                //     property: "MealServed(02/July/2022)",
                //     tooltip: {
                //         name: "Meal Served"
                //     },
                //     aggegration: {
                //         type: "SUM"
                //     },
                //     includeAsMetricFilter: true,
                // },
                {
                    name: "Total Schools",
                    property: "Total Schools",
                    tooltip: {
                        name: "Total Schools"
                    },
                    aggegration: {
                        type: "SUM"
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [
                {
                    name: 'State/UT',
                    column: 'State Name',
                    optionValueColumn: "State Code",
                    level: ["district"]
                }
            ],
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State Name",
                    noStateFilter: true
                },
                {
                    name: "District",
                    value: "district",
                    property: "District Name"
                }
            ],
            options: {
                legend: {
                    title: 'PM Poshan Access'
                }
            }
        }
    },
    state_onboarded: {
        map: {
            pathToFile: 'pm-poshan_state-onboarded.json',
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "Onboarded on PM Poshan",
                    tooltip: {
                        name: "Onboarded on PM Poshan"
                    }
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'States onboarded on PM Poshan'
                }
            }
        }
    }
}

module.exports = dataSourceInfo;