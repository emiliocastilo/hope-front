import { Component, OnInit } from '@angular/core';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import { ColumnChartModel } from 'src/app/core/models/graphs/column-chart.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';

@Component({
  selector: 'app-total-expenses',
  templateUrl: './total-expenses.component.html',
  styleUrls: ['./total-expenses.component.scss'],
})
export class TotalExpensesComponent implements OnInit {
  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;
  public currenMedicine: any;
  public medicines: any;
  public form: FormGroup = new FormGroup({
    selectMedicine: new FormControl(),
  });

  constructor(
    private _graphService: GraphsService,
    private _medicinesService: MedicinesServices
  ) {}

  ngOnInit(): void {
    this.getMedicines();
  }

  private getTreatments(): void {
    const query = `code=${this.currenMedicine.codeAct}`;
    this._graphService.getTotalExpenses(query).subscribe(
      (data) => {
        const dataToParse = this.sortByMonth(data);
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

  private getMedicines(): void {
    const query = 'size=1000';
    this._medicinesService.getAll(query).subscribe(
      (data) => {
        this.medicines = data.content;
        this.addNameToMedicine(this.medicines);
        this.currenMedicine = this.medicines[0];
        this.getTreatments();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public onFormSubmit(): void {
    this.dataChart = null;
    this.getTreatments();
  }

  public onSelectMedicine(event: any): void {
    this.dataChart = null;
    this.currenMedicine = event;
    this.getTreatments();
  }

  private addNameToMedicine(array: any[]): void {
    array.forEach((value: any, key: number) => {
      array[key].name = array[key].actIngredients;
    });
  }
}
