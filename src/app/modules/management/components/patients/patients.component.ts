import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientModel } from '../../models/patients/patient.model';
import { PathologyModel } from '../../models/patients/pathology.model';
import { PatientsService } from '../../services/patients/patients.service';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { PATIENT_TABLE_KEYS } from '../../constants/patients.constants';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public patients: PatientModel[] = [];
  public patientKeysToShow: string[] = PATIENT_TABLE_KEYS;
  public selectedItem: number;
  public selectedPatient: PatientModel = new PatientModel();
  public isEditing = false;
  public modalForm: FormGroup;
  private hospitals: HospitalModel[] = [];
  private currentPage = 0;
  public paginationData: PaginationModel;
  public actions: TableActionsModel[] = new TableActionsBuilder().getEditAndDelete();

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
      lastSurname: [''],
      nhc: ['', Validators.required],
      healthCard: ['', Validators.required],
      dni: ['', Validators.required],
      address: [''],
      phone: [''],
      email: [
        '',
        [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')],
      ],
      genderCode: [''],
      birthDate: ['', Validators.required],
    });
  }

  public onSelectedItem(event: number): void {
    this.selectedPatient = this.patients[event];
    const selectedUser = JSON.stringify(this.selectedPatient || {});
    localStorage.setItem('selectedUser', selectedUser);
    this.selectedItem = event;
    Object.keys(this.patients[event]).forEach((patientKey: string) => {
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

  public onSort(event: any) {
    this.refreshData(`&sort=${event.column},${event.direction}`);
  }

  public itemsPerPage(number: number) {
    this.refreshData(`&size=${number}`);
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
    modalRef.componentInstance.messageModal =
      '¿Estás seguro de borrar este paciente?';
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
    const birthDate = new Date(formValues.birthDate).toISOString();
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
      birthDate,
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
}
