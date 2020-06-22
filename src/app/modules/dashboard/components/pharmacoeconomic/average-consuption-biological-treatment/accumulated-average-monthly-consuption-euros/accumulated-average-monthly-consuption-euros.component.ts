import { Component, OnInit } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { Router } from '@angular/router';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-accumulated-average-monthly-consuption-euros',
  templateUrl: './accumulated-average-monthly-consuption-euros.component.html',
  styleUrls: ['./accumulated-average-monthly-consuption-euros.component.scss'],
})
export class AccumulatedAverageMonthlyConsuptionEurosComponent
  implements OnInit {
  public dataChart: ChartObjectModel[];
  public dataTable: any[];
  public columHeaders: string[] = [
    'months',
    this._translate.instant('jan'),
    this._translate.instant('feb'),
    this._translate.instant('mar'),
    this._translate.instant('apr'),
    this._translate.instant('may'),
    this._translate.instant('jun'),
    this._translate.instant('jul'),
    this._translate.instant('aug'),
    this._translate.instant('sep'),
    this._translate.instant('oct'),
    this._translate.instant('nov'),
    this._translate.instant('dec'),
  ];
  public dataToExport: any[] = [];
  public configChart: ColumnChartModel;
  public formYearlyGoal: FormGroup = new FormGroup({
    yearlyGoalValue: new FormControl(),
  });
  private yearlyGoalValue: number = 2;
  private months = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ];

  constructor(
    private _graphService: GraphsService,
    private _router: Router,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    const query = `lastYears=${this.yearlyGoalValue}`;
    this.getTreatments(query);
  }

  private getTreatments(query: string): void {
    this._graphService.getMonthlyConsuptionEurosAvgAccumulated(query).subscribe(
      (data) => {
        const dataToParse = this.sortByMonth(data);
        this.dataTable = this.parseDataTable(dataToParse);
        this.dataChart = this.parseDataChart(dataToParse);

        const title = 'monthlyAccumulatedAvgConsuptionEuros';
        const view = null;
        const scheme = {
          domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606'],
        };
        this.configChart = new ColumnChartModel(
          title,
          view,
          scheme,
          this.dataChart
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private parseDataChart(data: any): ChartObjectModel[] {
    const arrayData = Object.keys(data.ene).map((keyYear: string) => {
      const object = {
        name: keyYear,
        series: [],
      };

      Object.keys(data).forEach((keyMonth: string) => {
        const objectSerie = {
          value:
            data[keyMonth][keyYear] && data[keyMonth][keyYear] !== '-'
              ? data[keyMonth][keyYear]
              : 0,
          name: keyMonth,
        };
        object.series.push(objectSerie);
      });

      return object;
    });
    return arrayData;
  }

  private parseDataTable(data: any): any[] {
    const arrayData = Object.keys(data.ene).map((key: string) => {
      const object = {
        months: key,
      };
      Object.keys(data).forEach((keyMonth: string) => {
        const monthName = `${keyMonth.charAt(0).toUpperCase()}${keyMonth.slice(
          1
        )}`;
        object[monthName] = data[keyMonth][key];
      });
      return object;
    });
    return arrayData;
  }

  private sortByMonth(arr: any): any {
    const object = {};
    this.months.forEach((month: string) => {
      object[month] = arr[month];
    });

    return object;
  }

  public onFormSubmit(): void {
    const data = [...this.dataChart];
    this.dataChart = null;
    const currentValue = this.formYearlyGoal.controls.yearlyGoalValue.value;

    console.log(data, currentValue);

    const objectToAdd: ChartObjectModel = {
      name: this._translate.instant('yearlyGoalValue'),
      series: [],
    };

    objectToAdd.series = this.months.map((month: string) => {
      const point = {
        name: month,
        value: currentValue,
      };
      return point;
    });

    const lastPosition = data.length - 1;

    if (
      data[lastPosition].name === this._translate.instant('yearlyGoalValue')
    ) {
      data.splice(-1, 1);
      data.push(objectToAdd);
    } else {
      data.push(objectToAdd);
    }

    setTimeout(() => {
      this.dataChart = data;

      const title = 'monthlyConsuptionEurosAvg';
      const view = null;
      const scheme = {
        domain: ['#ffc107', '#2196f3', '#4caf50', '#cc0606', '#9c27b0'],
      };
      this.configChart = new ColumnChartModel(
        title,
        view,
        scheme,
        this.dataChart
      );
    }, 100);
  }
}
