import { Component, OnInit } from '@angular/core';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { PatientModel } from '../../../../models/patient.model';
import { NonParmacologicServices } from 'src/app/core/services/non-pharmacologic/non-pharmacologic.service';
import { PatientsService } from 'src/app/modules/management/services/patients/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhototherapyModalComponent } from 'src/app/core/components/modals/phototherapy-modal/phototherapy-modal.component';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { constants } from '../../../../../../../constants/constants';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { IndicationService } from 'src/app/modules/management/services/indications/indication.service';

@Component({
    selector: 'app-phototherapy',
    templateUrl: './phototherapy.component.html',
    styleUrls: ['./phototherapy.component.scss'],
})
export class PhototherapyComponent implements OnInit {
    key = constants.NofarmacologiesTreatments;
    public columHeaders = ['indication', 'uvb', 'psoralenoPlusUva', 'timesAWeek', 'dateStart', 'expectedEndDate', 'dateSuspension', 'sessionNumbers'];
    public actions: TableActionsModel[] = [new TableActionsModel('edit', 'edit-3'), new TableActionsModel('detail', 'edit-2'), new TableActionsModel('delete', 'trash')];
    //public actions: TableActionsModel[] = new TableActionsBuilder().getAllActions();
    /*public paginationData: PaginationModel = {
    number: 0,
    size: 5,
    totalElements: 0,
  };
  private currentPage: number = 0;*/
    private currentIndication: string;

    private currentUser: PatientModel = JSON.parse(localStorage.getItem('selectedPatient' || '{}'));
    private currentTreatment: string = 'phototherapy';
    public tableData: any[] = [];
    public tableDataFilter: any[] = [];
    private modalForm: FormGroup = this._formBuilder.group({
        indication: ['', Validators.required],
        specialIndication: [false],
        bigPsychologicalImpact: [false],
        visibleInjury: [false],
        other: [''],
        uvb: [false],
        psoralenoPlusUva: [false],
        waveLongitude: ['', Validators.required],
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
        dateSuspension: [],
    });

