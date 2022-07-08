const reportTypes = {
    map: "map",
    multiBarChart: "multiBarChart",
    loTable: "loTable"
}

const appNames = {
    nvsk: "nvsk",
    vsk: "vsk"
}

const configFiles = {
    menu: 'config/Menu.json',
    dashboardMenu: 'config/DashboardMenu.json',
    nishthaMenu: 'config/NishthaMenu.json',
    nasMenu: 'config/NasMenu.json'
}

const dataSourceInfo = {
    nas: {
        studentPerformance: {
            map: {
                pathToFile: 'common/nas/nas_data',
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
                    {
                        name: 'Grade',
                        property: 'Grade'
                    },
                    {
                        name: 'Subject',
                        property: 'Subject'
                    }
                ]
            },
            loTable: {
                pathToFile: 'common/nas/nas_data',
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
            }
        }
    }
};

module.exports = {
    reportTypes,
    configFiles,
    dataSourceInfo,
    appNames
};
