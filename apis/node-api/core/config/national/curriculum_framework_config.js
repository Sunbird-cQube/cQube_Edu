const dataSourceInfo = {
    progressOfNCF: {
        map: {
            pathToFile: 'ncf_all-dashboard.json',
            overallMetricsOption: false,
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
                    name: "Mobile Survey Completed",
                    property: "Mobile Survey Completed (Target: 3000 per State/ UT)",
                    tooltip: {
                        name: "Mobile Survey Completed",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "DCR to be uploaded",
                    property: "Number of DCR to be uploaded (Target)",
                    tooltip: {
                        name: "DCR to be uploaded",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "DCR Uploaded",
                    property: "DCR Completed/ Uploaded (1498/1568)",
                    tooltip: {
                        name: "DCR Uploaded",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "Paper e-template submitted",
                    property: "State Position Paper e-template submitted",
                    tooltip: {
                        name: "Paper e-template submitted",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "National District Groups created",
                    property: "National District Groups (NDGs) created",
                    tooltip: {
                        name: "National District Groups created",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "National DCR Submitted",
                    property: "National DCR Submitted",
                    tooltip: {
                        name: "National DCR Submitted",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "National DCR Target",
                    property: "National DCR Target",
                    tooltip: {
                        name: "National DCR Target",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "Total SSC Onboarded",
                    property: "Total SSC Onboarded",
                    tooltip: {
                        name: "Total SSC Onboarded",
                    },
                    includeAsMetricFilter: true,
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'NCF Progress'
                }
            },
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State"
                }
            ]
        },
    }
}

module.exports = dataSourceInfo;