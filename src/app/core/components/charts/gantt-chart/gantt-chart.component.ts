import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GanttChart } from 'src/app/core/models/graphs/gantt-chart.model';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
})
export class GanttChartComponent implements OnInit {
  @Input() config: GanttChart;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  private defaultValues = {
    type: 'Timeline',
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
