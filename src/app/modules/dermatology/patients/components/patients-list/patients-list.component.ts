import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PathologyModel } from '../../models/pathology.model';
import { PatientModel } from '../../models/patient.model';
import { PatientsService } from '../../services/patients.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { debounceTime } from 'rxjs/operators';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
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
  public menu: SideBarItemModel[];
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
  public menuId: number = environment.MENU_ID.PATIENTS;
  public isEditing: boolean = false;
  public formConfig: FieldConfig[] = [];
  private hospitals: HospitalModel[] = [];
  private currentPage: number = 0;
  public paginationData: PaginationModel;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.patients = this._activatedRoute.snapshot.data.patients.content;

    this.selectedPatient = JSON.parse(localStorage.getItem('selectedUser'));
    this.formConfig = [
      {
        type: 'input',
        label: 'modal.editor.field.name',
        name: 'name',
        placeholder: 'modal.editor.field.name',
        validation: [Validators.required, Validators.minLength(2)],
      },
      {
        type: 'input',
        label: 'modal.editor.field.firstSurname',
        name: 'firstSurname',
        placeholder: 'modal.editor.field.firstSurname',
        validation: [Validators.required, Validators.minLength(1)],
      },
      {
        type: 'input',
        label: 'modal.editor.field.lastSurname',
        name: 'lastSurname',
        placeholder: 'modal.editor.field.lastSurname',
        validation: [Validators.required, Validators.minLength(3)],
      },
      {
        type: 'input',
        label: 'modal.editor.field.nhc',
        name: 'nhc',
        placeholder: 'modal.editor.field.nhc',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'modal.editor.field.healthCard',
        name: 'healthCard',
        placeholder: 'modal.editor.field.healthCard',
        validation: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(6),
        ],
      },
      {
        type: 'input',
        label: 'modal.editor.field.dni',
        name: 'dni',
        placeholder: 'modal.editor.field.dni',
        validation: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(6),
        ],
      },
      {
        type: 'input',
        label: 'modal.editor.field.address',
        name: 'address',
        placeholder: 'modal.editor.field.address',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'modal.editor.field.phone',
        name: 'phone',
        placeholder: 'modal.editor.field.phone',
        validation: [Validators.required],
        inputType: 'number',
      },
      {
        type: 'input',
        label: 'modal.editor.field.email',
        name: 'email',
        placeholder: 'modal.editor.field.email',
        validation: [Validators.required],
      },
      {
        type: 'datepicker',
        label: 'modal.editor.field.birthDate',
        name: 'birthDate',
        placeholder: 'modal.editor.field.birthDate',
        validation: [Validators.required],
      },
      {
        type: 'select',
        label: 'modal.editor.field.hospital',
        name: 'hospital',
        placeholder: 'modal.editor.field.hospital',
        options: this.hospitals,
        validation: [Validators.required],
      },
      {
        type: 'radio',
        label: 'modal.editor.field.genderCode',
        name: 'genderCode',
        placeholder: 'modal.editor.field.genderCode',
        radioButton: [
          {
            optionName: 'Femenino',
            value: 'F',
          },
          {
            optionName: 'Masculino',
            value: 'M',
          },
        ],
        validation: [Validators.required],
      },
      {
        label: 'btn.save',
        name: 'btn.save',
        type: 'button',
        disabled: false,
      },
    ];
  }

  public prepareTableData(): Array<RowDataModel> {
    let rows = this.patients
      ? this.patients.map((patient) => {
          return this._adaptModelToRow(patient);
        })
      : [];
    return rows;
  }

  public onSelectedItem(event: number): void {
    this.selectedPatient = this.patients[event];
    this.selectedItem = event;
    Object.keys(this.selectedPatient).map((patientKey: string) => {
      this.formConfig.map((valueFrom: any, keyform: number) => {
        if (valueFrom.name === patientKey) {
          this.formConfig[keyform].value = this.selectedPatient[patientKey];
        }
      });
    });
  }

  public onSearch(event: string): void {
    this._patientsService.getPatientsById(event).subscribe((data) => {
      this.patients = data.content;
    });
  }

  public savePatient(): void {
    this.formConfig.map((valueFrom: any, keyform: number) => {
      this.formConfig[keyform].value = null;
    });
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
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'patientseditor';
    modalRef.componentInstance.title = 'Paciente';
    modalRef.componentInstance.formConfig = this.formConfig;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    let formValues: PatientModel = event;
    let id;
    if (this.isEditing) {
      id = this.patients[this.selectedItem].id;
    }
    let pathologies: Array<PathologyModel> = new Array();
    let pathology: PathologyModel = new PathologyModel('1', 'Dermatología', '');
    pathologies.push(pathology);
    const hospital = formValues['hospital']
      ? formValues['hospital'][0]
        ? formValues['hospital'][0]
        : formValues['hospital']
      : formValues['hospital'];
    let patient: PatientModel = new PatientModel(
      id,
      formValues['name'],
      formValues['firstSurname'],
      formValues['lastSurname'],
      formValues['nhc'],
      formValues['healthCard'],
      formValues['dni'],
      formValues['address'],
      formValues['phone'],
      formValues['email'],
      formValues['birthDate'],
      hospital,
      formValues['genderCode'],
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
    const query: string = `&page=${page}`;
    this.refreshData(query);
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
      patient.name
        .concat(' ')
        .concat(patient.firstSurname)
        .concat(' ')
        .concat(patient.lastSurname)
    );
    row.pushColumn(patient.nhc);
    row.pushColumn(patient.healthCard);
    row.pushColumn(patient.dni);
    row.pushColumn(patient.phone);
    row.pushColumn(patient.genderCode);
    let pathologyList = '';
    patient.pathologies.forEach((pathology) => {
      pathologyList = pathologyList.concat(pathology.name).concat(';');
    });
    row.pushColumn(pathologyList);
    return row;
  }
}
