const dataSourceInfo = {
    pgi_performance: {
        map: {
            pathToFile: 'pgi/pgi_performance.json',
            defaultLevel: "State",
            columns: [
                {
                    name: "State",
                    property: "state Name",
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
                }
            ],
            filters: []
        }
    }
}