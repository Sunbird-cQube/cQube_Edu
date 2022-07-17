const dataSourceInfo = {
    pgi_performance: {
        map: {
            pathToFile: 'pgi/pgiPerformance.json',
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
                    name: "indicator",
                    property: "Grand Total",
                    tooltip: {
                        name: "Grand Total",
                        property: "Grand Total"
                    },
                    aggegration: {
                        type: "SUM"
                    }
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