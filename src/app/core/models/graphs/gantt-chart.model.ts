export class GanttChart {
  constructor(
    public data: any[],
    public columns: string[],
    public groupByRowLabel: boolean,
    public formatter: any[],
    public type?: string
  ) {}
}
