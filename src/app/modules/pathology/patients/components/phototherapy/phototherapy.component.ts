import { Component, OnInit } from '@angular/core';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { PatientModel } from '../../models/patient.model';
import { NonParmacologicServices } from 'src/app/core/services/non-pharmacologic/non-pharmacologic.service';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhototherapyModalComponent } from 'src/app/core/components/modals/phototherapy-modal/phototherapy-modal.component';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { constants } from '../../../../../../constants/constants';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import moment from 'moment';

@Component({
  selector: 'app-phototherapy',
  templateUrl: './phototherapy.component.html',
  styleUrls: ['./phototherapy.component.scss'],
})
export class PhototherapyComponent implements OnInit {
  key = constants.NofarmacologiesTreatments;
  public columHeaders = [
    'indication',
    'uvb',
    'psoralenoPlusUva',
    'timesAWeek',
    'dateStart',
    'dateEnd',
    'dateSuspension',
    'sessionNumbers',
  ];
  public actions: TableActionsModel[] = [
    new TableActionsModel('edit', 'edit-3'),
    new TableActionsModel('detail', 'edit-2'),
    new TableActionsModel('delete', 'trash'),
  ];
  //public actions: TableActionsModel[] = new TableActionsBuilder().getAllActions();
  public paginationData: PaginationModel = {
    number: 0,
    size: 5,
    totalElements: 0,
  };
  private currentPage: number = 0;
  private currentUser: PatientModel = JSON.parse(
    localStorage.getItem('selectedUser' || '{}')
  );
  private currentTreatment: string = 'phototherapy';
  public tableData: any[];
  private modalForm: FormGroup = this._formBuilder.group({
    specialIndication: [false],
    bigPsychologicalImpact: [false],
    visibleInjury: [false],
    other: [''],
    uvb: [false],
    psoralenoPlusUva: [false],
    waveLongitude: [''],
    sessionNumbers: ['', Validators.required],
    timesAWeek: ['', Validators.required],
    datePrescription: ['', Validators.required],
    dateStart: ['', Validators.required],
    expectedEndDate: [''],
    observations: [''],
  });

  private modalFormUpdate: FormGroup = this._formBuilder.group({
    reasonChangeOrSuspension: ['', Validators.required],
    uvb: [false],
    psoralenoPlusUva: [false],
    waveLongitude: ['', Validators.required],
    timesAWeek: ['', Validators.required],
    dateSuspension: ['', Validators.required],
  });

  public patient: PatientModel;
  private indication = '';

  private changeOrSuspensionOptions = [
    {
      id: 0,
      name: 'Cambio',
    },
    {
      id: 1,
      name: 'Suspensión',
    },
  ];

  private modalOptions = {
    specialIndication: { type: 'checkbox', class: 'col-2' },
    bigPsychologicalImpact: { type: 'checkbox', class: 'col-2' },
    visibleInjury: { type: 'checkbox', class: 'col-2' },
    other: { type: 'text', class: 'col-6' },
    uvb: { type: 'checkbox', class: 'col-2' },
    psoralenoPlusUva: { type: 'checkbox', class: 'col-2 margin_uvb' },
    waveLongitude: { type: 'number', class: 'col-6' },
    sessionNumbers: { type: 'number', class: 'col-6' },
    timesAWeek: { type: 'number', class: 'col-6' },
    datePrescription: { type: 'date', class: 'col-6' },
    dateStart: { type: 'date', class: 'col-6' },
    expectedEndDate: { type: 'date', class: 'col-6' },
    observations: { type: 'textarea', class: 'col-12' },
    dateSuspension: { type: 'date', class: 'col-6' },
    reasonChangeOrSuspension: {
      type: 'select',
      class: 'col-12',
      options: this.changeOrSuspensionOptions,
    },
  };

  constructor(
    private _nonParmacologicService: NonParmacologicServices,
    private _patientService: PatientsService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _notification: NotificationService,
    private _translate: TranslateService,
    private _formsService: FormsService
  ) {}

  ngOnInit(): void {
    //this.getCurrentPatient();
    //const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
    //this.getData(query);

    this.patient = JSON.parse(localStorage.getItem('selectedUser'));
    this.getFormDatas();
    this.getForm();
  }

  async getForm() {
    const retrievedForm: any = await this._formsService.retrieveForm(
      this.key,
      this.patient.id
    );

    if (retrievedForm && retrievedForm.data.length > 0) {
      this.tableData = retrievedForm.data[0].value;
    }
  }

  getFormDatas() {
    this._formsService
      .getFormsDatas(
        `template=principal-diagnosis&patientId=${this.patient.id}&name=psoriasisType`
      )
      .subscribe(
        (data: string) => {
          this.indication = data;
        },
        ({ error }) => {
          // this._notification.showErrorToast(error.errorCode);
        }
      );
  }

  private getCurrentPatient(): void {
    this._patientService
      .getPatientsById(this.currentUser.id)
      .subscribe((data) => {
        if (data) {
          this.currentUser = data;
        }
      });
  }

