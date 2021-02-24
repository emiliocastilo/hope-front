import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { JSONTemplateModel } from 'src/app/modules/pathology/models/JSON-template.model';
import { PatientModel } from 'src/app/modules/pathology/models/patient.model';
import { VIHTreatmentModel } from '../../models/vih-treatment.model';
// import { VIHTreatmentService } from '../../services/vih-treatment.service';
// import { VIHTreatmentService } from 'src/app/modules/pathology/modules/vih/services/vih-treatment.service';
import { VIHTreatmentModalComponent } from './vih-treatment-modal/vih-treatment-modal.component';

@Component({
    selector: 'app-vih-treatments',
    templateUrl: './vih-treatments.component.html',
    styleUrls: ['./vih-treatments.component.scss'],
})
export class VIHTreatmentsComponent implements OnInit {
    private settedTreatmentType = { id: 'QUIMICO', name: 'chemical' };
    public treatments: Array<VIHTreatmentModel> = [];
    public showedTreatments: Array<VIHTreatmentModel> = [];
    public columHeaders = ['indication', 'principle', 'brand', 'dose', 'dateStart', 'datePrescription', 'dateSuspension'];
    public actions: TableActionsModel[] = [new TableActionsModel('changeSuspend', 'edit-3'), new TableActionsModel('edit', 'edit-2'), new TableActionsModel('delete', 'trash')];

    private modalForm: FormGroup = this._formBuilder.group({
        indication: ['', Validators.required],
        treatmentType: [this.settedTreatmentType, Validators.required],
        opcionMedicamento: ['opcionMedicamento'],
        medicine: ['', Validators.required],
        family: ['', Validators.required],
        atc: ['', Validators.required],
        cn: ['', Validators.required],
        tract: ['', Validators.required],
        dose: ['', Validators.required],
        otherDosis: [''],
        pattern: ['', Validators.required],
        datePrescription: ['', Validators.required],
        dateStart: ['', Validators.required],
        dateSuspension: [''],
        reasonChangeOrSuspension: [''],
        expectedEndDate: [''],
        observations: [''],
        treatmentContinue: [false],
        treatmentPulsatil: [false],
    });

    private templateName: string = 'treatment-vih';
    private templateDataRequest: string;
    private currentIndication: string;
    public patient: PatientModel;
    private indication = 'vih';
    private currentPage = 0;
    private colOrder: any;
    private typeOrder = '';
    private itemsPerPage: number;
    public paginationData: PaginationModel;
    private pageSize = 5;
    private currentModal: any;
    public loading: boolean = true;

    constructor(
        private _formService: FormsService,
        private _modalService: NgbModal,
        // private _vihTreatmentService: VIHTreatmentService,
        private _formBuilder: FormBuilder,
        private _notification: NotificationService,
        private _translate: TranslateService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.paginationData = {
            number: 0,
            totalElements: 0,
            size: 0,
            totalPages: 0,
        };
        this.currentPage = 1;
        if (localStorage.getItem('selectedPatient')) {
            this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
            this.templateDataRequest = `template=${this.templateName}&patientId=${this.patient.id}`;
            this.getData();
        } else {
            this._notification.showErrorToast('No hay paciente seleccionado.');
            this._router.navigateByUrl('pathology/patients');
        }
    }

    private getData() {
        this.loading = true;

        // this._vihTreatmentService.getGuidelines().subscribe((response) => {
        //     console.log(response);
        // });

        this._formService.getFormData(this.templateDataRequest).subscribe(
            (response: JSONTemplateModel) => {
                this.treatments = this.mongoToObject(response);
                this.paginationData = {
                    number: 1,
                    totalElements: this.treatments.length,
                    size: this.pageSize,
                    totalPages: this.treatments.length / this.pageSize,
                };

                this.sortTableDefault();
            },
            (error) => this._notification.showErrorToast('errorRetrievingData'),
            () => (this.loading = false)
        );

        // TODO ! RECUPERAR INDICACION
        const indicationQuery = `template=principal-diagnosis&patientId=${this.patient.id}&name=principalIndication`;
        this._formService.getFormsDatas(indicationQuery).subscribe((response) => {
            this.indication = response;
            this.indication = 'vih';
        });
    }

    private mongoToObject(mongoObj: JSONTemplateModel): Array<VIHTreatmentModel> {
        let mappedData: Array<VIHTreatmentModel> = [];
        mappedData = mongoObj.data[0].value;
        return mappedData;
    }

