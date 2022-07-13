const dataSourceInfo = {
    programStatus: {
        map: {
            pathToFile: 'nishtha/nishtha_coverage_state_wise.json',
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
                    property: "Started",
                    tooltipDesc: 'Energised textbooks (State & NCERT adopted:'
                }
            ],
            filters: [
                {
                    name: 'Program',
                    column: 'Program',
                    defaultValue: true
                }
            ]
        },
        loTable: {
            pathToFile: 'nas/nas_data.json',
            columns: [
                {
                    name: "Indicator Code",
                    property: "Indicator Code"
                },
                {
                    name: "Grade",
                    property: "Grade"
                },
                {
                    name: "Subject",
                    property: "Subject"
                },
                {
                    name: "State",
                    property: "State",
                    transposeColumn: true,
                    weightedAverage: {
                        column: "Performace",
                        against: "Students Surveyed"
                    }
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
