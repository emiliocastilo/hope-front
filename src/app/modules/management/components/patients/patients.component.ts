import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientModel } from '../../models/patients/patient.model';
import { PathologyModel } from '../../models/patients/pathology.model';
import { PatientsService } from '../../services/patients/patients.service';
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
} from '../../constants/patients.constants';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  public columnsHeader: Array<ColumnHeaderModel> = PATIENT_TABLE_HEADERS;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
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
    private _notification: NotificationService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Carga menú lateral
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
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

  public onIconButtonClick(event: any) {
    if (event && event.type === 'edit') {
      this.editPatient();
    } else if (event && event.type === 'delete') {
      this.showModalConfirm();
    }
  }

  public savePatient(): void {
    this.isEditing = false;
    this.selectedItem = null;
    this.modalForm.reset();
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
          this._notification.showSuccessToast('element_deleted');
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar Paciente';
    modalRef.componentInstance.messageModal = `Estas seguro de que quieres eliminar el paciente
      ${this.patients[this.selectedItem].name} ${
      this.patients[this.selectedItem].firstSurname
    }?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deletePatient();
      modalRef.close();
    });
  }

  private showModal() {
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'patientseditor';
    modalRef.componentInstance.title = 'Paciente';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      if (this.modalForm.valid) {
        this.saveOrUpdate(event, modalRef);
      }
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
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    } else {
      this._patientsService.createPatient(patient).subscribe(
        (response) => {
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
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
    const genderValue = patient.genderCode === 'M' ? 'Hombre' : 'Mujer';
    row.pushColumn(new ColumnDataModel('text', genderValue));
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
