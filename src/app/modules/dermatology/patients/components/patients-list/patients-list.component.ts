import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PatientModel } from '../../models/patient.model';
import { PatientModelToRowModelAdapter } from '../../adapters/patient-model-to-row-model.adapter';
import { PatientsService } from '../../services/patients.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { PathologyModel } from '../../models/pathology.model';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  public columnsHeader: Array<string> = [
    'Patient Name',
    'Nhc',
    'Health Card',
    'Dni',
    'Phone',
    'Gender Code',
    'Pathologies',
  ];
  public menu: Array<SideBarItemModel>;
  public patients: Array<PatientModel> = [];
  public patientKeysToShow: string[] = [
    'name',
    'firstSurname',
    'lastSurname',
    'nhc',
    'healthCard',
    'dni',
    'address',
    'phone',
    'email',
    'birthDate',
    'hospital',
    'genderCode',
  ];
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
    hospital: '',
    genderCode: '',
    pathologies: [],
  };
  public menuId: number = environment.MENU_ID.PATIENTS;
  public isEditing: boolean = false;

  modalForm: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    nhc: ['', Validators.required],
    healthCard: ['', Validators.required],
    dni: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    genderCode: ['', Validators.required],
    birthDate: ['', Validators.required],
  });

  constructor(
    private _patientsService: PatientsService,
    private _patientModelToRowModelAdapter: PatientModelToRowModelAdapter,
    private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this._patientsService.getPatients().subscribe((data) => {
      this.patients = data.content;
    });
  }

  public prepareTableData(): Array<RowDataModel> {
    let rows = this.patients
      ? this.patients.map((patient) => {
          return this._patientModelToRowModelAdapter.adaptModelToRow(patient);
        })
      : [];
    return rows;
  }

  public onSelectedItem(event: number): void {
    this.selectedPatient = this.patients[event];
    this.selectedItem = event;
  }

  public onFilter(event: string): void {
    this._patientsService.getPatientsById(event).subscribe((data) => {
      this.patients = Array<PatientModel>();
      this.patients.push(data);
    });
  }

  public savePatient(): void {
    this.showModal();
  }

  public editPatient(): void {
    if (this.selectedItem != undefined && this.selectedItem != null) {
      this.isEditing = true;
      this.modalForm.setValue({
        name: this.patients[this.selectedItem].name,
        firstName: this.patients[this.selectedItem].firstSurname,
        lastName: this.patients[this.selectedItem].lastSurname,
        nhc: this.patients[this.selectedItem].nhc,
        healthCard: this.patients[this.selectedItem].healthCard,
        dni: this.patients[this.selectedItem].dni,
        address: this.patients[this.selectedItem].address,
        phone: this.patients[this.selectedItem].phone,
        email: this.patients[this.selectedItem].email,
        genderCode: this.patients[this.selectedItem].genderCode,
        birthDate: this.patients[this.selectedItem].birthDate,
      });
    }
    this.showModal();
  }

  public deletePatient(): void {
    this._patientsService
      .deletePatient(this.patients[this.selectedItem].id)
      .subscribe((response) => {
        this._toastr.success('El paciente se ha borrado correctamente');
        this.refreshData();
      });
  }

  private showModal() {
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'patientseditor';
    modalRef.componentInstance.title = 'Paciente';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    let formValues: JSON = event.value;
    let id;
    if (this.isEditing) {
      id = this.patients[this.selectedItem].id;
    }
    let pathologies: Array<PathologyModel> = new Array();
    let pathology: PathologyModel = new PathologyModel('1', 'Dermatología', '');
    pathologies.push(pathology);
    let patient: PatientModel = new PatientModel(
      id,
      formValues['name'],
      formValues['firstName'],
      formValues['lastName'],
      formValues['nhc'],
      formValues['healthCard'],
      formValues['dni'],
      formValues['address'],
      formValues['phone'],
      formValues['email'],
      formValues['birthDate'],
      formValues['hospital'],
      formValues['genderCode'],
      pathologies
    );
    if (this.isEditing) {
      this._patientsService.updatePatient(patient).subscribe((response) => {
        this.isEditing = false;
        modalRef.close();
        this.refreshData();
      });
    } else {
      this._patientsService.createPatient(patient).subscribe((response) => {
        this.modalForm.reset();
        modalRef.close();
        this.refreshData();
      });
    }
  }

  private refreshData(): void {
    this.modalForm.reset();
    this._patientsService.getPatients().subscribe((data) => {
      this.patients = data.content;
    });
  }
}
