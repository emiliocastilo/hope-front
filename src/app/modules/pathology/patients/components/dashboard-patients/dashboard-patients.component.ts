import { Component, OnInit } from '@angular/core';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PatientModel } from '../../models/patient.model';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-patients',
  templateUrl: './dashboard-patients.component.html',
  styleUrls: ['./dashboard-patients.component.scss'],
})
export class DashboardPatientsComponent implements OnInit {
  public columnsHeader: Array<ColumnHeaderModel> = [
    new ColumnHeaderModel('Patient Name', 2),
    new ColumnHeaderModel('Nhc', 2),
    new ColumnHeaderModel('Health Card', 2),
    new ColumnHeaderModel('Dni', 1),
    new ColumnHeaderModel('Phone', 2),
    new ColumnHeaderModel('Gender Code', 1),
    new ColumnHeaderModel('Pathologies', 1),
    new ColumnHeaderModel('Actions', 1),
  ];
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public patients: PatientModel[] = [];
  public patientKeysToShow: string[] = ['fullName', 'age', 'genderCode'];
  public selectedItem: number;
  public selectedPatient: PatientModel = {
    id: '',
    name: '',
    firstSurname: '',
    lastSurname: '',
    nhc: '',
    healthCard: '',
    dni: '',
    address: '',
    phone: '',
    email: '',
    birthDate: '',
    hospital: null,
    genderCode: '',
    pathologies: [],
  };
  public isEditing: boolean = false;
  public modalForm: FormGroup;
  private hospitals: HospitalModel[] = [];
  private currentPage: number = 0;
  public paginationData: PaginationModel;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Carga menú lateral
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/dermatology/patients')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/dermatology/patients/dashboard')
    );
    // fin carga menú lateral

    this.patients = this._activatedRoute.snapshot.data.patients.content;

    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
  }
}
