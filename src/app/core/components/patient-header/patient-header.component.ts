import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../../modules/pathology/patients/models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
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
    public patientKeysToShow: string[] = ['name', 'firstSurname', 'nhc', 'healthCard', 'dni', 'age', 'phone', 'genderCode'];
    public selectedPatient: PatientModel;

    public dataChart: ChartObjectModel[];
    public configChart: ColumnChartModel;

    constructor(private _patientService: PatientsService) {}

    ngOnInit(): void {
        this.selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
        this._patientService.getPatientsById(this.selectedPatient.id).subscribe((data) => {
            if (data) {
                this.selectedPatient = data;
                this.selectedPatient.age = FormUtils.ageBybirthdate([this.selectedPatient.birthDate]).toString();
            }
        });
    }
}
