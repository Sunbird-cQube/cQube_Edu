const dataSourceInfo = {
    studentPerformance: {
        map: {
            pathToFile: 'nas/nas_data.json',
            defaultLevel: "District",
            mainFilter: "State Code",
            columns: [
                {
                    name: "District",
                    property: "District",
                    isLocationName: true
                },
                {
                    name: "Location Code",
                    property: "District Code"
                },
                {
                    name: "Latitude",
                    property: "Latitude",
                },
                {
                    name: "Longitude",
                    property: "Longitude",
                },
                {
                    name: "Performance",
                    property: "Performance",
                    weightedAverage: {
                        column: "Performance",
                        against: "Students Surveyed"
                    }
                }
            ],
            filters: [
                {
                    name: 'Grade',
                    property: 'Grade'
                },
                {
                    name: 'Subject',
                    property: 'Subject'
                },
                {
                    name: 'District',
                    property: 'District',
                    optionValueColumn: "District Code"
                }
            ]
        },
        loTable: {
            pathToFile: 'common/nas/nas_data',
            columns: [
                {
                    name: "Grade",
                    property: "Grade"
                },
                {
                    name: "Subject",
                    property: "Subject",
                },
                {
                    name: "Indicator",
                    property: "Indicator",
                },
                {
                    name: "Performance",
                    property: "Performance",
                    weightedAverageAgainst: "Students Surveyed",
                    transposeColumn: "State"
                }
            ],
            filters: [
                {
                    name: 'Grade',
                    property: 'Grade'
                },
                {
                    name: 'Subject',
                    property: 'Subject'
                },
                {
                    name: 'State',
                    property: 'State',
                    optionValueColumn: "State Code",
                    isSSPFilter: false
                },
                {
                    name: 'District',
                    property: 'District',
                    optionValueColumn: "District Code",
                    isSSPFilter: true
                },
            ]
        }
    }
}

module.exports = dataSourceInfo;
