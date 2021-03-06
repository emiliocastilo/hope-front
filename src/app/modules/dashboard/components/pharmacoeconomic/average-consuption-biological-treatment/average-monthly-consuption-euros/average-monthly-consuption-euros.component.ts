import { Component, OnInit } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { Router } from '@angular/router';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-average-monthly-consuption-euros',
  templateUrl: './average-monthly-consuption-euros.component.html',
  styleUrls: ['./average-monthly-consuption-euros.component.scss'],
})
export class AverageMonthlyConsuptionEurosComponent implements OnInit {
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
    this._graphService.getMonthlyConsuptionEurosAvg(query).subscribe(
      (data) => {
        const dataToParse = this.sortByMonth(data);
        this.dataTable = this.parseDataTable(dataToParse);
        this.dataChart = this.parseDataChart(dataToParse);

        const title = 'monthlyConsuptionEurosAvg';
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
    var months = [
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
    const object = {};
    months.forEach((month: string) => {
      object[month] = arr[month];
    });

    return object;
  }

  public onFormSubmit(): void {
    this.dataChart = null;
    this.yearlyGoalValue = this.formYearlyGoal.controls.yearlyGoalValue.value;
    const query = `lastYears=${this.yearlyGoalValue}`;
    this.getTreatments(query);
  }
}
