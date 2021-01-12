import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap, timeout } from 'rxjs/operators';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IndicationService } from 'src/app/modules/management/services/indications/indication.service';
import { JSONTemplateModel } from 'src/app/modules/pathology/models/JSON-template.model';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';
import { VIHTreatmentModel } from '../../models/vih-treatment.model';
import { VIHTreatmentModalComponent } from './vih-treatment-modal/vih-treatment-modal.component';

@Component({
    selector: 'app-vih-treatments',
    templateUrl: './vih-treatments.component.html',
    styleUrls: ['./vih-treatments.component.scss']
})
export class VIHTreatmentsComponent implements OnInit {
    public treatments: Array<VIHTreatmentModel> = [];
    public showedTreatments: Array<VIHTreatmentModel> = [];
    public columHeaders = ['indication', 'principle', 'brand', 'dose', 'dateStart', 'datePrescription', 'dateSuspension'];
    public actions: TableActionsModel[] = [
        new TableActionsModel('changeSuspend', 'edit-3'),
        new TableActionsModel('edit', 'edit-2'),
        new TableActionsModel('delete', 'trash')
    ];

    private modalForm: FormGroup = this._formBuilder.group({
        indication: ['', Validators.required],
        treatmentType: [{ value: 'QUIMICO', disabled: true }, Validators.required],
        opcionMedicamento: [''],
        opcionFormulaMagistral: [''],

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
        dateSuspension: [''],
    });
    private templateStructure: Array<JSONTemplateModel>;

    private templateName: string = 'treatment-vih';
    private templateDataRequest: string;
    private currentIndication: string;
    public patient: PatientModel;
    private indication = '';
    private currentPage = 0;
    private colOrder: any;
    private typeOrder: any;
    private itemsPerPage: number;
    public paginationData: PaginationModel;
    private pageSize = 5;
    private currentModal: any;
    public loading: boolean = true;

    private modalOptions = {
        indication: { type: 'text', class: 'col-12', href: 'pepito' },
        specialIndication: { type: 'checkbox', class: 'col-2' },
        bigPsychologicalImpact: { type: 'checkbox', class: 'col-2' },
        visibleInjury: { type: 'checkbox', class: 'col-2' },
        others: { type: 'text', class: 'col-6' },
        treatmentType: {
            type: 'select',
            class: 'col-12',
            options: [{ id: 'QUIMICO', name: this._translate.instant('chemical') }],
            value: { id: 'QUIMICO' }
        },
        opcionMedicamento: {
            type: 'radio',
            class: 'col-6',
        },
        opcionFormulaMagistral: {
            type: 'radio',
            class: 'col-6',
        },
        medicine: {
            type: 'typeahead',
            class: 'col-12',
            // typeahead: this.search,
            // inputFormatter: this.formatter,
            // resultFormatter: this.formatter,
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
        descripcionFormulaMagistral: { type: 'text', class: 'col-6' },
        dosisFormulaMagistral: { type: 'text', class: 'col-6' },
        regimenTreatment: {
            type: 'select',
            class: 'col-6',
            options: [
                { name: this._translate.instant('intensificada') },
                { name: this._translate.instant('standard') },
                { name: this._translate.instant('reduced') },
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
                    name: this._translate.instant('reasonChangeOrSuspensionList.motive10'),
                },
            ],
        },
        dateSuspension: { type: 'date', class: 'col-6' },
    };

    constructor(
        private _formService: FormsService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _notification: NotificationService,
        private _translate: TranslateService,
        private _indicationService: IndicationService,
        private _medicinesService: MedicinesServices,
        private _router: Router
    ) { }

    /*
        * 1. Se cargan datos de BD llamando a /forms?template=name&patientId=id
        * 2. Parseo de datos a modelo local para trabajar con los mismos
        * 3. Carga de resultados en tabla configurando paginador y ordenado.
        * 4. Modal alta/modificacion.
        * 5. Modal cambio tratamiento.
        * 6. Modal confirmación borrado.
        * ! Deben parsearse los datos que se vayan a guardar a formato template para su guardado en bd.
    */

