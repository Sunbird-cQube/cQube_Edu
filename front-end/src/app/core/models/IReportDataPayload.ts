export interface IReportDataPayload {
    config: string;
    stateId?: string;
    dataSource: string;
    reportName: string;
    reportType: string;
    filtersRequired?: boolean;
}