    public patient: PatientModel;
    private indication = '';
    private currentPage = 0;
    private colOrder: any;
    private typeOrder: any;
    private itemsPerPage: number;
    public paginationData: PaginationModel;
    private sizeTable = 5;

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
        private _indicationService: IndicationService,
        private _translate: TranslateService,
        private _formsService: FormsService
    ) {}

    ngOnInit(): void {
        //this.getCurrentPatient();
        //const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
        //this.getData(query);

        this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
        this.paginationData = {
            number: 0,
            totalPages: 0,
            size: 0,
            totalElements: 0,
        };
        this.typeOrder = '';
        this.colOrder = '';
        this.getFormDatas();
        this.getForm();
    }

    async getForm() {
        const retrievedForm: any = await this._formsService.retrieveForm(this.key, this.patient.id);

        if (retrievedForm && retrievedForm.data.length > 0) {
            this.tableData = retrievedForm.data[0].value;
            this.paginationData = {
                number: this.currentPage,
                totalPages: this.tableData.length / this.sizeTable,
                size: this.sizeTable,
                totalElements: this.tableData.length,
            };
            this.currentPage = 1;
            this.addColorRow(this.tableData);
            this.tableDataFilter = this.tableData.map((x) => x);
            this.tableDataFilter = this.tableDataFilter.splice(this.paginationData.number * this.paginationData.size, this.paginationData.size);
        }
    }

    getFormDatas() {
        this._formsService.getFormsDatas(`template=principal-diagnosis&patientId=${this.patient.id}&name=principalIndication`).subscribe(
            (data: string) => {
                this.indication = data;

                if (!this._indicationService.indications || this._indicationService.indications.length === 0) {
                    this._indicationService.getList().subscribe((response) => {
                        this.indication = this._translate.instant(response.filter((f) => f.code === data)[0].description);
                        this.currentIndication = response.filter((f) => f.code === data)[0].code;
                    });
                } else {
                    this.indication = this._translate.instant(this._indicationService.indications.filter((f) => f.code === data)[0].description);
                    this.currentIndication = this._indicationService.indications.filter((f) => f.code === data)[0].code;
                }
            },
            ({ error }) => {
                // this._notification.showErrorToast(error.errorCode);
            }
        );
    }

    private getCurrentPatient(): void {
        this._patientService.getPatientsById(this.currentUser.id).subscribe((data) => {
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
        modalRef.componentInstance.title = 'newTreatment';
        modalRef.componentInstance.form = this.modalForm;
        modalRef.componentInstance.options = this.modalOptions;

        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });

        modalRef.componentInstance.save.subscribe((event: any) => {
            event.value.reasonChangeOrSuspension = null;
            event.value.dateSuspension = null;
            event.value.indication = this.currentIndication;

            Object.keys(event.value).forEach((key: string) => {
                if (key.toLowerCase().includes('date') && event.value[key]) {
                    event.value[key] = new Date(event.value[key]).toISOString();
                }
            });

            if (!this.tableData) {
                this.tableData = [];
            }
            // TO DO: cuando se vaya a refactorizar las opciones del treatmentType hay que cambiarlo tambien en la modal
            /* event.value['treatmentType'] = {
        id: 'phototherapy',
        name: 'fototerapia',
      }; */
            event.value['treatmentType'] = 'fototerapia';
            this.tableData.push(event.value);
            //this.sortTable();
            this.refreshTable();
            this.paginationData.totalElements = this.tableData.length;
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
        if (type === 'changeSuspend' && !form.controls['dateSuspension'].value) {
            var currentDate = new Date();
            var month = (currentDate.getMonth() + 1).toString();
            var day = currentDate.getDate().toString();
            month = month.length > 1 ? month : '0' + month;
            day = day.length > 1 ? day : '0' + day;
            form.controls['dateSuspension'].setValue(currentDate.getFullYear() + '-' + month + '-' + day);
        }
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
        this.modalFormUpdate.controls.reasonChangeOrSuspension.setValue({
            name: this.modalFormUpdate.value.reasonChangeOrSuspension && this.modalFormUpdate.value.reasonChangeOrSuspension.name ? this.modalFormUpdate.value.reasonChangeOrSuspension.name : this.modalFormUpdate.value.reasonChangeOrSuspension,
        });

        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });

        modalRef.componentInstance.update.subscribe((event: any) => {
            if (Array.isArray(event.value.reasonChangeOrSuspension)) {
                event.value.reasonChangeOrSuspension = event.value.reasonChangeOrSuspension[0].name;
            } else if (event.value.reasonChangeOrSuspension.name) {
                event.value.reasonChangeOrSuspension = event.value.reasonChangeOrSuspension.name;
            }

            Object.keys(event.value).forEach((key: string) => {
                if (key.toLowerCase().includes('date') && event.value[key]) {
                    event.value[key] = new Date(event.value[key]).toISOString();
                }
            });

            Object.keys(event.value).forEach((key: string) => {
                this.tableData[index][key] = event.value[key];
            });
            //this.sortTable();
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
            //this.sortTable();
            this.refreshTable();
            this.save(modalRef, 'edit');
        });
    }

    private save(modalRef, type) {
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
            job: true,
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
                if (this.tableDataFilter.length === 0) this.ngOnInit();
                else this.refreshTable();
                modalRef.close();
            },
            ({ error }) => {
                this._notification.showErrorToast(error.errorCode);
            }
        );
    }

    public onIconButtonClick($event: any) {
        var posIndex = this.currentPage * this.paginationData.size + $event.selectedItem;
        switch ($event.type) {
            case 'delete':
                this.showModalConfirm(posIndex, $event.type);
                break;
            case 'edit':
                this.showModalChange(posIndex, $event.type);
                break;
            case 'detail':
                this.showModalEdit(posIndex, $event.type);
                break;
        }
    }

    /*public selectPage(page: number): void {
    this.currentPage = page;
    const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
    this.getData(query);
  }*/

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

    private showModalConfirm(index: number, type: string) {
        const modalRef = this._modalService.open(ConfirmModalComponent);

        modalRef.componentInstance.title = this._translate.instant('btn.delete');
        modalRef.componentInstance.messageModal = this._translate.instant('areYouSureDelete');
        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });
        modalRef.componentInstance.accept.subscribe((event: any) => {
            this.tableData.splice(index, 1);
            this.refreshTable();
            this.paginationData.totalElements = this.tableData.length;
            this.save(modalRef, 'delete');
        });
    }

    public sortTableDefault() {
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

    public refreshTable() {
        if (this.typeOrder === '') {
            this.sortTableDefault();
        } else {
            var typeOrder = this.typeOrder;
            var colOrder = this.colOrder;
            this.tableData.sort(function (a, b) {
                if (typeOrder === 'asc' && typeof a[colOrder] === 'boolean' && typeof b[colOrder] === 'boolean') {
                    return a[colOrder] < b[colOrder] ? 1 : -1;
                } else if (typeOrder === 'desc' && typeof a[colOrder] === 'boolean' && typeof b[colOrder] === 'boolean') {
                    return a[colOrder] < b[colOrder] ? -1 : 1;
                } else if (typeOrder === 'asc' && !isNaN(a[colOrder]) && !isNaN(b[colOrder])) {
                    return parseInt(a[colOrder]) < parseInt(b[colOrder]) ? 1 : -1;
                } else if (typeOrder === 'desc' && !isNaN(a[colOrder]) && !isNaN(b[colOrder])) {
                    return parseInt(a[colOrder]) < parseInt(b[colOrder]) ? -1 : 1;
                } else if (typeOrder === 'asc') {
                    return a[colOrder] < b[colOrder] ? 1 : -1;
                } else if (typeOrder === 'desc') {
                    return a[colOrder] < b[colOrder] ? -1 : 1;
                }
            });
        }
        this.addColorRow(this.tableData);
        this.tableDataFilter = this.tableData.map((x) => x);
        this.tableDataFilter = this.tableDataFilter.splice(this.currentPage * this.paginationData.size, this.paginationData.size);
    }

    private addColorRow(tableData: any) {
        tableData.forEach((element) => {
            element.rowColor = false;
            if (element.dateSuspension) {
                var currentDate = new Date();
                var month = (currentDate.getMonth() + 1).toString();
                var day = currentDate.getDate().toString();
                month = month.length > 1 ? month : '0' + month;
                day = day.length > 1 ? day : '0' + day;
                var currentDateString = currentDate.getFullYear() + '-' + month + '-' + day;
                if (currentDateString >= element.dateSuspension.substr(0, 10)) {
                    element.rowColor = true;
                }
            }
        });
    }
}