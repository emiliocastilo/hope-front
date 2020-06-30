import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
@Component({
  selector: 'app-many-chart-modal',
  templateUrl: './many-chart-modal.component.html',
  styleUrls: ['./many-chart-modal.component.scss'],
})
export class ManyChartModalComponent implements OnInit {
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() data: any[];

  public dataParsed: any[] = [];
  public columnsHeader: string[] = ['date', 'value'];

  constructor() {}

  ngOnInit(): void {
    const scheme = {
      domain: ['#ffc107', '#2196f3'],
    };

    this.dataParsed = this.data.map((value: any, key: number) => {
      const values: ChartObjectModel[] = [
        {
          name: this.data[key].name,
          series: [],
        },
      ];

      value.value.forEach((valueTwo: any, keyTwo: number) => {
        const object: ChartObjectModel = {
          value: valueTwo.value,
          name: valueTwo.date,
          date: valueTwo.date,
        };
        values[0].series.push(object);
      });

      const chartConfig = new ColumnChartModel(
        this.data[key].name,
        null,
        scheme,
        values,
        false,
        true,
        true,
        false,
        false,
        false,
        '',
        '',
        '',
        '',
        true
      );
      return chartConfig;
    });
  }

  public onClose() {
    this.close.emit(null);
  }
}
