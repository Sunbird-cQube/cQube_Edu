const dataSourceInfo = {
    studentPerformance: {
        map: {
            pathToFile: 'nas/nas_data.json',
            columns: [
                {
                    name: "State",
                    property: "State",
                    isLocationName: true,
                    isSSPColumn: false,
                    isMainFilterForSSP: true,
                    isGroupByColumn: true,
                },
                {
                    name: "District",
                    property: "District",
                    isLocationName: true,
                    isSSPColumn: true,
                    isGroupByColumn: true,
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
                    weightedAverageAgainst: "Students Surveyed"
                }
            ],
            filters: [
                {
                    name: 'Grade',
                    column: 'Grade'
                },
                {
                    name: 'Subject',
                    column: 'Subject'
                },
                {
                    name: 'Indicator Code',
                    column: 'Indicator Code'
                },
                {
                    name: 'State',
                    column: 'State',
                    optionValueColumn: "State Code",
                    isSSPFilter: false
                },
                {
                    name: 'District',
                    column: 'District',
                    optionValueColumn: "District Code",
                    isSSPFilter: true
                }
            ]
        },
        loTable: {
            pathToFile: 'nas/nas_data.json',
            columns: [
                {
                    name: "Indicator Code",
                    property: "Indicator Code",
                    isGroupByColumn: true
                },
                {
                    name: "Grade",
                    property: "Grade",
                    isGroupByColumn: true
                },
                {
                    name: "Subject",
                    property: "Subject",
                    isGroupByColumn: true
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
                    column: 'Grade'
                },
                {
                    name: 'Subject',
                    column: 'Subject'
                },
                {
                    name: 'State',
                    column: 'State',
                    optionValueColumn: "State Code",
                    isSSPFilter: false
                },
                {
                    name: 'District',
                    column: 'District',
                    optionValueColumn: "District Code",
                    isSSPFilter: true
                },
            ]
        }
    }
}

module.exports = dataSourceInfo;
