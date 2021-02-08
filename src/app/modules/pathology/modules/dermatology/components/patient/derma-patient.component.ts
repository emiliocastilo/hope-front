import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from 'src/app/modules/management/models/patients/patient.model';

@Component({
    selector: 'app-derma-patient',
    templateUrl: './derma-patient.component.html',
    styleUrls: ['./derma-patient.component.scss']
})
export class DermaPatientComponent implements OnInit {
    public patients: PatientModel[] = [];

    constructor(private _activatedRoute: ActivatedRoute) { }

    ngOnInit (): void {
        this.patients = this._activatedRoute.snapshot.data.patients.content;
        console.log(this.patients);
    }
}
