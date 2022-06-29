export interface IDashboardMenu {
    title: string;
    navigationURL: string;
    metrics: IDashboardMetric[]
}

export interface IDashboardMetric {
    name: string;
    value: string;
}