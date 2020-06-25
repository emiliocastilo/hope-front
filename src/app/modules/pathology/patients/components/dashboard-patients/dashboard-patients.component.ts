import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { ChartObjectModel } from 'src/app/core/models/graphs/chart-object.model';
import { GanttChart } from 'src/app/core/models/graphs/gantt-chart.model';
import { PatientsDashboardService } from 'src/app/modules/management/services/patients-dashboard/patients-dashboard.service';
import { ColumnChartModel } from '../../../../../core/models/graphs/column-chart.model';
import { GraphsService } from '../../../../dashboard/services/graphs.service';

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
  private columnsGantt = ['BIOLOGICO', 'FAME', 'ADH', 'OTR'];
  public selectedPatient: PatientModel;
  // public patientKeysToShow: string[] = [
  //   'name',
  //   'nhc',
  //   'healthCard',
  //   'dni',
  //   'phone',
  //   'genderCode',
  // ];

  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;

  constructor(
    private _patientService: PatientsService,
    private _patientDashboardService: PatientsDashboardService,
    private _graphService: GraphsService
  ) {}

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
    this._patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
          this.getDashboar(data.id);
        }
      });

    this._patientDashboardService
      .getPatientsDashboardById(this.selectedPatient.id)
      .subscribe((data) => {
        this.dataChart = this.parseDataChart(data);

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

  private getDashboar(id: number): void {
    this._patientService.getDashboar(id).subscribe(
      (data: any) => {
        this.dataChart = this.parseDataChart(data.treatments);

        const groupByRowLabel = true;

        this.configChart = new GanttChart(
          this.dataChart,
          this.columnsGantt,
          groupByRowLabel
        );
      },
      (error: any) => {}
    );
  }

  // private parseDataChart(data: any[]): ChartObjectModel[] {
  //   const objectChart = [];

  //   console.log(data);

  //   this.columnsGantt.forEach((value: string, key: number) => {
  //     if (data[value]) {
  //       data[value].forEach((element: any) => {
  //         let objectRow = [
  //           value,
  //           element.medicine.actIngredients,
  //           new Date(element.initDate),
  //         ];

  //         let endDate = new Date(element.finalDate);

  //         if (!element.finalDate) {
  //           endDate = new Date();
  //         }

  //         objectRow.push(endDate);

  //         objectChart.push(objectRow);
  //       });
  //     }
  //   });
  //   return objectChart;
  // }
}
