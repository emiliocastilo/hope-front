export class ColumnChartModel {
  constructor(
    public view: number[],
    public scheme: any,
    public results: any[],
    public gradient?: boolean,
    public xAxis?: boolean,
    public yAxis?: boolean,
    public legend?: boolean,
    public showXAxisLabel?: boolean,
    public showYAxisLabel?: boolean,
    public xAxisLabel?: string,
    public yAxisLabel?: string
  ) {}
}
