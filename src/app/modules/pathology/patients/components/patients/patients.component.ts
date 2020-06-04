import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from '../../services/patients.service';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import {
  PATIENT_DERMA_HEADERS,
  PATIENT_TABLE_KEYS,
} from 'src/app/modules/management/constants/patients.constants';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';

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
  private hospitals: HospitalModel[] = [];
  private currentPage: number = 0;
  public paginationData: PaginationModel;
  public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();

  constructor(
    private _patientsService: PatientsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.columnsHeader = this.PATIENTS_HEADER;

    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.patients = this._activatedRoute.snapshot.data.patients.content;
    this.paginationData = this._activatedRoute.snapshot.data.patients;
  }

  public goToDermatologiPatients(): void {
    this._router.navigate(['management/patients']);
  }

  public onSelectedItem(event: number): void {
    this.selectedPatient = this.patients[event];
    const selectedUser = JSON.stringify(this.selectedPatient || {});
    localStorage.setItem('selectedUser', selectedUser);
    this.selectedItem = event;
    this._router.navigate(['pathology/patients/dashboard']);
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

  public itemsPerPage(number: number) {
    this.refreshData(`&size=${number}`);
  }
}
