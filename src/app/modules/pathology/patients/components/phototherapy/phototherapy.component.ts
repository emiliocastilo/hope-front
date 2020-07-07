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
  private modalOptions = {
    specialIndication: { type: 'checkbox' },
    bigPsychologicalImpact: { type: 'checkbox' },
    visibleInjury: { type: 'checkbox' },
    other: { type: 'text' },
    uvb: { type: 'checkbox' },
    psoralenoPlusUva: { type: 'checkbox' },
    waveLongitude: { type: 'number' },
    timesAWeek: { type: 'number' },
    datePrescription: { type: 'date' },
    dateStart: { type: 'date' },
    expectedEndDate: { type: 'date' },
    sessionNumbers: { type: 'number' },
    observations: { type: 'textarea' },
  };

  constructor(
    private _nonParmacologicService: NonParmacologicServices,
    private _patientService: PatientsService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _notification: NotificationService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getCurrentPatient();
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
    const modalRef = this._modalService.open(PhototherapyModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.id = 'new-treatment';
    modalRef.componentInstance.title = 'btn.new';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.form = this.modalOptions;
    modalRef.componentInstance.close.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event: any) => {
      this.save(event, modalRef);
    });

    modalRef.componentInstance.update.subscribe((event: any) => {
      this.update(event, modalRef);
    });
  }

  public showModalEdit(index: number): void {}

  private showModalDetail(index: number): void {}

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
        this.showModalEdit($event.selectedItem);
        break;
      case 'detail':
        this.showModalDetail($event.selectedItem);
        break;
    }
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
    this.getData(query);
  }

  private getData(query: string): void {
    console.log(query);
    this.tableData = this._nonParmacologicService.getMock(query).content;
    this.paginationData = this._nonParmacologicService.getMock(query);
  }

  public onSearch(search: string) {
    this.currentPage = 0;
    const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}&search=${search}`;
    this.getData(query);
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
}
