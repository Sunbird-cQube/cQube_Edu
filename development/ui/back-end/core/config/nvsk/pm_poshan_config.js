const dataSourceInfo = {
    PM_poshan_access: {
        map: {
            pathToFile: 'pm_poshan/PM_poshan_access.json',
            locations: [
                {
                    name: "Location",
                    property: "State Name",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State Name"
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
                    property: "Total Schools",
                    tooltip: {
                        name: "Total Schools",
                        property: "Total Schools"
                    },
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: 'State',
                    column: 'State Name',
                    optionValueColumn: "State Code"
                }
            ],
            levels: [
                {
                    name: "State",
                    value: "state",
                    property: "State Name"
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
        // map: {
        //     pathToFile: 'pm_poshan/state_onboarded.json',
        //     columns: [
        //         {
        //             name: "State",
        //             property: "State",
        //             isLocationName: true
        //         },
        //         {
        //             name: "Location Code",
        //             property: "State Code"
        //         },
        //         {
        //             name: "Latitude",
        //             property: "Latitude"
        //         },
        //         {
        //             name: "Longitude",
        //             property: "Longitude"
        //         },
        //         {
        //             name: "status",
        //             property: "Onboarded on PM Poshan",
        //             tooltipDesc: 'Onboarded on PM Poshan :'
        //         }
        //     ],
        //     filters: []
        // },
        map: {
            pathToFile: 'pm_poshan/state_onboarded.json',
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
                    property: "Onboarded on PM Poshan",
                    tooltip: {
                        name: "Onboarded on PM Poshan"
                    }
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