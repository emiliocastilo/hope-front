import { ChartObjectModel } from './chart-object.model';

export class ColumnChartModel {
  constructor(
    public chartTitle: string,
    public view: number[],
    public scheme: any,
    public results: ChartObjectModel[],
    public gradient?: boolean,
    public xAxis?: boolean,
    public yAxis?: boolean,
    public legend?: boolean,
    public showXAxisLabel?: boolean,
    public showYAxisLabel?: boolean,
    public xAxisLabel?: string,
    public yAxisLabel?: string,
    public legendPosition?: string,
    public legendTitle?: string
  ) {}
}
