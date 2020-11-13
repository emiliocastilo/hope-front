import { Component, OnInit } from '@angular/core';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { PatientModel } from '../../models/patient.model';
import { NonParmacologicServices } from 'src/app/core/services/non-pharmacologic/non-pharmacologic.service';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PrincipalTreatmentModalComponent } from 'src/app/core/components/modals/principal-treatment-modal/principal-treatment-modal.component';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
} from 'rxjs/operators';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { constants } from '../../../../../../constants/constants';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal-treatment',
  templateUrl: './principal-treatment.component.html',
  styleUrls: ['./principal-treatment.component.scss'],
})
export class PrincipalTreatmentComponent implements OnInit {
  key = constants.farmacologiesTreatments;
  public columHeaders = [
    'indication',
    'principle',
    'brand',
    'dose',
    'dateStart',
    'datePrescription',
    'dateSuspension',
    'type',
  ];
  public actions: TableActionsModel[] = [
    new TableActionsModel('changeSuspend', 'edit-3'),
    new TableActionsModel('edit', 'edit-2'),
    new TableActionsModel('delete', 'trash'),
  ];
  public tableData: any[] = [];
  public tableDataFilter: any[] = [];
  private modalForm: FormGroup = this._formBuilder.group({
    indication: ['', Validators.required],
    specialIndication: [false],
    bigPsychologicalImpact: [false],
    visibleInjury: [false],
    others: [''],
    medicine: ['', Validators.required],
    family: ['', Validators.required],
    atc: ['', Validators.required],
    cn: ['', Validators.required],
    tract: ['', Validators.required],
    dose: ['', Validators.required],
    otherDosis: [''],
    regimenTreatment: ['', Validators.required],
    datePrescription: ['', Validators.required],
    dateStart: ['', Validators.required],
    expectedEndDate: [''],
    observations: [''],
    treatmentContinue: [false],
    treatmentPulsatil: [false],
  });
  private modalFormUpdate: FormGroup = this._formBuilder.group({
    reasonChangeOrSuspension: ['', Validators.required],
    medicine: ['', Validators.required],
    family: ['', Validators.required],
    atc: ['', Validators.required],
    cn: ['', Validators.required],
    tract: ['', Validators.required],
    dose: ['', Validators.required],
    otherDosis: [''],
    regimenTreatment: ['', Validators.required],
    dateSuspension: ['', Validators.required],
  });

  public patient: PatientModel;
  private indication = '';
  private currentPage = 0;
  private colOrder: any;
  private typeOrder: any;
  private itemsPerPage: number;
  public paginationData: PaginationModel;
  private sizeTable = 5;

