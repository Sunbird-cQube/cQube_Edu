const dataSourceInfo = {
    PM_poshan_access: {
        map: {
            pathToFile: 'pm_poshan/PM_poshan_access.json',
            defaultLevel: "State",
            columns: [
                {
                    name: "State",
                    property: "State Name",
                    isLocationName: true
                },
                {
                    name: "Location Code",
                    property: "State Code"
                },
                {
                    name: "Latitude",
                    property: "Latitude"
                },
                {
                    name: "Longitude",
                    property: "Longitude"
                },
                {
                    name: "Performance",
                    property: "Total Schools",
                    tooltipDesc: 'Total Schools :'
                }
            ],
            filters: [
                {
                    name: 'State',
                    column: 'State Name',
                    optionValueColumn: "State Code",
                    level: "District"
                }
            ]
        }
    },
    state_onboarded: {
        map: {
            pathToFile: 'pm_poshan/state_onboarded.json',
            columns: [
                {
                    name: "State",
                    property: "State",
                    isLocationName: true
                },
                {
                    name: "Location Code",
                    property: "State Code"
                },
                {
                    name: "Latitude",
                    property: "Latitude"
                },
                {
                    name: "Longitude",
                    property: "Longitude"
                },
                {
                    name: "status",
                    property: "Onboarded on PM Poshan",
                    tooltipDesc: 'Onboarded on PM Poshan :'
                }
            ],
            filters: []
        }
    }
}

module.exports = dataSourceInfo;