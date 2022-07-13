const dataSourceInfo = {
    studentPerformance: {
        map: {
            pathToFile: 'nas/nas_data.json',
            defaultLevel: "State",
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
                    level: "District"
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
        },
        scatterPlot: {
            pathToFile: 'nas/nas_data.json',
            defaultLevel: ["State", "Grade", "Subject"],
            columns: [
                {
                    "name": "X-Axis",
                    "property": ["Grade", "Subject"],
                    weightedAverage: {
                        column: "Performance",
                        against: "Students Surveyed"
                    }
                },
                {
                    "name": "Y-Axis",
                    "property": ["Grade", "Subject"],
                    weightedAverage: {
                        column: "Performance",
                        against: "Students Surveyed"
                    }
                }
            ],
            filters: [
                {
                    "name": "X-Axis",
                    "property": ["Grade", "Subject"]
                },
                {
                    "name": "Y-Axis",
                    "property": ["Grade", "Subject"]
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;