  formatter = (state) => state.name;

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) =>
        this._medicinesService.getByText(`search=${term}`).pipe(
          map((response: any) => {
            return response.content;
          }),
          tap((data) => {
            data.forEach((element) => {
              element.name = element.description;
            });
          }),
          catchError(() => {
            return of([]);
          })
        )
      )
    );
  };

  private modalOptions = {
    indication: { type: 'text', class: 'col-12' },
    specialIndication: { type: 'checkbox', class: 'col-2' },
    bigPsychologicalImpact: { type: 'checkbox', class: 'col-2' },
    visibleInjury: { type: 'checkbox', class: 'col-2' },
    others: { type: 'text', class: 'col-6' },
    medicine: {
      type: 'typeahead',
      class: 'col-12',
      typeahead: this.search,
      inputFormatter: this.formatter,
      resultFormatter: this.formatter,
    },
    family: { type: 'text', class: 'col-6' },
    atc: { type: 'text', class: 'col-6' },
    cn: { type: 'text', class: 'col-6' },
    tract: {
      type: 'text',
      class: 'col-6',
    },
    dose: {
      type: 'select',
      class: 'col-6',
      options: [],
    },
    otherDosis: { type: 'text', class: 'col-6' },
    regimenTreatment: {
      type: 'select',
      class: 'col-6',
      options: [
        {
          name: this._translate.instant('intensificada'),
        },
        {
          name: this._translate.instant('standard'),
        },
        {
          name: this._translate.instant('reduced'),
        },
      ],
      changes: true,
    },
    datePrescription: { type: 'date', class: 'col-6' },
    dateStart: { type: 'date', class: 'col-6' },
    expectedEndDate: { type: 'date', class: 'col-6' },
    observations: { type: 'textarea', class: 'col-12' },
    treatmentContinue: { type: 'checkbox', class: 'col-2' },
    treatmentPulsatil: { type: 'checkbox', class: 'col-2' },
    reasonChangeOrSuspension: {
      type: 'select',
      class: 'col-12',
      options: [
        {
          id: 0,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive1'),
        },
        {
          id: 1,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive2'),
        },
        {
          id: 2,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive3'),
        },
        {
          id: 3,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive4'),
        },
        {
          id: 4,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive5'),
        },
        {
          id: 5,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive6'),
        },
        {
          id: 6,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive7'),
        },
        {
          id: 7,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive8'),
        },
        {
          id: 8,
          name: this._translate.instant('reasonChangeOrSuspensionList.motive9'),
        },
        {
          id: 9,
          name: this._translate.instant(
            'reasonChangeOrSuspensionList.motive10'
          ),
        },
      ],
    },
    dateSuspension: { type: 'date', class: 'col-6' },
  };

  constructor(
    private _nonParmacologicService: NonParmacologicServices,
    private _patientService: PatientsService,
    private _formsService: FormsService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _notification: NotificationService,
    private _translate: TranslateService,
    private _medicinesService: MedicinesServices
  ) {}

  ngOnInit(): void {
    this.patient = JSON.parse(localStorage.getItem('selectedUser'));
    this.paginationData = {
      number: 0,
      totalPages: 0,
      size: 0,
      totalElements: 0
    }
    this.typeOrder = '';
    this.colOrder = '';
    // const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
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
      this.paginationData = {
        number: this.currentPage,
        totalPages: (this.tableData.length / this.sizeTable),
        size: this.sizeTable,
        totalElements: this.tableData.length
      }
      this.addColorRow(this.tableData);
      this.tableDataFilter = this.tableData.map((x) => x);
      this.tableDataFilter = this.tableDataFilter.splice((this.paginationData.number * this.paginationData.size), this.paginationData.size);
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

  public showModalCreate(): void {
    this.modalForm.reset({
      indication: this.indication,
      specialIndication: false,
      bigPsychologicalImpact: false,
      visibleInjury: false,
      others: '',
      medicine: '',
      family: '',
      atc: '',
      cn: '',
      tract: '',
      dose: '',
      otherDosis: '',
      regimenTreatment: '',
      datePrescription: '',
      dateStart: '',
      expectedEndDate: '',
      observations: '',
      treatmentContinue: false,
      treatmentPulsatil: false,
    });
    const modalRef = this._modalService.open(PrincipalTreatmentModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'create';
    modalRef.componentInstance.title = 'newTreatment';
    modalRef.componentInstance.form = this.modalForm;
    this.modalOptions.dose.options = [];
    modalRef.componentInstance.options = this.modalOptions;
    modalRef.componentInstance.selectInputTypeahead.subscribe((event: any) => {
      modalRef.componentInstance.options.dose.options = [];
      modalRef.componentInstance.form.controls.family.setValue(event.family);
      modalRef.componentInstance.form.controls.atc.setValue(event.codeAct);
      modalRef.componentInstance.form.controls.cn.setValue(event.nationalCode);
      modalRef.componentInstance.form.controls.tract.setValue(
        event.viaAdministration
      );
      this._medicinesService
        .getDosesByMedicine(`medicineId=${event.id}`)
        .then((data: any) => {
          data.forEach((element) => {
            element.name = element.description;
          });
          data.push({ name: 'Otra' });
          modalRef.componentInstance.options.dose.options = data;
        })
        .catch(({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        });
    });

    modalRef.componentInstance.selectDose.subscribe((event: any) => {
      if (event.name === 'Otra') {
        this.modalForm.controls.otherDosis.setValidators(Validators.required);
        // this.modalForm.controls.regimenTreatment.setValue('');
      } else {
        this.modalForm.controls.otherDosis.clearValidators();
        this.modalForm.controls.regimenTreatment.setValue({
          name: event.recommendation,
        });
      }
    });

    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.save.subscribe((event: any) => {
      event.value.dose = event.value.dose[0];
      if (Array.isArray(event.value.regimenTreatment)) {
        event.value.regimenTreatment = event.value.regimenTreatment[0];
      }
      event.value.reasonChangeOrSuspension = null;
      event.value.dateSuspension = null;
      event.value.principle = event.value.medicine.actIngredients;
      event.value.brand = event.value.medicine.brand;
      event.value.type = event.value.medicine.family;

      Object.keys(event.value).forEach((key: string) => {
        if (key.toLowerCase().includes('date') && event.value[key]) {
          event.value[key] = new Date(event.value[key]).toISOString();
        }
      });

      if (!this.tableData) {
        this.tableData = [];
      }
      // si añadimos un elemento, aumentamos el total
      if ((this.tableData.length % this.paginationData.size) === 0){
        this.paginationData.totalElements++;
      }
      this.tableData.push(event.value);
      this.save(modalRef, 'create');
      this.refreshTable();
    });
  }

  public async showModalChange(index: number, type: string) {
    const dataEdit = { ...this.tableData[index] };

    Object.keys(dataEdit).forEach((key: string) => {
      if (key.toLowerCase().includes('date') && dataEdit[key]) {
        dataEdit[key] = moment(dataEdit[key]).format('YYYY-MM-DD');
      }
    });

    await this._medicinesService
      .getDosesByMedicine(`medicineId=${dataEdit.medicine.id}`)
      .then((data: any) => {
        data.forEach((element) => {
          element.name = element.description;
        });
        data.push({ name: 'Otra' });
        this.modalOptions.dose.options = data;
      })
      .catch(({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      });

    this.fillForm(this.modalFormUpdate, dataEdit, type);
    const modalRef = this._modalService.open(PrincipalTreatmentModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'changeSuspend';
    modalRef.componentInstance.title = 'changeSuspendTreatment';
    modalRef.componentInstance.form = this.modalFormUpdate;
    modalRef.componentInstance.options = this.modalOptions;
    modalRef.componentInstance.selectDose.subscribe((event: any) => {
      if (event.name === 'Otra') {
        this.modalFormUpdate.controls.otherDosis.setValidators(
          Validators.required
        );
        // this.modalFormUpdate.controls.regimenTreatment.setValue('');
      } else {
        this.modalFormUpdate.controls.otherDosis.clearValidators();
        this.modalFormUpdate.controls.regimenTreatment.setValue({
          name: event.recommendation,
        });
      }
    });
    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      if (Array.isArray(event.value.dose)) {
        event.value.dose = event.value.dose[0];
      }

      if (Array.isArray(event.value.regimenTreatment)) {
        event.value.regimenTreatment = event.value.regimenTreatment[0];
      }

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
      this.refreshTable();
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

    await this._medicinesService
      .getDosesByMedicine(`medicineId=${dataEdit.medicine.id}`)
      .then((data: any) => {
        data.forEach((element) => {
          element.name = element.description;
        });
        data.push({ name: 'Otra' });
        this.modalOptions.dose.options = data;
      })
      .catch(({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      });

    this.fillForm(this.modalForm, dataEdit, type);
    const modalRef = this._modalService.open(PrincipalTreatmentModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'edit';
    modalRef.componentInstance.title = 'editTreatment';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = this.modalOptions;
    modalRef.componentInstance.selectInputTypeahead.subscribe((event: any) => {
      modalRef.componentInstance.options.dose.options = [];
      modalRef.componentInstance.form.controls.family.setValue(event.family);
      modalRef.componentInstance.form.controls.atc.setValue(event.codeAct);
      modalRef.componentInstance.form.controls.cn.setValue(event.nationalCode);
      modalRef.componentInstance.form.controls.tract.setValue(
        event.viaAdministration
      );
      this._medicinesService
        .getDosesByMedicine(`medicineId=${event.id}`)
        .then((data: any) => {
          data.forEach((element) => {
            element.name = element.description;
          });
          data.push({ name: 'Otra' });
          modalRef.componentInstance.options.dose.options = data;
        })
        .catch(({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        });
    });
    modalRef.componentInstance.selectDose.subscribe((event: any) => {
      if (event.name === 'Otra') {
        this.modalForm.controls.otherDosis.setValidators(Validators.required);
        // this.modalForm.controls.regimenTreatment.setValue('');
      } else {
        this.modalForm.controls.otherDosis.clearValidators();
        this.modalForm.controls.regimenTreatment.setValue({
          name: event.recommendation,
        });
      }
    });

    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      if (Array.isArray(event.value.dose)) {
        event.value.dose = event.value.dose[0];
      }
      if (Array.isArray(event.value.regimenTreatment)) {
        event.value.regimenTreatment = event.value.regimenTreatment[0];
      }

      event.value.principle = event.value.medicine.actIngredients;
      event.value.brand = event.value.medicine.brand;
      event.value.type = event.value.medicine.family;

      Object.keys(event.value).forEach((key: string) => {
        if (key.toLowerCase().includes('date') && event.value[key]) {
          event.value[key] = new Date(event.value[key]).toISOString();
        }
      });

      Object.keys(event.value).forEach((key: string) => {
        this.tableData[index][key] = event.value[key];
      });

      this.refreshTable();
      this.save(modalRef, 'edit');
    });
  }

  private showModalConfirm(index: number, type: string) {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = this._translate.instant('btn.delete');
    modalRef.componentInstance.messageModal = this._translate.instant(
      'areYouSureDelete'
    );
    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event: any) => {
      // si solo tenemos un elemento en esta página, y lo borramos, restamos el elemento para eliminar esa página
      if ((this.tableData.length % this.paginationData.size) === 1){
        this.paginationData.totalElements--;
      }
      this.tableData.splice(index, 1);
      this.refreshTable();
      this.save(modalRef, 'delete');
    });
  }

  public onIconButtonClick($event: any) {
    var posIndex = (this.currentPage * this.paginationData.size) + $event.selectedItem;
    switch ($event.type) {
      case 'changeSuspend':
        this.showModalChange(posIndex, $event.type);
        break;
      case 'edit':
        this.showModalEdit(posIndex, $event.type);
        break;
      case 'delete':
        this.showModalConfirm(posIndex, $event.type);
        break;
    }
  }

  private fillForm(form: FormGroup, values: any, type: string) {
    let formKeys: string[] = Object.keys(form.controls);

    formKeys.forEach((key: string) => {
      form.controls[key].setValue(values[key]);
      // if (values[key] && form.get(key) && type === 'detail') {
      //   form.controls[key].disable();
      // }
    });
    if (type === "changeSuspend" && !form.controls["dateSuspension"].value){
      var currentDate = new Date();
      var month = (currentDate.getMonth()+1).toString();
      var day = (currentDate.getDate()).toString();
      month = month.length > 1 ? month : ('0' + month);
      day= day.length > 1 ? day : '0' + day;
      form.controls["dateSuspension"].setValue(currentDate.getFullYear() +"-"+ month +"-"+ day);
    }
  }

  private save(modalRef, type) {
    console.log(this.tableData);

    const form = {
      template: this.key,
      data: [
        {
          type: 'table',
          name: 'principal-treatment',
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

  public sortTableDefault(){
    this.tableData.sort(function(a, b) {
      if (a.dateSuspension === null && b.dateSuspension === null) {
        return a.dateStart < b.dateStart ? 1 : -1;
      } else if (a.dateSuspension != null && b.dateSuspension != null){
        return a.dateSuspension < b.dateSuspension ? 1 : -1;
      } else {
        if (a.dateSuspension === null){
          return -1;
        } else {
          return 1;
        }
      }
   });
  }

  public onSort(event: any){
    this.typeOrder = event.direction;
    this.colOrder = event.column;
    this.refreshTable();
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    this.refreshTable();
  }

  public selectItemsPerPage(number: number) {
    this.itemsPerPage = number;
    this.paginationData.size = number;
    this.selectPage(0);
  }

  public refreshTable(){
    if (this.typeOrder === ''){
      this.sortTableDefault();
    } else {
      var typeOrder = this.typeOrder;
      var colOrder = this.colOrder;
      this.tableData.sort(function(a, b) {
        if (typeOrder === 'asc') {
          return a[colOrder] < b[colOrder] ? 1 : -1;
        } else if (typeOrder === 'desc') {
          return a[colOrder] < b[colOrder] ? -1 : 1;
        }
      });
    }
    this.tableDataFilter = this.tableData.map((x) => x);
    this.tableDataFilter = this.tableDataFilter.splice((this.currentPage * this.paginationData.size), this.paginationData.size);
  }

  private addColorRow(tableData) {
    tableData.forEach(element => {
      element.rowColor = false;
      if (element.dateSuspension) {
        var currentDate = new Date();
        var month = (currentDate.getMonth()+1).toString();
        var day = (currentDate.getDate()).toString();
        month = month.length > 1 ? month : ('0' + month);
        day= day.length > 1 ? day : '0' + day;
        var currentDateString = currentDate.getFullYear() +"-"+ month +"-"+ day;
        if (currentDateString >= element.dateSuspension.substr(0,10)){
          element.rowColor = true;
        }
      }
    });
  }
}
