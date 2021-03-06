import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit {
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
    Object.keys(this.defaultValues).forEach((key: string) => {
      this.config[key] = this.config[key]
        ? this.config[key]
        : this.defaultValues[key];
    });
  }

  public onSelect(value: any) {
    this.select.emit(value);
  }
}
