import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
@Component({
  selector: 'app-many-chart-modal',
  templateUrl: './many-chart-modal.component.html',
  styleUrls: ['./many-chart-modal.component.scss'],
})
export class ManyChartModalComponent implements OnInit {
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() data: any[];
  private paginationData: PaginationModel = {
    number: 0,
    size: 5,
    totalElements: 0,
  };

  public dataParsed: any[] = [];
  public columnsHeader: string[] = ['date', 'value'];

  constructor() {}

  ngOnInit(): void {
    this.data.forEach((element: any) => {
      const object = {
        chartConfig: this.parseDataChart(element),
        tableConfig: this.parseDataToTable(element),
        show: true,
      };

      this.dataParsed.push(object);
    });
  }

  public onClose() {
    this.close.emit(null);
  }

  private parseDataChart(data: any): ColumnChartModel {
    console.log(data);
    const values: ChartObjectModel[] = [
      {
        name: data.name,
        series: [],
      },
    ];

    data.value.forEach((valueTwo: any, keyTwo: number) => {
      const object: ChartObjectModel = {
        value: valueTwo.value,
        name: valueTwo.date,
      };
      values[0].series.push(object);
    });

    const scheme = {
      domain: ['#ffc107', '#2196f3'],
    };

    const chartConfig = new ColumnChartModel(
      data.name.toUpperCase(),
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
  }

  public selectedPage(page: number) {
    console.log('selectedPage', page);
  }

  private parseDataToTable(data: any): PaginationModel {
    const tableData = data.value.map((value: any) => {
      return {
        name: data.name,
        date: value.date,
      };
    });

    const tableConfig: any = {
      series: tableData,
      paginationData: {
        number: 0,
        size: 5,
        totalElements: data.value.length,
      },
    };

    return tableConfig;
  }
}
