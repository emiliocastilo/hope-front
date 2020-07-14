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
    'dateEnd',
    'type',
  ];
  public actions: TableActionsModel[] = [
    new TableActionsModel('change', 'edit-3'),
    new TableActionsModel('edit', 'edit-2'),
    new TableActionsModel('delete', 'trash'),
  ];
  // public paginationData: PaginationModel = {
  //   number: 0,
  //   size: 5,
  //   totalElements: 0,
  // };
  // private currentPage: number = 0;
  // private currentUser: PatientModel = JSON.parse(
  //   localStorage.getItem('selectedUser' || '{}')
  // );
  // private currentTreatment: string = 'phototherapy';
  public tableData: any[];
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
  private changeOrSuspensionOptionsModalChange = [
    {
      id: 0,
      name: 'Ineficacia',
    },
    {
      id: 1,
      name: 'Fallo primario (no se alcanzó nunca PASI 75)',
    },
    {
      id: 1,
      name: 'Fallo secundario (perdida de PASI 75)',
    },
    {
      id: 1,
      name: 'Blanqueamiento',
    },
    {
      id: 1,
      name: 'Incumplimiento',
    },
    {
      id: 1,
      name: 'Abandono',
    },
    {
      id: 1,
      name: 'Efectos adversos',
    },
    {
      id: 1,
      name: 'Preferencia del paciente',
    },
    {
      id: 1,
      name: 'Embarazo',
    },
    {
      id: 1,
      name: 'Otros',
    },
  ];

  public model;
  public patient: PatientModel;
  private indication = '';

  formatter = (state) => state.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
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
              console.log(element);
            });
          }),
          catchError(() => {
            return of([]);
          })
        )
      )
    );

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
          name: 'Intensificada',
        },
        {
          name: 'Estandar',
        },
        {
          name: 'Reducida',
        },
      ],
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
      options: this.changeOrSuspensionOptionsModalChange,
    },
    dateSuspension: { type: 'text', class: 'col-6' },
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
    // const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
    this.getData();
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
          this._notification.showErrorToast(error.errorCode);
        }
      );
  }

  public showModalCreate(): void {
    this.modalForm.reset({
      indication: this.indication,
      specialIndication: false,
      bigPsychologicalImpact: false,
      visibleInjury: false,
      others: 'dsfsdfdf',
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
    modalRef.componentInstance.title = 'btn.new';
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
        .subscribe(
          (data: any) => {
            data.forEach((element) => {
              element.name = element.description;
            });
            data.push({ name: 'Otra' });
            modalRef.componentInstance.options.dose.options = data;
          },
          ({ error }) => {
            this._notification.showErrorToast(error.errorCode);
          }
        );
    });

    modalRef.componentInstance.selectDose.subscribe((event: any) => {
      if (event.name === 'Otra') {
        this.modalForm.controls.otherDosis.setValidators(Validators.required);
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
      event.value.reasonChangeOrSuspension = '';
      event.value.dateSuspension = '';
      event.value.principle = event.value.medicine.actIngredients;
      event.value.brand = event.value.medicine.presentation;
      event.value.type = event.value.medicine.family;
      this.tableData.push(event.value);
      this.save(modalRef, 'create');
    });
  }

  public showModalChange(index: number, type: string): void {
    this.modalForm.reset();
    const dataEdit = this.tableData[index];
    this.fillForm(this.modalFormUpdate, dataEdit, type);
    const modalRef = this._modalService.open(PrincipalTreatmentModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'update';
    modalRef.componentInstance.title = 'btn.update';
    modalRef.componentInstance.form = this.modalFormUpdate;
    modalRef.componentInstance.options = this.modalOptions;
    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      this.tableData[index] = event.value;
      this.save(modalRef, 'edit');
    });
  }

  public showModalEdit(index: number, type: string): void {
    this.modalForm.reset();
    const dataEdit = this.tableData[index];
    this.fillForm(this.modalForm, dataEdit, type);
    const modalRef = this._modalService.open(PrincipalTreatmentModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'update';
    modalRef.componentInstance.title = 'btn.update';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = this.modalOptions;
    modalRef.componentInstance.cancel.subscribe((event: any) => {
      modalRef.close();
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      this.tableData[index] = event.value;
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
      this.tableData.splice(index, 1);
      this.save(modalRef, 'delete');
    });
  }

  public onIconButtonClick($event: any) {
    switch ($event.type) {
      case 'change':
        this.showModalChange($event.selectedItem, $event.type);
        break;
      case 'edit':
        this.showModalEdit($event.selectedItem, $event.type);
        break;
      case 'delete':
        this.showModalConfirm($event.selectedItem, $event.type);
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
  }

  // public selectPage(page: number): void {
  //   this.currentPage = page;
  //   const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
  //   this.getData(query);
  // }

  // public onSearch(search: string) {
  //   this.currentPage = 0;
  //   const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
  //   const serach = search ? `${query}&search=${search}` : query;
  //   this.getData(serach);
  // }

  private save(modalRef, type) {
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
          this._notification.showSuccessToast('element_created');
        } else if (type === 'edit') {
          this._notification.showSuccessToast('element_edited');
        } else if (type === 'delete') {
          this._notification.showSuccessToast('element_deleted');
        }

        modalRef.close();
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  private getData(): void {
    const response = this._nonParmacologicService.getMock('');
    if (response && response.data.length > 0) {
      this.tableData = response.data[0].value;
    }
    // this.tableData = this._nonParmacologicService.getMock(query).content;
    // this.paginationData = this._nonParmacologicService.getMock(query);
  }
}
