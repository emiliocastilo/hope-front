import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() config: ColumnChartModel;
  @Input() stacked = false;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  private defaultValues = {
    gradient: false,
    xAxis: true,
    yAxis: true,
    legend: true,
    legendTitle: '',
    legendPosition: 'right',
    showXAxisLabel: false,
    showYAxisLabel: false,
  };

  constructor() {}

  ngOnInit(): void {
    console.log(this.config);
    Object.keys(this.defaultValues).forEach((key: string) => {
      this.config[key] =
        this.config[key] !== undefined
          ? this.config[key]
          : this.defaultValues[key];
    });
  }

  public onSelect(value: any) {
    this.select.emit(value);
  }
}
