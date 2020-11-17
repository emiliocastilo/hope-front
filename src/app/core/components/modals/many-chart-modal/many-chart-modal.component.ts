import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TranslateService } from '@ngx-translate/core';

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
    size: 3,
    totalElements: 0,
  };

  public masterSelected = true;
  public dataParsed: any[] = [];
  public columnsHeader: string[] = ['date', 'value'];

  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    this.data.forEach((element: any) => {
      const object = {
        chartConfig: this.parseDataChart(element),
        tableConfig: this.parseDataToTable(element, 0),
        show: true,
      };

      this.dataParsed.push(object);
    });
  }

  public onClose() {
    this.close.emit(null);
  }

  private parseDataChart(data: any): ColumnChartModel {
    const values: ChartObjectModel[] = [
      {
        name: data.name,
        series: [],
      },
    ];

    data.values.forEach((valueTwo: any, keyTwo: number) => {
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
      this._translate.instant(data.name),
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

  public selectedPage(pageNumber: number, table: any) {
    const pages = this.paginate(table.all, this.paginationData.size);
    table.series = pages[pageNumber];
  }

  private parseDataToTable(data: any, currentPage: number): PaginationModel {
    const tableData = data.values.map((value: any) => {
      return {
        value: value.value,
        date: value.date,
      };
    });

    const paginatedTable = this.paginate(tableData, this.paginationData.size);

    const tableConfig: any = {
      series: paginatedTable[currentPage],
      paginationData: {
        number: 0,
        size: this.paginationData.size,
        totalElements: data.values.length,
      },
      all: tableData,
    };

    return tableConfig;
  }

  private paginate(arr: any[], size: number) {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  }

  public checkUncheckAll() {
    for (var i = 0; i < this.dataParsed.length; i++) {
      this.dataParsed[i].show = this.masterSelected;
    }
  }
}
