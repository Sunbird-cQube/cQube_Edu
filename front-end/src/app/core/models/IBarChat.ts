export interface IBarChartSeries<T> {
    type: 'bar';
    name: string;
    data: T[];
}