    private objectToMongoJSON(): string {
        const mongoObj = {
            template: this.templateName,
            patientId: this.patient.id,
            data: [
                {
                    type: 'table',
                    name: 'principal-treatment',
                    value: [],
                },
            ],
            job: true,
        };

        this.treatments.forEach((treatment) => {
            mongoObj.data[0].value.push({
                indication: this.indication,
                treatmentType: this.settedTreatmentType,
                opcionMedicamento: 'opcionMedicamento',
                medicine: treatment.medicine,
                family: treatment.family,
                atc: treatment.atc,
                cn: treatment.cn,
                tract: treatment.tract,
                dose: treatment.dose,
                otherDosis: treatment.otherDosis,
                pattern: treatment.pattern,
                datePrescription: treatment.datePrescription,
                dateStart: treatment.dateStart,
                expectedEndDate: treatment.expectedEndDate,
                observations: treatment.observations,
                treatmentContinue: treatment.treatmentContinue,
                treatmentPulsatil: treatment.treatmentPulsatil,
                reasonChangeOrSuspension: treatment.reasonChangeOrSuspension,
                dateSuspension: treatment.dateSuspension,
                principle: treatment.principle,
                brand: treatment.brand,
                type: 'QUIMICO',
            });
        });

        return JSON.stringify(mongoObj);
    }

    private addColorRow(tableData) {
        tableData.forEach((element) => {
            element.rowColor = false;
            if (element.dateSuspension) {
                let currentDate = new Date();
                let month = (currentDate.getMonth() + 1).toString();
                let day = currentDate.getDate().toString();
                month = month.length > 1 ? month : '0' + month;
                day = day.length > 1 ? day : '0' + day;
                let currentDateString = currentDate.getFullYear() + '-' + month + '-' + day;
                if (currentDateString >= element.dateSuspension.substr(0, 10)) {
                    element.rowColor = true;
                }
            }
        });
    }

    private fillForm(form: FormGroup, values: any, type: string) {
        let formKeys: string[] = Object.keys(form.controls);
        formKeys.forEach((key: string) => form.controls[key].setValue(values[key]));
        if (type === 'changeSuspend' && !form.controls['dateSuspension'].value) {
            var currentDate = new Date();
            var month = (currentDate.getMonth() + 1).toString();
            var day = currentDate.getDate().toString();
            month = month.length > 1 ? month : '0' + month;
            day = day.length > 1 ? day : '0' + day;
            form.controls['dateSuspension'].setValue(currentDate.getFullYear() + '-' + month + '-' + day);
        }
    }

    private deleteRequiredValidation(keys: any[]) {
        keys.forEach((key) => {
            this.modalForm.controls[key].clearValidators();
            this.modalForm.controls[key].updateValueAndValidity();
        });
    }

    private setRequiredValidation(keys: any[]) {
        keys.forEach((key) => {
            this.modalForm.controls[key].setValidators(Validators.required);
            this.modalForm.controls[key].updateValueAndValidity();
        });
    }

    // ! ----------------------- ALTA  ----------------------- ! //
    public showModalCreate(): void {
        this.modalForm.reset({
            indication: this.indication,
            treatmentType: this.settedTreatmentType,
            opcionMedicamento: 'opcionMedicamento',
            medicine: '',
            family: '',
            atc: '',
            cn: '',
            tract: '',
            dose: '',
            otherDosis: '',
            pattern: '',
            datePrescription: '',
            dateStart: '',
            dateSuspension: '',
            reasonChangeOrSuspension: '',
            expectedEndDate: '',
            observations: '',
            treatmentContinue: false,
            treatmentPulsatil: false,
        });

        const modalRef = this._modalService.open(VIHTreatmentModalComponent, { size: 'lg' });
        modalRef.componentInstance.type = 'create';
        modalRef.componentInstance.title = 'newTreatment';

        this.deleteRequiredValidation(['reasonChangeOrSuspension', 'dateSuspension']);
        this.setRequiredValidation(['dateStart', 'datePrescription']);
        modalRef.componentInstance.form = this.modalForm;

        modalRef.componentInstance.cancel.subscribe((event: any) => modalRef.close());

        modalRef.componentInstance.save.subscribe((event: any) => {
            const row = event.value;
            this.save(modalRef, 'create', event.value);
        });
    }

    // ! ----------------------- BORRADO  ----------------------- ! //
    private showModalConfirm(index: number, type: string) {
        const modalRef = this._modalService.open(ConfirmModalComponent);

        modalRef.componentInstance.title = this._translate.instant('btn.delete');
        modalRef.componentInstance.messageModal = this._translate.instant('areYouSureDelete');
        modalRef.componentInstance.cancel.subscribe((event: any) => modalRef.close());
        modalRef.componentInstance.accept.subscribe((event: any) => {
            let indexString = index.toString();
            this.save(modalRef, 'delete', this.showedTreatments[index], indexString);
        });
    }

