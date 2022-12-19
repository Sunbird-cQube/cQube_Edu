export interface IReportDataPayload {
    appName: string;
    stateCode?: string;
    dataSourceName: string;
    reportName: string;
    reportType: 'map' | 'multiBarChart' | 'loTable' | 'stackedBarChart' | 'barChart' | 'scatterPlot' | 'gaugeChart';
    filters?: any;
    levels?: any;
    metricFilter?: any;
    axisFilters?: any;
}
