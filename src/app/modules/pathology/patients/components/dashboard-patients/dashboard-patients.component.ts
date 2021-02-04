import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { PatientsDashboardService } from 'src/app/modules/management/services/patients-dashboard/patients-dashboard.service';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-dashboard-patients',
    templateUrl: './dashboard-patients.component.html',
    styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent implements OnInit, AfterViewInit {
    public data: any;
    public selectedPatient: PatientModel;
    public noData: boolean;

    constructor(private patientService: PatientsService, private patientDashboardService: PatientsDashboardService, private _menuService: MenuService, private _router: Router) {}
    ngAfterViewInit(): void {}

    ngOnInit(): void {
        this.noData = false;
        this.selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
        if (!this.selectedPatient) {
            this._menuService.setCurrentSectionByUrl('pathology/patients');
            this._router.navigate(['pathology/patients']);
        } else {
            this.patientService.getPatientsById(this.selectedPatient.id).subscribe((data) => {
                if (data) {
                    this.selectedPatient = data;
                }
            });
            this.patientDashboardService.getPatientsDashboardById(this.selectedPatient.id).subscribe((data) => {
                if (data) {
                    this.data = data;
                }
            });
        }
    }
}
