import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { PatientsDashboardService } from 'src/app/modules/management/services/patients-dashboard/patients-dashboard.service';
import { ChartObjectModel } from '../../../../../core/models/graphs/chart-object.model';
import { ColumnChartModel } from '../../../../../core/models/graphs/column-chart.model';
import { ScriptLoaderService } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent implements OnInit {
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public patients: PatientModel[] = [];
  public selectedItem: number;
  public selectedPatient: PatientModel;
  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;
  public configGantt: any = {
    columns: ['BIOLOGICO', 'FAME', 'ADH', 'OTR'],
    type: 'Timeline',
    data: [],
    options: {
      groupByRowLabel: true,
      avoidOverlappingGridLines: true,
      backgroundColor: '#FFFF',
      hAxis: {
        format: 'YYYY',
        gridlines: {
          count: -1,
        },
      },
      vAxis: {
        scaleType: 'log',
      },
      colors: [
        '#e66584',
        '#5ba6e0',
        '#e4804b',
        '#4375bb',
        '#fbbf53',
        '#57833b',
      ],
    },
  };

  constructor(
    private _patientService: PatientsService,
    private _patientDashboardService: PatientsDashboardService,
    private loaderService: ScriptLoaderService
  ) {}

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
    this._patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
        }
      });

    this._patientDashboardService
      .getPatientsDashboardById(this.selectedPatient.id)
      .subscribe((data) => {
        this.dataChart = this.parseDataChart(data);

        const dataGantt = {
          BIOLOGICO: data.treatments.BIOLOGICO,
          FAME: data.treatments.FAME,
          ADH: data.adherence,
        };

        this.configGantt.data = this.parseDataGantt(dataGantt);
        this.loadChart(this.configGantt);

        const title = '';
        const view = null;
        const scheme = {
          domain: ['#ffc107', '#2196f3'],
        };
        this.configChart = new ColumnChartModel(
          title,
          view,
          scheme,
          this.dataChart
        );
      });
  }

  private loadChart(data: any): void {
    this.loaderService.loadChartPackages(data.type).subscribe(() => {
      google.charts.load('current', { packages: ['timeline'] });
      google.charts.setOnLoadCallback(this.drawChart(data));
    });
  }

  public drawChart(data: any): any {
    const container = document.getElementById('google-timeline-chart');
    const chart = new google.visualization.Timeline(container);
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Title' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'string', role: 'tooltip' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    dataTable.addRows(data.data);

    chart.draw(dataTable, data.options);
  }

  private parseDataChart(data: any): ChartObjectModel[] {
    const arrayData = Object.keys(data.indicesEvolution).map(
      (keyYear: string) => {
        const object = {
          name: keyYear,
          series: [],
        };

        data.indicesEvolution[keyYear].forEach((element) => {
          const objectSerie = {
            value: element.value,
            name: new Date(element.date),
          };
          object.series.push(objectSerie);
        });

        return object;
      }
    );
    return arrayData;
  }

  private parseDataGantt(data: any): ChartObjectModel[] {
    const objectChart = [];

    this.configGantt.columns.forEach((value: string, key: number) => {
      if (data[value] && value !== 'ADH') {
        data[value].forEach((element: any, keyT: number) => {
          let objectRow = [
            value,
            element.medicine.actIngredients,
            element.medicine.actIngredients,
            new Date(element.initDate),
            new Date(),
          ];

          if (element.finalDate) {
            let endDate = new Date(element.finalDate);
            objectRow[objectRow.length - 1] = endDate;
          }
          objectChart.push(objectRow);
        });
      } else if (data[value] && value === 'ADH') {
        data[value].forEach((element: any, keyTwo: number) => {
          const dateStart = new Date(element.date);
          let objectRow = [
            value,
            '',
            element.description,
            dateStart,
            dateStart,
          ];

          objectChart.push(objectRow);
        });
      }
    });
    return objectChart;
  }
}