    // ! ----------------------- EDICIÓN  ----------------------- ! //
    public async showModalEdit(index: number, type: string) {
        index = this.treatments.indexOf(this.showedTreatments[index]);
        const dataEdit = { ...this.treatments[index] };

        Object.keys(dataEdit).forEach((key: string) => {
            if (key.toLowerCase().includes('date') && dataEdit[key]) {
                dataEdit[key] = moment(dataEdit[key]).format('YYYY-MM-DD');
            }
        });

        this.fillForm(this.modalForm, dataEdit, type);

        const modalRef = this._modalService.open(VIHTreatmentModalComponent, { size: 'lg' });
        modalRef.componentInstance.type = 'edit';
        modalRef.componentInstance.title = 'editTreatment';

        this.deleteRequiredValidation(['reasonChangeOrSuspension', 'dateSuspension']);
        this.setRequiredValidation(['dateStart', 'datePrescription']);
        this.modalForm.controls.treatmentType.setValue(this.settedTreatmentType);
        this.modalForm.controls.indication.setValue(this.indication);
        console.log(this.modalForm.value);
        modalRef.componentInstance.form = this.modalForm;

        this.currentModal = this.modalForm;

        if (this.modalForm.value.dose && this.modalForm.value.dose.name && this.modalForm.value.dose.name === 'Otra') {
            this.modalForm.controls.otherDosis.setValidators(Validators.required);
        }

        modalRef.componentInstance.cancel.subscribe((event: any) => modalRef.close());

        modalRef.componentInstance.update.subscribe((event: any) => {
            event.value.principle = event.value.medicine.actIngredients;
            event.value.brand = event.value.medicine.brand;
            event.value.type = event.value.medicine.family;

            Object.keys(event.value).forEach((key: string) => {
                if (key.toLowerCase().includes('date') && event.value[key]) event.value[key] = new Date(event.value[key]).toISOString();
            });

            const editedRow = event.value;
            const indexString = index.toString();
            this.save(modalRef, 'edit', editedRow, indexString);
        });
    }

    // ! ----------------------- CAMBIO / SUSPENSIÓN  ----------------------- ! //
    public async showModalChange(index: number, type: string) {
        index = this.treatments.indexOf(this.showedTreatments[index]);
        const dataEdit = { ...this.treatments[index] };
        let form_aux = null;

        Object.keys(dataEdit).forEach((key: string) => {
            if (key.toLowerCase().includes('date') && dataEdit[key]) {
                dataEdit[key] = moment(dataEdit[key]).format('YYYY-MM-DD');
            }
        });

        const modalRef = this._modalService.open(VIHTreatmentModalComponent, { size: 'lg' });
        this.modalForm.controls.treatmentType.setValue(this.settedTreatmentType);
        form_aux = this.modalForm;
        this.currentModal = form_aux;

        this.fillForm(form_aux, dataEdit, type);

        modalRef.componentInstance.type = 'changeSuspend';
        modalRef.componentInstance.title = 'changeSuspendTreatment';

        this.deleteRequiredValidation(['dateStart', 'datePrescription']);
        this.setRequiredValidation(['reasonChangeOrSuspension', 'dateSuspension']);
        modalRef.componentInstance.form = this.modalForm;

        modalRef.componentInstance.cancel.subscribe(() => modalRef.close());

        modalRef.componentInstance.update.subscribe((event: any) => {
            Object.keys(event.value).forEach((key: string) => {
                if (key.toLowerCase().includes('date') && event.value[key]) {
                    event.value[key] = new Date(event.value[key]).toISOString();
                }
            });

            const editedRow = event.value;
            const indexString = index.toString();
            this.save(modalRef, 'edit', editedRow, indexString);
        });
    }

