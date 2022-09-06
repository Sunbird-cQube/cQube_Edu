const reportTypes = {
    map: "map",
    multiBarChart: "multiBarChart",
    loTable: "loTable",
    scatterPlot: "scatterPlot",
    stackedBarChart: "stackedBarChart",
    barChart: "barChart",
    gaugeChart: "gaugeChart"
}

const appNames = {
    national: "national",
    state: "state"
}

const configFiles = {
    dashboardMenu: 'main_metrics.json',
    users: 'users.json'
};

module.exports = {
    reportTypes,
    configFiles,
    appNames
};