  public showModalCreate(): void {
    this.modalForm.reset();
    const modalRef = this._modalService.open(PhototherapyModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'create';
    modalRef.componentInstance.title = 'newTreatment';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = this.modalOptions;

    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.save.subscribe((event: any) => {
      event.value.reasonChangeOrSuspension = null;
      event.value.dateSuspension = null;

      Object.keys(event.value).forEach((key: string) => {
        if (key.toLowerCase().includes('date') && event.value[key]) {
          event.value[key] = new Date(event.value[key]).toISOString();
        }
      });

      if (!this.tableData) {
        this.tableData = [];
      }
      this.tableData.push(event.value);
      this.sortTable();
      this.save(modalRef, 'create');
    });
  }

  private fillForm(form: FormGroup, values: any, type: string) {
    let formKeys: string[] = Object.keys(form.controls);

    formKeys.forEach((key: string) => {
      form.controls[key].setValue(values[key]);
      if (values[key] && form.get(key) && type === 'details') {
        form.controls[key].disable();
      }
    });
  }

  public async showModalChange(index: number, type: string) {
    const dataEdit = { ...this.tableData[index] };

    Object.keys(dataEdit).forEach((key: string) => {
      if (key.toLowerCase().includes('date') && dataEdit[key]) {
        dataEdit[key] = moment(dataEdit[key]).format('YYYY-MM-DD');
      }
    });

    this.fillForm(this.modalFormUpdate, dataEdit, type);
    const modalRef = this._modalService.open(PhototherapyModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'changeSuspend';
    modalRef.componentInstance.title = 'changeSuspendTreatment';
    modalRef.componentInstance.form = this.modalFormUpdate;
    modalRef.componentInstance.options = this.modalOptions;

    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      if (Array.isArray(event.value.reasonChangeOrSuspension)) {
        event.value.reasonChangeOrSuspension =
          event.value.reasonChangeOrSuspension[0];
      }

      Object.keys(event.value).forEach((key: string) => {
        if (key.toLowerCase().includes('date') && event.value[key]) {
          event.value[key] = new Date(event.value[key]).toISOString();
        }
      });

      Object.keys(event.value).forEach((key: string) => {
        this.tableData[index][key] = event.value[key];
      });
      this.sortTable();
      this.save(modalRef, 'edit');
    });
  }

  public async showModalEdit(index: number, type: string) {
    const dataEdit = { ...this.tableData[index] };

    Object.keys(dataEdit).forEach((key: string) => {
      if (key.toLowerCase().includes('date') && dataEdit[key]) {
        dataEdit[key] = moment(dataEdit[key]).format('YYYY-MM-DD');
      }
    });

    this.fillForm(this.modalForm, dataEdit, type);
    const modalRef = this._modalService.open(PhototherapyModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'edit';
    modalRef.componentInstance.title = 'editTreatment';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = this.modalOptions;

    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      Object.keys(event.value).forEach((key: string) => {
        if (key.toLowerCase().includes('date') && event.value[key]) {
          event.value[key] = new Date(event.value[key]).toISOString();
        }
      });

      Object.keys(event.value).forEach((key: string) => {
        this.tableData[index][key] = event.value[key];
      });
      this.sortTable();
      this.save(modalRef, 'edit');
    });
  }

  /*private showModalDetail(index: number, type: string): void {
    console.log("Entra en detalle")
    this.modalForm.reset();
    this.currentUser = this.tableData[index];
    this.fillForm(this.modalForm, this.currentUser, type);
    const modalRef = this._modalService.open(PhototherapyModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.type = 'details';
    modalRef.componentInstance.title = 'detail';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = this.modalOptions;
    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event: any) => {
      this.save(event, modalRef);
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      this.update(event, modalRef);
    });
  }*/

  private save(modalRef, type) {
    console.log(this.tableData);

    const form = {
      template: this.key,
      data: [
        {
          type: 'table',
          name: 'phototherapy',
          value: this.tableData,
        },
      ],
      patientId: this.patient.id,
    };

    this._formsService.fillForm(form).subscribe(
      () => {
        if (type === 'create') {
          this._notification.showSuccessToast('elementCreated');
        } else if (type === 'edit') {
          this._notification.showSuccessToast('elementUpdated');
        } else if (type === 'delete') {
          this._notification.showSuccessToast('elementDeleted');
        }

        modalRef.close();
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  public onIconButtonClick($event: any) {
    switch ($event.type) {
      case 'delete':
        this.showModalConfirm($event.selectedItem);
        break;
      case 'edit':
        this.showModalChange($event.selectedItem, $event.type);
        break;
      case 'detail':
        this.showModalEdit($event.selectedItem, $event.type);
        break;
    }
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
    this.getData(query);
  }

  private getData(query: string): void {
    this.tableData = this._nonParmacologicService.getMock(query).content;
    this.paginationData = this._nonParmacologicService.getMock(query);
  }

  public onSearch(search: string) {
    this.currentPage = 0;
    const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
    const serach = search ? `${query}&search=${search}` : query;
    this.getData(serach);
  }

  private showModalConfirm(index: number) {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = this._translate.instant('btn.delete');
    modalRef.componentInstance.messageModal = this._translate.instant(
      'areYouSureDelete'
    );
    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event: any) => {
      this.tableData.splice(index, 1);
      this.save(modalRef, 'delete');
    });
  }

  public sortTable() {
    this.tableData.sort(function (a, b) {
      if (a.dateSuspension === null && b.dateSuspension === null) {
        return a.dateStart < b.dateStart ? 1 : -1;
      } else if (a.dateSuspension != null && b.dateSuspension != null) {
        return a.dateSuspension < b.dateSuspension ? 1 : -1;
      } else {
        if (a.dateSuspension === null) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }

  public onSort(event: any) {
    if (event.direction === '') {
      this.sortTable();
    } else {
      this.tableData.sort(function (a, b) {
        if (event.direction === 'asc') {
          return a[event.column] < b[event.column] ? 1 : -1;
        } else if (event.direction === 'desc') {
          return a[event.column] < b[event.column] ? -1 : 1;
        }
      });
    }
  }
}
