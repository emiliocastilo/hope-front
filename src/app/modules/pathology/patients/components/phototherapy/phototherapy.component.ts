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
import { FormsService } from 'src/app/core/services/forms/forms.service';

@Component({
  selector: 'app-phototherapy',
  templateUrl: './phototherapy.component.html',
  styleUrls: ['./phototherapy.component.scss'],
})
export class PhototherapyComponent implements OnInit {
  public columHeaders = [
    'indication',
    'principle',
    'brand',
    'dose',
    'dateStart',
    'dateEnd',
    'type',
  ];
  public actions: TableActionsModel[] = new TableActionsBuilder().getAllActions();
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
    indication: ['', Validators.required],
    specialIndication: ['', Validators.required],
    bigPsychologicalImpact: ['', Validators.required],
    visibleInjury: ['', Validators.required],
    other: ['', Validators.required],
    uvb: ['', Validators.required],
    psoralenoPlusUva: ['', Validators.required],
    waveLongitude: ['', Validators.required],
    timesAWeek: ['', Validators.required],
    datePrescription: ['', Validators.required],
    dateStart: ['', Validators.required],
    expectedEndDate: ['', Validators.required],
    sessionNumbers: ['', Validators.required],
    observations: ['', Validators.required],
  });

  private modalFormUpdate: FormGroup = this._formBuilder.group({
    reasonChangeOrSuspension: ['', Validators.required],
    uvb: ['', Validators.required],
    psoralenoPlusUva: ['', Validators.required],
    waveLongitude: ['', Validators.required],
    timesAWeek: ['', Validators.required],
    dateSuspension: ['', Validators.required],
  });

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
    indication: { type: 'text', class: 'col-12' },
    specialIndication: { type: 'checkbox', class: 'col-2' },
    bigPsychologicalImpact: { type: 'checkbox', class: 'col-2' },
    visibleInjury: { type: 'checkbox', class: 'col-2' },
    other: { type: 'text', class: 'col-6' },
    uvb: { type: 'checkbox', class: 'col-6' },
    psoralenoPlusUva: { type: 'checkbox', class: 'col-6' },
    waveLongitude: { type: 'number', class: 'col-6' },
    timesAWeek: { type: 'number', class: 'col-6' },
    datePrescription: { type: 'date', class: 'col-6' },
    dateStart: { type: 'date', class: 'col-6' },
    expectedEndDate: { type: 'date', class: 'col-6' },
    sessionNumbers: { type: 'number', class: 'col-6' },
    observations: { type: 'textarea', class: 'col-12' },
    dateSuspension: { type: 'date', class: 'col-6' },
    reasonChangeOrSuspension: {
      type: 'select',
      class: 'col-12',
      options: this.changeOrSuspensionOptions,
    },
  };
  indication: string;

  constructor(
    private _nonParmacologicService: NonParmacologicServices,
    private _patientService: PatientsService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _notification: NotificationService,
    private _translate: TranslateService,
    private _formsService: FormsService,
  ) {}

  ngOnInit(): void {
    this.getCurrentPatient();
    this.getFormDatas()
    const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
    this.getData(query);
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
    this.modalForm.reset({
      indication: this.indication,
      specialIndication: false,
      bigPsychologicalImpact: false,
      visibleInjury: false,
      other: '',
      uvb: false,
      psoralenoPlusUva: false,
      waveLongitude: '',
      timesAWeek: '',
      datePrescription: '',
      dateStart: '',
      expectedEndDate: '',
      sessionNumbers: '',
      observations: '',
    });

    const modalRef = this._modalService.open(PhototherapyModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'create';
    modalRef.componentInstance.title = 'btn.new';
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

  public showModalEdit(index: number, type: string): void {
    this.modalForm.reset();
    this.currentUser = this.tableData[index];
    this.fillForm(this.modalFormUpdate, this.currentUser, type);
    const modalRef = this._modalService.open(PhototherapyModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.type = 'update';
    modalRef.componentInstance.title = 'btn.update';
    modalRef.componentInstance.form = this.modalFormUpdate;
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
  }

  private showModalDetail(index: number, type: string): void {
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
  }

  private save(event, modalRef) {
    console.log('save:', event, modalRef);
  }

  private update(event, modalRef) {
    console.log('update:', event, modalRef);
  }

  public onIconButtonClick($event: any) {
    switch ($event.type) {
      case 'delete':
        this.showModalConfirm($event.selectedItem);
        break;
      case 'edit':
        this.showModalEdit($event.selectedItem, $event.type);
        break;
      case 'detail':
        this.showModalDetail($event.selectedItem, $event.type);
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
      this.deleteTreatment(event);
      modalRef.close();
    });
  }

  private deleteTreatment(event: any): void {
    console.log(event);
    const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}`;
    this._nonParmacologicService.delete(query).subscribe(
      (data: any) => {
        this._notification.showSuccessToast('element_deleted');
        const queryGetData = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
        this.getData(queryGetData);
      },
      (error: any) => {
        this._notification.showSuccessToast('element_deleted');
      }
    );
  }

  getFormDatas() {
    this._formsService
      .getFormsDatas(
        `template=principal-diagnosis&patientId=${this.currentUser.id}&name=psoriasisType`
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
}
