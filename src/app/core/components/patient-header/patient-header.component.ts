import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../../modules/pathology/patients/models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { ChartObjectModel } from '../../models/graphs/chart-object.model';
import { ColumnChartModel } from '../../models/graphs/column-chart.model';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss'],
})
export class PatientHeaderComponent implements OnInit {
  public patientKeysToShow: string[] = [
    'name',
    'firstSurname',
    'nhc',
    'healthCard',
    'dni',
    'phone',
    'genderCode',
  ];
  public selectedPatient: PatientModel;

  public dataChart: ChartObjectModel[];
  public configChart: ColumnChartModel;

  constructor(private _patientService: PatientsService) {}

  ngOnInit(): void {
    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
    this._patientService
      .getPatientsById(this.selectedPatient.id)
      .subscribe((data) => {
        if (data) {
          this.selectedPatient = data;
        }
      });
  }
}
