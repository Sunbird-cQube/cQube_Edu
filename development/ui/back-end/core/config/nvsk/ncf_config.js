const dataSourceInfo = {
    progressOfNCF: {
        map: {
            pathToFile: 'ncf/progressOfNCF.json',
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
                    property: "Total SSC Onboarded",
                    tooltip: {
                        name: "Total SSC Onboarded",
                        property:"Total SSC Onboarded"
                    }
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