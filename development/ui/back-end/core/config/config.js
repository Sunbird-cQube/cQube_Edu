const reportTypes = {
    map: "map",
    multiBarChart: "multiBarChart",
    loTable: "loTable"
}

const paths = {
    config: {
        menu: 'config/Menu.json',
        dashboardMenu: 'config/DashboardMenu.json',
        nishthaMenu: 'config/NishthaMenu.json',
        nasMenu: 'config/NasMenu.json'
    },
    nishtha: {
        
    },
    nas: {
        studentPerformance: 'nas/nas_data.xlsx'
    }
};

const columns = {
    nas: {
        studentPerformance: {
            filters: [
                {
                    name: "Grade",
                    property: "Grade"
                },
                {
                    name: "Subject",
                    property: "Subject"
                },
                {
                    name: "Indicator",
                    property: "Indicator"
                }
            ]
        }
    }
};

module.exports = {
    reportTypes,
    paths
};
