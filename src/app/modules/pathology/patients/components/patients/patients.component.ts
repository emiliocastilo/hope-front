import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PatientModel } from '../../models/patient.model';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import {
  PATIENT_DERMA_HEADERS,
  PATIENT_TABLE_KEYS,
} from 'src/app/modules/management/constants/patients.constants';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { MenuService } from 'src/app/core/services/menu/menu.service';

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
  public itemsPerPage: number;
  private selectedUser: any;

  constructor(
    private _patientsService: PatientsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.columnsHeader = this.PATIENTS_HEADER;

    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.patients = this._activatedRoute.snapshot.data.patients.content;
    this.paginationData = this._activatedRoute.snapshot.data.patients;
    this.selectedUser = JSON.parse(localStorage.getItem('user'));
  }

  public goToDermatologiPatients(): void {
    this._router.navigate(['management/patients']);
  }

  public onSelectedItem(event: number): void {
    this.selectedPatient = this.patients[event];
    const selectedUser = JSON.stringify(this.selectedPatient || {});
    localStorage.setItem('selectedPatient', selectedUser);
    this.selectedItem = event;
    this._menuService.setCurrentSectionByUrl('pathology/patients/dashboard');
    this._router.navigate(['pathology/patients/dashboard']);
  }

  public onSearch(event: string): void {
    this._patientsService
      .findPatients(this.selectedUser.rolSelected.pathology.id, event)
      .subscribe((data) => {
        this.patients = data.content;
      });
  }

  public selectPage(page: number): void {
    let query = `&page=${page}`;
    this.currentPage = page;
    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }
    this.refreshData(query);
  }

  private refreshData(query: string): void {
    this._patientsService
      .getPatients(this.selectedUser.rolSelected.pathology.id, query)
      .subscribe((data) => {
        this.patients = data.content;
        if (this.paginationData.totalPages !== data.totalPages) {
          this.paginationData = data;
        }
      });
  }

  public onSort(event: any) {
    let query = `&sort=${event.column},${event.direction}&page=${this.currentPage}`;

    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }

    this.refreshData(query);
  }

  public selectItemsPerPage(number: number) {
    this.itemsPerPage = number;
    this.selectPage(0);
  }
}
