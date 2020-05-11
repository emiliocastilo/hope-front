import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientModel } from '../../../models/patients/patient.model';
import { PathologyModel } from '../../../models/patients/pathology.model';
import { PatientsService } from '../../../services/patients/patients.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';
import {
  PATIENT_TABLE_HEADERS,
  PATIENT_TABLE_KEYS,
  PATIENT_FORM,
} from '../../../constants/patients.constants';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  public columnsHeader: Array<ColumnHeaderModel> = PATIENT_TABLE_HEADERS;
  public menu: SideBarItemModel[] = [];
  public patients: PatientModel[] = [];
  public patientKeysToShow: string[] = PATIENT_TABLE_KEYS;
  public selectedItem: number;
  public selectedPatient: PatientModel = new PatientModel();
  public menuId: number = environment.MENU_ID.PATIENTS;
  public isEditing: boolean = false;
  public modalForm: FormGroup;
  private hospitals: HospitalModel[] = [];
  private currentPage: number = 0;
  public paginationData: PaginationModel;

  constructor(
    private _patientsService: PatientsService,
    private _toastr: ToastrService,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Carga menú lateral
    const rootMenu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    )[0].children;
    this.menu = rootMenu.filter((item) =>
      item.url.endsWith('/management/patients')
    );
    // fin carga menú lateral

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

  public prepareTableData(): Array<RowDataModel> {
    const rows = this.patients
      ? this.patients.map((patient) => {
          return this._adaptModelToRow(patient);
        })
      : [];
    return rows;
  }

  public goToDermatologiPatients(): void {
    this._router.navigate(['dermatology/patients']);
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

  public onSelectItemDobleClick(event: number): void {
    this.selectedPatient = this.patients[event];
    const selectedUser = JSON.stringify(this.selectedPatient || {});
    localStorage.setItem('selectedUser', selectedUser);
    this.goToDermatologiPatients();
  }

  public onSearch(event: string): void {
    this._patientsService.getPatientsById(event).subscribe((data) => {
      this.patients = data.content;
    });
  }

  public onIconButtonClick(event: any) {
    if (event && event.type === 'edit') {
      this.editPatient();
    } else if (event && event.type === 'delete') {
      this.deletePatient();
    }
  }

  public savePatient(): void {
    /*this.formConfig.map((valueFrom: any, keyform: number) => {
      this.formConfig[keyform].value = null;
    });*/
    this.isEditing = false;
    this.selectedItem = null;
    this.showModal();
  }

  public editPatient(): void {
    this.isEditing = true;
    this.showModal();
  }

  public deletePatient(): void {
    this._patientsService
      .deletePatient(this.patients[this.selectedItem].id)
      .subscribe(
        (response) => {
          this._toastr.success('El paciente se ha borrado correctamente');
          this.refreshData(`&page=${this.currentPage}`);
        },
        (error) => {
          this._toastr.success(error.error.error);
        }
      );
  }

  private showModal() {
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'patientseditor';
    modalRef.componentInstance.title = 'Paciente';
    //   debugger
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    const formValues: PatientModel = event.value;
    let id;
    if (this.isEditing) {
      id = this.patients[this.selectedItem].id;
    }
    const pathologies: Array<PathologyModel> = new Array();
    const pathology: PathologyModel = new PathologyModel(
      '1',
      'Dermatología',
      ''
    );
    pathologies.push(pathology);
    const hospital = formValues.hospital
      ? formValues.hospital[0]
        ? formValues.hospital[0]
        : formValues.hospital
      : formValues.hospital;
    const patient: PatientModel = new PatientModel(
      id,
      formValues.name,
      formValues.firstSurname,
      formValues.lastSurname,
      formValues.nhc,
      formValues.healthCard,
      formValues.dni,
      formValues.address,
      formValues.phone,
      formValues.email,
      formValues.birthDate,
      hospital,
      formValues.genderCode,
      pathologies
    );
    this.selectedPatient = new PatientModel();
    if (this.isEditing) {
      this._patientsService.updatePatient(patient).subscribe(
        (response) => {
          this.isEditing = false;
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        (error) => {
          this._toastr.error(error.error.error);
        }
      );
    } else {
      this._patientsService.createPatient(patient).subscribe(
        (response) => {
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        (error) => {
          this._toastr.error(error.error.error);
        }
      );
    }
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

  private _adaptModelToRow(patient: PatientModel): RowDataModel {
    const row = new RowDataModel();
    row.pushColumn(
      new ColumnDataModel(
        'text',
        patient.name
          .concat(' ')
          .concat(patient.firstSurname)
          .concat(' ')
          .concat(patient.lastSurname)
      )
    );
    row.pushColumn(new ColumnDataModel('text', patient.nhc));
    row.pushColumn(new ColumnDataModel('text', patient.healthCard));
    row.pushColumn(new ColumnDataModel('text', patient.dni));
    row.pushColumn(new ColumnDataModel('text', patient.phone));
    row.pushColumn(new ColumnDataModel('text', patient.genderCode));
    let pathologyList = '';
    patient.pathologies.forEach((pathology) => {
      pathologyList = pathologyList.concat(pathology.name).concat(';');
    });
    row.pushColumn(
      new ColumnDataModel('iconButtons', {
        iconButtons: [
          {
            type: 'edit',
            icon: 'fa-lg fa-pencil',
          },
          {
            type: 'delete',
            icon: 'fa-lg fa-window-close cfa-red',
          },
        ],
      })
    );
    return row;
  }
}
