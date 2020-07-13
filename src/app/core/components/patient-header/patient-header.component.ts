import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../../modules/pathology/patients/models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { PatientsDashboardService } from 'src/app/modules/management/services/patients-dashboard/patients-dashboard.service';
import { ChartObjectModel } from '../../models/graphs/chart-object.model';
import { ColumnChartModel } from '../../models/graphs/column-chart.model';
import { GraphsService } from 'src/app/modules/dashboard/services/graphs.service';
import FormUtils from 'src/app/core/utils/FormUtils';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
})
export class PatientHeaderComponent implements OnInit {
  public patientKeysToShow: string[] = [
    'name',
    'nhc',
    'healthCard',
    'dni',
    'age',
    'phone',
    'genderCode',
  ];
  public selectedPatient: PatientModel;

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
          this.selectedPatient.age = FormUtils.ageBybirthdate([
            this.selectedPatient.birthDate,
          ]).toString();
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
}
