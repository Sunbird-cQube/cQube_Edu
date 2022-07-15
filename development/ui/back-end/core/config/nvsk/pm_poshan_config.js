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
    }
}

module.exports = dataSourceInfo;