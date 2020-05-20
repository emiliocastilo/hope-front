import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from '../../services/patients.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import {
  PATIENT_DERMA_HEADERS,
  PATIENT_TABLE_KEYS,
} from 'src/app/modules/management/constants/patients.constants';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  public PATIENTS_HEADER = PATIENT_DERMA_HEADERS;

  public columnsHeader: Array<ColumnHeaderModel>;
  public patients: PatientModel[] = [];
  public patientKeysToShow: string[] = PATIENT_TABLE_KEYS;
  public selectedItem: number;
  public selectedPatient: PatientModel = new PatientModel();
  public isEditing: boolean = false;
  public modalForm: FormGroup;
  private hospitals: HospitalModel[] = [];
  private currentPage: number = 0;
  public paginationData: PaginationModel;

  constructor(
    private _patientsService: PatientsService,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.columnsHeader = this.PATIENTS_HEADER;

    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.patients = this._activatedRoute.snapshot.data.patients.content;
    this.paginationData = this._activatedRoute.snapshot.data.patients;

    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      firstSurname: ['', Validators.required],
      lastSurname: ['', Validators.required],
      nhc: ['', Validators.required],
      healthCard: ['', Validators.required],
      dni: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      genderCode: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  public goToDermatologiPatients(): void {
    this._router.navigate(['dermatology/patients/dashboard']);
  }

  public onSelectedItem(event: number): void {
    this.selectedPatient = this.patients[event];
    const selectedUser = JSON.stringify(this.selectedPatient || {});
    localStorage.setItem('selectedUser', selectedUser);
    this.selectedItem = event;
    Object.keys(this.patients[event]).map((patientKey: string) => {
      if (this.modalForm.controls[patientKey]) {
        this.modalForm.controls[patientKey].setValue(
          this.patients[event][patientKey]
        );
      }
    });
  }

  public onSearch(event: string): void {
    this._patientsService.getPatientsById(event).subscribe((data) => {
      this.patients = data.content;
    });
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    this.refreshData(`&page=${page}`);
  }

  private refreshData(query: string): void {
    this._patientsService.getPatients(query).subscribe((data) => {
      this.patients = data.content;
      if (this.paginationData.totalElements !== data.totalElements) {
        this.paginationData = data;
      }
    });
  }

  public onSort(event: any) {
    this.refreshData(`&sort=${event.column},${event.direction}`);
  }
}
