const dataSourceInfo = {
    started_micro_improvements: {
        map: {
            pathToFile: 'micro_improvements/micro_improvements.json',
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
                    property: "Started Micro-Improvement",
                    tooltipDesc: 'Started Micro-Improvement :'
                }
            ],
            filters: []
        }
    }
}

module.exports = dataSourceInfo;