    ngOnInit () {
        this.paginationData = {
            number: 0,
            totalElements: 0,
            size: 0,
            totalPages: 0
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

    private getData () {
        this.loading = true;
        this._formService.getFormData(this.templateDataRequest).subscribe(
            (response: JSONTemplateModel) => {
                this.treatments = this.mongoToObject(response);

                this.paginationData = {
                    number: 1,
                    totalElements: this.treatments.length,
                    size: this.pageSize,
                    totalPages: this.treatments.length / this.pageSize
                };

                this.sortTableDefault();
            },
            error => this._notification.showErrorToast('errorRetrievingData'),
            () => this.loading = false
        );

        // TODO ! RECUPERAR INDICACION
        const indicationQuery = `template=principal-diagnosis&patientId=${this.patient.id}&name=principalIndication`
        this._formService.getFormsDatas(indicationQuery).subscribe(
            response => this.indication = response
        );
    }

    private mongoToObject (mongoObj: JSONTemplateModel): Array<VIHTreatmentModel> {
        let mappedData: Array<VIHTreatmentModel> = [];
        mappedData = mongoObj.data[0].value;
        return mappedData;
    }

    private objectToMongoJSON (): string {
        const mongoObj = {
            template: this.templateName,
            patientId: this.patient.id,
            data: [{
                type: 'table',
                name: 'principal-treatment',
                value: []
            }],
            job: true
        };

        this.treatments.forEach(treatment => {
            mongoObj.data[0].value.push({
                indication: 'vih',
                treatmentType: 'QUIMICO',
                opcionMedicamento: 'opcionMedicamento',
                medicine: treatment.medicine,
                family: treatment.family,
                atc: treatment.atc,
                cn: treatment.cn,
                tract: treatment.tract,
                dose: treatment.dose,
                otherDosis: treatment.otherDosis,
                regimenTreatment: treatment.regimenTreatment,
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
                type: 'QUIMICO'
            });
        });

        // ! DATOS DE MENTIRA
        /*
        for (let index = 0; index < 5; index++) {
            mongoObj.data[0].value.push({
                indication: 'vih',
                treatmentType: 'QUIMICO',
                opcionMedicamento: 'opcionMedicamento',
                medicine: {
                    "dateCreated": "2020-11-09T11:20:53",
                    "dateUpdated": "2020-11-09T11:20:53",
                    "id": 7,
                    "actIngredients": "Apremilast",
                    "codeAct": "L04AA32",
                    "acronym": "APR",
                    "nationalCode": "704966",
                    "description": "Apremilast",
                    "presentation": "OTEZLA 10 mg 20 mg 30 mg COMPRIMIDOS RECUBIERTOS CON PELICULA, 27 comprimidos\r\n",
                    "content": null,
                    "authorizationDate": null,
                    "authorized": true,
                    "endDateAuthorization": null,
                    "commercialization": true,
                    "commercializationDate": null,
                    "endDateCommercialization": null,
                    "units": null,
                    "pvl": null,
                    "pvlUnitary": null,
                    "pvp": null,
                    "pathology": "DERMATOLOGÍA",
                    "biologic": true,
                    "viaAdministration": "oral",
                    "family": "QUIMICO",
                    "subfamily": null,
                    "brand": "OTEZLA",
                    "name": "Apremilast"
                },
                family: "QUIMICO",
                atc: "L04AA32",
                cn: "704966",
                tract: "oral",
                dose: {
                    name: "Otra"
                },
                otherDosis: "oral",
                regimenTreatment: "Intensificada",
                datePrescription: "2020-02-01T00:00:00.000Z",
                dateStart: "2020-03-01T00:00:00.000Z",
                expectedEndDate: "2020-05-05T00:00:00.000Z",
                observations: "",
                treatmentContinue: true,
                treatmentPulsatil: false,
                reasonChangeOrSuspension: null,
                dateSuspension: null,
                principle: "Apremilast",
                brand: 'OTEZLA',
                type: 'QUIMICO'
            });
        }
        */

        return JSON.stringify(mongoObj);
    }

    private addColorRow (tableData) {
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

    // ! FORMULARIOS ! //
    private fillForm (form: FormGroup, values: any, type: string) {
        let formKeys: string[] = Object.keys(form.controls);

        formKeys.forEach((key: string) => {
            form.controls[key].setValue(values[key]);
            // if (values[key] && form.get(key) && type === 'detail') {
            //   form.controls[key].disable();
            // }
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

    public showModalCreate (): void {
        this.modalForm.reset({
            //indication: this.indication,
            indication: 'vih',
            treatmentType: 'QUIMICO',
            opcionMedicamento: 'opcionMedicamento',
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

        const modalRef = this._modalService.open(VIHTreatmentModalComponent, { size: 'lg' });

        modalRef.componentInstance.type = 'create';
        modalRef.componentInstance.title = 'newTreatment';
        modalRef.componentInstance.form = this.modalForm;

        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });

        modalRef.componentInstance.save.subscribe((event: any) => {
            console.log(event);
            if (event.type === 'create') {
                
            }
            // event.value.indication = this.currentIndication;
            // event.value.dose = event.value.dose[0];

            // if (Array.isArray(event.value.regimenTreatment)) {
            //     event.value.regimenTreatment = event.value.regimenTreatment[0].name;
            // } else {
            //     if (event.value.regimenTreatment.name) {
            //         event.value.regimenTreatment = event.value.regimenTreatment.name;
            //     }
            // }

            // event.value.reasonChangeOrSuspension = null;
            // event.value.dateSuspension = null;
            // event.value.principle = event.value.medicine.actIngredients;
            // event.value.brand = event.value.medicine.brand;
            // event.value.type = event.value.medicine.family;

            // if (Array.isArray(event.value.treatmentType)) {
            //     event.value.treatmentType = event.value.treatmentType[0].id;
            // } else if (event.value.treatmentType.id) {
            //     event.value.treatmentType = event.value.treatmentType.id;
            // }
            // Object.keys(event.value).forEach((key: string) => {
            //     if (key.toLowerCase().includes('date') && event.value[key]) {
            //         event.value[key] = new Date(event.value[key]).toISOString();
            //     }
            // });

            // if (!this.treatments) this.treatments = [];
            // this.currentModal = this.modalForm;
            // //Controlamos que el elemento no se inserte en la tabla antes de guardar si el tratamiento es dupliclado
            // let newRow = event.value;
            // this.save(modalRef, 'create', newRow);
        });
    }

    private deleteRequiredValidation (keys: any[]) {
        keys.forEach((key) => {
            this.modalForm.controls[key].clearValidators();
            this.modalForm.controls[key].updateValueAndValidity();
        });
    }

    private setRequiredValidation (keys: any[]) {
        keys.forEach((key) => {
            this.modalForm.controls[key].setValidators(Validators.required);
            this.modalForm.controls[key].updateValueAndValidity();
        });
    }

    private save (modalRef, type, newRow?, index?: string, editedRow?) {
        // let repeated = false;
        // let found = false;
        // if (type != 'delete' && !this.currentModal.get('dateSuspension')) {
        //     // Controla si un medicamento ya existe para un tratamiento activo
        //     this.treatments.forEach((row) => {
        //         if (
        //             !row.dateSuspension &&
        //             this.currentModal.controls.medicine &&
        //             this.currentModal.controls.medicine.value.id === row.medicine.id
        //         ) {
        //             if (index && this.treatments.indexOf(row).toString() === index) {
        //                 // Salta si es él mismo
        //             } else {
        //                 repeated = true;
        //             }
        //         }
        //     });

        //     if (repeated) {
        //         this._notification.showErrorToast('duplicatedTreatment');
        //     }
        // }
        // if (!repeated) {
        //     if (type === 'create') {
        //         this.tableData.push(newRow);
        //     }
        //     if (type === 'edit') {
        //         Object.keys(editedRow).forEach((key: string) => {
        //             this.tableData[Number(index)][key] = editedRow[key];
        //         });
        //     }
        //     if (type === 'delete') {
        //         this.tableData.splice(Number(index), 1);
        //         this.paginationData.totalElements = this.tableData.length;
        //     }

        //     const form = {
        //         template: this.key,
        //         data: [
        //             {
        //                 type: 'table',
        //                 name: 'principal-treatment',
        //                 value: this.tableData,
        //             },
        //         ],
        //         patientId: this.patient.id,
        //         job: true,
        //     };

        //     this._formsService.fillForm(form).subscribe(
        //         () => {
        //             if (type === 'create') {
        //                 this.paginationData.totalElements = this.tableData.length;
        //                 this._notification.showSuccessToast('elementCreated');
        //             } else if (type === 'edit') {
        //                 this._notification.showSuccessToast('elementUpdated');
        //             } else if (type === 'delete') {
        //                 this._notification.showSuccessToast('elementDeleted');
        //             }
        //             modalRef.close();
        //             this.refreshTable();
        //         },
        //         ({ error }) => {
        //             this._notification.showErrorToast(error.errorCode);
        //         }
        //     );
        // }
    }

    // ! ************** PUBLIC METHODS ************** ! //

    // * PAGINADOR * //

    public selectPage (page: number): void {
        this.currentPage = page;
        const indexStartPage = page * this.paginationData.size;
        let finalPageItemIndex = (indexStartPage + this.paginationData.size) - 1;

        // console.log(`PAGE: ${page} | start index: ${indexStartPage} | end index: ${finalPageItemIndex} | last index: ${this.treatments.length - 1}`);

        if (this.treatments.length - 1 < finalPageItemIndex) finalPageItemIndex = this.treatments.length - 1;

        if (finalPageItemIndex + 1 > this.treatments.length) this.showedTreatments.slice(indexStartPage, finalPageItemIndex - this.treatments.length);
        else this.showedTreatments = this.treatments.slice(indexStartPage, indexStartPage + this.paginationData.size);
    }

    public selectItemsPerPage (number: number) {
        this.itemsPerPage = number;
        this.paginationData.size = number;
        this.selectPage(0);
    }

    // * SORT * //

    public onSort (event: any) {
        this.typeOrder = event.direction;
        this.colOrder = event.column;
        this.refreshTable();
    }

    public sortTableDefault () {
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

    public refreshTable () {
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
