export interface IReportDataPayload {
    appName: string;
    stateCode?: string;
    dataSourceName: string;
    reportName: string;
    reportType: 'map' | 'multiBarChart' | 'loTable' | 'stackedBarChart' | 'barChart' | 'scatterPlot';
    filters?: any;
    levels?: any;
    metricFilter?: any;
    axisFilters?: any;
}
