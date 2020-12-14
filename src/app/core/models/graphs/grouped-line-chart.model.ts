export interface GroupedLineChartGroupSerieData {
    name: string;
    value: number;
}

export interface GroupedLineChartGroupData {
    name: string,
    series: Array<GroupedLineChartGroupSerieData>
}