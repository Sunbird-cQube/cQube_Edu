export interface IReportDataPayload {
    appName: string;
    stateCode?: string;
    dataSourceName: string;
    reportName: string;
    reportType: 'map' | 'multiBarChart' | 'loTable' | 'stackedBarChart' | 'barChart';
    filters?: any;
    levels?: any;
}
