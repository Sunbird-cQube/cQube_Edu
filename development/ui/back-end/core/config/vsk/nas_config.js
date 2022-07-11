export default dataSourceInfo = {
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
