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
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'Micro-improvements '
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
                        name: "Started Micro-Improvement"
                    }
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'Started Micro-Improvement'
                }
            }
        }
    }
}

module.exports = dataSourceInfo;