    // ! ----------------------- GUARDADO  ----------------------- ! //
    private save(modalRef: NgbModalRef, action: string, treatment: VIHTreatmentModel, index?: string) {
        let repeated = false;
        let found = false;

        treatment.treatmentType = this.settedTreatmentType.id;
        treatment.indication = this.indication;
        treatment.brand = treatment.medicine.brand;
        treatment.principle = treatment.medicine.actIngredients;
        treatment.dose = treatment.dose;

        if (action !== 'delete' && !treatment.dateSuspension) {
            this.treatments.forEach((row) => {
                if (!row.dateSuspension && treatment.medicine && treatment.medicine.id === row.medicine.id) if (!(index && this.treatments.indexOf(row).toString() === index)) repeated = true;
            });
        }

        if (!repeated) {
            switch (action) {
                case 'create':
                    this.treatments.push(treatment);
                    break;
                case 'edit':
                    this.treatments[index] = treatment;
                    break;
                case 'delete':
                    this.treatments.splice(Number(index), 1);
                    break;
            }

            this._formService.fillForm(this.objectToMongoJSON()).subscribe(
                () => {
                    this.paginationData.totalElements = this.treatments.length;
                    switch (action) {
                        case 'create':
                            this._notification.showSuccessToast('elementCreated');
                            break;
                        case 'edit':
                            this._notification.showSuccessToast('elementUpdated');
                            break;
                        case 'delete':
                            this._notification.showSuccessToast('elementDeleted');
                            break;
                    }

                    this.refreshTable();
                },
                (error) => this._notification.showErrorToast(error.errorCode),
                () => modalRef.close()
            );
        } else {
            this._notification.showErrorToast('duplicatedTreatment');
            modalRef.close();
        }
    }

    // ! ************** PUBLIC METHODS ************** ! //

    onIconButtonClick(event: any) {
        const index: number = event.selectedItem;
        const action: 'edit' | 'delete' | 'changeSuspend' = event.type;

        switch (action) {
            case 'edit':
                this.showModalEdit(index, action);
                break;
            case 'changeSuspend':
                this.showModalChange(index, action);
                break;
            case 'delete':
                this.showModalConfirm(index, action);
                break;
        }
    }

    // * PAGINADOR * //

    public selectPage(page: number): void {
        this.currentPage = page;
        const indexStartPage = page * this.paginationData.size;
        let finalPageItemIndex = indexStartPage + this.paginationData.size - 1;

        // console.log(`PAGE: ${page} | start index: ${indexStartPage} | end index: ${finalPageItemIndex} | last index: ${this.treatments.length - 1}`);

        if (this.treatments.length - 1 < finalPageItemIndex) finalPageItemIndex = this.treatments.length - 1;

        if (finalPageItemIndex + 1 > this.treatments.length) this.showedTreatments.slice(indexStartPage, finalPageItemIndex - this.treatments.length);
        else this.showedTreatments = this.treatments.slice(indexStartPage, indexStartPage + this.paginationData.size);
        this.addColorRow(this.showedTreatments);
    }

    public selectItemsPerPage(number: number) {
        this.itemsPerPage = number;
        this.paginationData.size = number;
        this.selectPage(0);
    }

    // * SORT * //

    public onSort(event: any) {
        this.typeOrder = event.direction;
        this.colOrder = event.column;
        this.refreshTable();
    }

    public sortTableDefault() {
        console.log(this.treatments);
        this.treatments.sort(function (a, b) {
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
        this.selectPage(this.currentPage);
    }

    public refreshTable() {
        if (this.typeOrder === '') {
            this.sortTableDefault();
        } else {
            var typeOrder = this.typeOrder;
            var colOrder = this.colOrder;
            this.treatments.sort(function (a, b) {
                if (typeOrder === 'asc' && typeof a[colOrder] === 'boolean' && typeof b[colOrder] === 'boolean') {
                    return a[colOrder] < b[colOrder] ? 1 : -1;
                } else if (typeOrder === 'desc' && typeof a[colOrder] === 'boolean' && typeof b[colOrder] === 'boolean') {
                    return a[colOrder] < b[colOrder] ? -1 : 1;
                } else if (typeOrder === 'asc' && !isNaN(a[colOrder]) && !isNaN(b[colOrder])) {
                    return parseInt(a[colOrder]) < parseInt(b[colOrder]) ? 1 : -1;
                } else if (typeOrder === 'desc' && !isNaN(a[colOrder]) && !isNaN(b[colOrder])) {
                    return parseInt(a[colOrder]) < parseInt(b[colOrder]) ? -1 : 1;
                } //Para comparar las dosis que vienen como objeto {name : 'ejemplo'}
                else if (typeOrder === 'asc' && typeof a[colOrder] === 'object' && typeof b[colOrder] === 'object') {
                    return a[colOrder]['name'] < b[colOrder]['name'] ? 1 : -1;
                } else if (typeOrder === 'desc' && typeof a[colOrder] === 'object' && typeof b[colOrder] === 'object') {
                    return a[colOrder]['name'] < b[colOrder]['name'] ? -1 : 1;
                } else if (typeOrder === 'asc') {
                    return a[colOrder] < b[colOrder] ? 1 : -1;
                } else if (typeOrder === 'desc') {
                    return a[colOrder] < b[colOrder] ? -1 : 1;
                }
            });
        }
        this.addColorRow(this.treatments);
        this.selectPage(this.currentPage);
    }
}
