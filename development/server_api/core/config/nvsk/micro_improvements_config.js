const dataSourceInfo = {
    micro_improvements: {
        map: {
            pathToFile: 'micro_improvements/micro_improvements.json',
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
                    name: "indicator",
                    property: "Total Micro Improvements Projects",
                    tooltip: {
                        name: "Total Micro Improvements Projects",
                        property:"Total Micro Improvements Projects"
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
                    title: 'Micro-improvements '
                }
            }
        },
    },
    micro_improvements_program: {
        map: {
            pathToFile: 'micro_improvements/micro_improvements.json',
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
                    name: "indicator",
                    property: "Started Micro-Improvement",
                    tooltip: {
                        name: "Participating in Micro-Improvement Program"
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
                    title: 'Started doing Micro-Improvement'
                }
            }
        }
    }
}

module.exports = dataSourceInfo;