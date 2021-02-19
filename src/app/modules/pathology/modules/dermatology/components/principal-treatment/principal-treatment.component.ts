import { Component, OnInit } from '@angular/core';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import moment from 'moment';
import { IndicationService } from 'src/app/modules/management/services/indications/indication.service';
import { DoseModel } from 'src/app/modules/management/models/medicines/dose.model';
import { constants } from 'src/constants/constants';
import { PatientModel } from 'src/app/modules/pathology/models/patient.model';
import { PrincipalTreatmentModalComponent } from '../principal-treatment-modal/principal-treatment-modal.component';

@Component({
    selector: 'app-principal-treatment',
    templateUrl: './principal-treatment.component.html',
    styleUrls: ['./principal-treatment.component.scss'],
})
export class PrincipalTreatmentComponent implements OnInit {
    private currentIndication: string;
    key = constants.farmacologiesTreatments;
    public columHeaders = ['indication', 'principle', 'brand', 'dose', 'dateStart', 'datePrescription', 'dateSuspension', 'treatmentType'];
    public actions: TableActionsModel[] = [new TableActionsModel('changeSuspend', 'edit-3'), new TableActionsModel('edit', 'edit-2'), new TableActionsModel('delete', 'trash')];
    public tableData: any[] = [];
    public tableDataFilter: any[] = [];
    private modalForm: FormGroup = this._formBuilder.group({
        indication: ['', Validators.required],
        specialIndication: [false],
        bigPsychologicalImpact: [false],
        visibleInjury: [false],
        others: [''],
        treatmentType: ['', Validators.required],
        opcionMedicamento: [''],
        opcionFormulaMagistral: [''],

        // medicamento topico
        medicine: ['', Validators.required],
        family: ['', Validators.required],
        atc: ['', Validators.required],
        cn: ['', Validators.required],
        tract: ['', Validators.required],
        // formula magistral topico
        descripcionFormulaMagistral: [''],
        dosisFormulaMagistral: [''],

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
        actionType: ['', Validators.required],
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

    // TODO: Unificar los formularios con los campos comunes
    private modalFormUpdateTopico: FormGroup = this._formBuilder.group({
        actionType: ['', Validators.required],
        reasonChangeOrSuspension: ['', Validators.required],
        descripcionFormulaMagistral: ['', Validators.required],
        dosisFormulaMagistral: [''],
        opcionMedicamento: [''],
        opcionFormulaMagistral: [''],
        regimenTreatment: ['', Validators.required],
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
    private currentModal: any;

    formatter = (state) => state.name;

    search = (text$: Observable<string>) => {
        return text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap((term) =>
                this._medicinesService
                    .getByText(
                        `search=${term}&treatmentType=${this.modalForm.controls.treatmentType.value.id
                            ? this.modalForm.controls.treatmentType.value.id
                            : this.modalForm.controls.treatmentType.value[0]?.id
                                ? this.modalForm.controls.treatmentType.value[0].id
                                : this.modalForm.controls.treatmentType.value
                        }`
                    )
                    .pipe(
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

    // TODO: cuando se vaya a refactorizar las opciones del treatmentType hay que cambiarlo tambien en la modal
    private modalOptions = {
        actionType: {
            type: 'select',
            class: 'col-12',
            options: [
                { id: 'change', name: 'change' },
                { id: 'suspension', name: 'suspension' },
            ],
            value: { id: 'change', name: 'change' },
        },
        indication: { type: 'text', class: 'col-12', href: 'pepito' },
        specialIndication: { type: 'checkbox', class: 'col-2' },
        bigPsychologicalImpact: { type: 'checkbox', class: 'col-2' },
        visibleInjury: { type: 'checkbox', class: 'col-2' },
        others: { type: 'text', class: 'col-6' },
        treatmentType: {
            type: 'select',
            class: 'col-12',
            options: [
                { id: 'BIOLOGICO', name: this._translate.instant('biological') },
                { id: 'QUIMICO', name: this._translate.instant('chemical') },
                { id: 'TOPICO', name: this._translate.instant('topical') },
            ],
            value: { id: 'QUIMICO' },
        },
        opcionMedicamento: { type: 'radio', class: 'col-6' },
        opcionFormulaMagistral: { type: 'radio', class: 'col-6' },
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
        dose: { type: 'select', class: 'col-6', options: [] },
        otherDosis: { type: 'text', class: 'col-6' },
        descripcionFormulaMagistral: { type: 'text', class: 'col-6' },
        dosisFormulaMagistral: { type: 'text', class: 'col-6' },
        regimenTreatment: {
            type: 'select',
            class: 'col-6',
            options: [{ name: this._translate.instant('intensificada') }, { name: this._translate.instant('standard') }, { name: this._translate.instant('reduced') }],
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
                { id: 0, name: this._translate.instant('reasonChangeOrSuspensionList.motive1') },
                { id: 1, name: this._translate.instant('reasonChangeOrSuspensionList.motive2') },
                { id: 2, name: this._translate.instant('reasonChangeOrSuspensionList.motive3') },
                { id: 3, name: this._translate.instant('reasonChangeOrSuspensionList.motive4') },
                { id: 4, name: this._translate.instant('reasonChangeOrSuspensionList.motive5') },
                { id: 5, name: this._translate.instant('reasonChangeOrSuspensionList.motive6') },
                { id: 6, name: this._translate.instant('reasonChangeOrSuspensionList.motive7') },
                { id: 7, name: this._translate.instant('reasonChangeOrSuspensionList.motive8') },
                { id: 8, name: this._translate.instant('reasonChangeOrSuspensionList.motive9') },
                { id: 9, name: this._translate.instant('reasonChangeOrSuspensionList.motive10') },
            ],
        },
        dateSuspension: { type: 'date', class: 'col-6' },
    };

    constructor(
        private _formsService: FormsService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _notification: NotificationService,
        private _translate: TranslateService,
        private _indicationService: IndicationService,
        private _medicinesService: MedicinesServices
    ) { }

    ngOnInit (): void {
        this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
        this.paginationData = {
            number: 0,
            totalPages: 0,
            size: 0,
            totalElements: 0,
        };
        this.currentPage = 1;
        this.typeOrder = '';
        this.colOrder = '';
        // const query = `patient=${this.currentUser.id}&treatment=${this.currentTreatment}&page=${this.currentPage}`;
        this.getFormDatas();
        this.getForm();
    }

    async getForm () {
        this._formsService.retrieveForm(this.key, this.patient.id).subscribe(
            (retrievedForm: any) => {
                if (retrievedForm && retrievedForm.data.length > 0) {
                    this.tableData = retrievedForm.data[0].value;
                    this.paginationData = {
                        number: this.currentPage,
                        totalPages: this.tableData.length / this.sizeTable,
                        size: this.sizeTable,
                        totalElements: this.tableData.length,
                    };
                    this.addColorRow(this.tableData);
                    this.tableDataFilter = this.tableData.map((x) => x);
                    this.tableDataFilter = this.tableDataFilter.splice(this.paginationData.number * this.paginationData.size, this.paginationData.size);
                }
            }
        );
    }

    getFormDatas () {
        this._formsService.getFormsDatas(`template=principal-diagnosis&patientId=${this.patient.id}&name=principalIndication`).subscribe(
            (data: string) => {
                let indications = this._indicationService.indications;
                if (!indications) this.indication = data;

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

    private setDoses (doses: DoseModel[], modalRef) {
        const comboData = [];
        doses.forEach((element: DoseModel, i: number) => comboData.push({ id: i, name: `${element.description} ${element.doseIndicated ? '(' + element.doseIndicated + ')' : ''}` }));
        comboData.push({ id: doses.length + 1, name: 'Otra' });
        modalRef.componentInstance.options.dose.options = comboData;
        return modalRef;
    }

    private onDoseSelect (event: any) {
        if (event && event.name === 'Otra') this.modalForm.controls.otherDosis.setValidators(Validators.required);
        else {
            this.modalForm.controls.otherDosis.clearValidators();
            this.modalForm.controls.otherDosis.setValue('');
        }

        this.modalForm.controls.regimenTreatment.setValue({ name: this._translate.instant('standard') });
    }

    // ! CREACIÓN ! //
    public showModalCreate (): void {
        this.modalForm.reset({
            indication: this.indication,
            specialIndication: false,
            bigPsychologicalImpact: false,
            visibleInjury: false,
            others: '',
            treatmentType: '',
            opcionMedicamento: 'opcionMedicamento',
            opcionFormulaMagistral: null,
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
            descripcionFormulaMagistral: '',
            dosisFormulaMagistral: '',
        });

        let modalRef = this._modalService.open(PrincipalTreatmentModalComponent, {
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
            modalRef.componentInstance.form.controls.tract.setValue(event.viaAdministration);

            this._medicinesService.getDosesByMedicine(`medicineId=${event.id}`).subscribe(
                (doses: DoseModel[]) => (modalRef = this.setDoses(doses, modalRef)),
                (error) => this._notification.showErrorToast('Ha ocurrido un error recuperando las dosis')
            );
        });

        modalRef.componentInstance.selectDose.subscribe((event: any) => this.onDoseSelect(event));

        modalRef.componentInstance.selectTreatmentType.subscribe((event: any) => {
            //si cambiamos el tipo de tratamiento, limpiamos lo que hubiese en las opciones de la formula magistral
            this.modalForm.controls.descripcionFormulaMagistral.clearValidators();
            this.modalForm.controls.descripcionFormulaMagistral.setValue('');
            this.modalForm.controls.dosisFormulaMagistral.setValue('');
            this.modalForm.controls.treatmentType.setValue(event);
        });

        modalRef.componentInstance.selectTopicalType.subscribe((event: any) => {
            if (event === 'opcionMedicamento') {
                this.deleteRequiredValidation(['descripcionFormulaMagistral']);
                this.setRequiredValidation(['medicine', 'family', 'atc', 'cn', 'tract', 'dose', 'otherDosis']);
            }
            if (event === 'opcionFormulaMagistral') {
                this.modalForm.controls.descripcionFormulaMagistral.setValidators(Validators.required);
                this.deleteRequiredValidation(['medicine', 'family', 'atc', 'cn', 'tract', 'dose', 'otherDosis']);
            }
        });

        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });

        modalRef.componentInstance.save.subscribe((event: any) => {
            event.value.indication = this.currentIndication;
            event.value.dose = event.value.dose[0] ? event.value.dose[0] : event.controls.dose.value;

            if (Array.isArray(event.value.regimenTreatment)) {
                event.value.regimenTreatment = event.value.regimenTreatment[0].name;
            } else {
                if (event.value.regimenTreatment.name) {
                    event.value.regimenTreatment = event.value.regimenTreatment.name;
                }
            }

            event.value.reasonChangeOrSuspension = null;
            event.value.dateSuspension = null;
            event.value.principle = event.value.medicine.actIngredients;
            event.value.brand = event.value.medicine.brand;
            event.value.type = event.value.medicine.family;

            if (Array.isArray(event.value.treatmentType)) {
                event.value.treatmentType = event.value.treatmentType[0].id;
            } else if (event.value.treatmentType.id) {
                event.value.treatmentType = event.value.treatmentType.id;
            }
            Object.keys(event.value).forEach((key: string) => {
                if (key.toLowerCase().includes('date') && event.value[key]) {
                    event.value[key] = new Date(event.value[key]).toISOString();
                }
            });

            if (!this.tableData) {
                this.tableData = [];
            }
            this.currentModal = this.modalForm;
            //Controlamos que el elemento no se inserte en la tabla antes de guardar si el tratamiento es dupliclado
            let newRow = event.value;
            this.save(modalRef, 'create', newRow);
            this.refreshTable();
        });
    }

    // ! CAMBIO/SUSPENSIÓN ! //
    public async showModalChange (index: number, type: string) {
        const dataEdit = { ...this.tableData[index] };
        dataEdit.indication = this._translate.instant(dataEdit.indication);
        let form_aux = null;

        Object.keys(dataEdit).forEach((key: string) => {
            if (key.toLowerCase().includes('date') && dataEdit[key]) {
                dataEdit[key] = moment(dataEdit[key]).format('YYYY-MM-DD');
            }
        });

        let modalRef = this._modalService.open(PrincipalTreatmentModalComponent, { size: 'lg' });

        if (dataEdit.treatmentType !== 'TOPICO' && dataEdit.opcionFormulaMagistral !== 'opcionFormulaMagistral') {
            this._medicinesService.getDosesByMedicine(`medicineId=${dataEdit.medicine.id}`).subscribe(
                (doses: DoseModel[]) => {
                    modalRef = this.setDoses(doses, modalRef);
                    this.onDoseSelect({ name: dataEdit.dose.name });
                },
                (error) => this._notification.showErrorToast('Ha ocurrido un error recuperando las dosis')
            );
        }

        if (dataEdit.treatmentType === 'TOPICO' && dataEdit.opcionFormulaMagistral === 'opcionFormulaMagistral') {
            form_aux = this.modalFormUpdateTopico;
            this.currentModal = form_aux;
        } else {
            form_aux = this.modalFormUpdate;
            this.currentModal = form_aux;
        }

        this.fillForm(form_aux, dataEdit, type);

        modalRef.componentInstance.type = 'changeSuspend';
        modalRef.componentInstance.title = 'changeSuspendTreatment';
        modalRef.componentInstance.form = form_aux;
        modalRef.componentInstance.options = this.modalOptions;
        if (!modalRef.componentInstance.form.value.reasonChangeOrSuspension) {
            modalRef.componentInstance.form.controls.reasonChangeOrSuspension.setValue('');
        } else {
            modalRef.componentInstance.form.controls.reasonChangeOrSuspension.setValue({
                name: dataEdit.reasonChangeOrSuspension,
            });
        }

        modalRef.componentInstance.selectActionType.subscribe((event: any) => {
            if (event.name === 'suspension') {
                var currentDate = new Date();
                var month = (currentDate.getMonth() + 1).toString();
                var day = currentDate.getDate().toString();
                month = month.length > 1 ? month : '0' + month;
                day = day.length > 1 ? day : '0' + day;
                modalRef.componentInstance.form.controls.dateSuspension.setValidators(Validators.required);
                modalRef.componentInstance.form.controls.dateSuspension.setValue(currentDate.getFullYear() + '-' + month + '-' + day);
                modalRef.componentInstance.form.controls.dateSuspension.enable();
            } else if (event.name === 'change') {
                modalRef.componentInstance.form.controls.dateSuspension.clearValidators();
                modalRef.componentInstance.form.controls.dateSuspension.setValue('');
                modalRef.componentInstance.form.controls.dateSuspension.disable();
            }
        });

        modalRef.componentInstance.selectDose.subscribe((event: any) => this.onDoseSelect(event));
        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });

        modalRef.componentInstance.update.subscribe((event: any) => {
            if (event.value.dose) {
                event.value.dose = event.value.dose[0] ? event.value.dose[0] : event.controls.dose.value;
            }

            if (Array.isArray(event.value.regimenTreatment)) {
                event.value.regimenTreatment = event.value.regimenTreatment[0].name;
            } else {
                if (event.value.regimenTreatment.name) {
                    event.value.regimenTreatment = event.value.regimenTreatment.name;
                }
            }

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

            let editedRow = event.value;
            let indexString = index.toString();
            this.save(modalRef, 'edit', null, indexString, editedRow);
        });
    }

    // ! EDICIÓN ! //
    public async showModalEdit (index: number, type: string) {
        const dataEdit = { ...this.tableData[index] };
        dataEdit.indication = this._translate.instant(dataEdit.indication);

        Object.keys(dataEdit).forEach((key: string) => {
            if (key.toLowerCase().includes('date') && dataEdit[key]) {
                dataEdit[key] = moment(dataEdit[key]).format('YYYY-MM-DD');
            }
        });

        this.fillForm(this.modalForm, dataEdit, type);
        let modalRef = this._modalService.open(PrincipalTreatmentModalComponent, {
            size: 'lg',
        });

        if (dataEdit.treatmentType.id !== 'TOPICO' && dataEdit.opcionFormulaMagistral !== 'opcionFormulaMagistral') {
            this._medicinesService.getDosesByMedicine(`medicineId=${dataEdit.medicine.id}`).subscribe(
                (doses: DoseModel[]) => {
                    modalRef = this.setDoses(doses, modalRef);
                    this.onDoseSelect({ name: dataEdit.dose.name });
                },
                (error) => this._notification.showErrorToast('Ha ocurrido un error recuperando las dosis')
            );
        }

        modalRef.componentInstance.type = 'edit';
        modalRef.componentInstance.title = 'editTreatment';
        modalRef.componentInstance.form = this.modalForm;
        this.currentModal = this.modalForm;
        modalRef.componentInstance.options = this.modalOptions;

        if (this.modalForm.value.dose && this.modalForm.value.dose.name && this.modalForm.value.dose.name === 'Otra') {
            this.modalForm.controls.otherDosis.setValidators(Validators.required);
        }

        //seteamos el select del tipo de tratamiento para que venga seleccionado.
        modalRef.componentInstance.form.controls.treatmentType.setValue(this.modalForm.value.treatmentType);
        modalRef.componentInstance.selectInputTypeahead.subscribe((event: any) => {
            modalRef.componentInstance.options.dose.options = [];

            modalRef.componentInstance.form.controls.family.setValue(event.family);
            modalRef.componentInstance.form.controls.atc.setValue(event.codeAct);
            modalRef.componentInstance.form.controls.cn.setValue(event.nationalCode);
            modalRef.componentInstance.form.controls.tract.setValue(event.viaAdministration);

            this._medicinesService.getDosesByMedicine(`medicineId=${dataEdit.medicine.id}`).subscribe(
                (doses: DoseModel[]) => (modalRef = this.setDoses(doses, modalRef)),
                (error) => this._notification.showErrorToast('Ha ocurrido un error recuperando las dosis')
            );
        });

        modalRef.componentInstance.selectDose.subscribe((event: any) => this.onDoseSelect(event));
        modalRef.componentInstance.selectTreatmentType.subscribe((event: any) => {
            //si cambiamos el tipo de tratamiento, limpiamos lo que hubiese en las opciones de la formula magistral
            this.modalForm.controls.descripcionFormulaMagistral.clearValidators();
            this.modalForm.controls.descripcionFormulaMagistral.setValue('');
            this.modalForm.controls.dosisFormulaMagistral.setValue('');
        });

        modalRef.componentInstance.selectTopicalType.subscribe((event: any) => {
            if (event === 'opcionMedicamento') {
                this.deleteRequiredValidation(['descripcionFormulaMagistral']);
                this.setRequiredValidation(['medicine', 'family', 'atc', 'cn', 'tract', 'dose', 'otherDosis']);
            }
            if (event === 'opcionFormulaMagistral') {
                this.modalForm.controls.descripcionFormulaMagistral.setValidators(Validators.required);
                this.deleteRequiredValidation(['medicine', 'family', 'atc', 'cn', 'tract', 'dose', 'otherDosis']);
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
                event.value.regimenTreatment = event.value.regimenTreatment[0].name;
            } else {
                if (event.value.regimenTreatment.name) {
                    event.value.regimenTreatment = event.value.regimenTreatment.name;
                }
            }
            if (Array.isArray(event.value.treatmentType)) {
                event.value.treatmentType = event.value.treatmentType[0].id;
            } else {
                if (event.value.treatmentType.id) event.value.treatmentType = event.value.treatmentType.id;
            }

            event.value.principle = event.value.medicine.actIngredients;
            event.value.brand = event.value.medicine.brand;
            event.value.type = event.value.medicine.family;

            Object.keys(event.value).forEach((key: string) => {
                if (key.toLowerCase().includes('date') && event.value[key]) {
                    event.value[key] = new Date(event.value[key]).toISOString();
                }
            });

            let editedRow = event.value;
            let indexString = index.toString();
            this.save(modalRef, 'edit', null, indexString, editedRow);
        });
    }

    private showModalConfirm (index: number, type: string) {
        const modalRef = this._modalService.open(ConfirmModalComponent);

        modalRef.componentInstance.title = this._translate.instant('btn.delete');
        modalRef.componentInstance.messageModal = this._translate.instant('areYouSureDelete');
        modalRef.componentInstance.cancel.subscribe((event: any) => {
            modalRef.close();
        });
        modalRef.componentInstance.accept.subscribe((event: any) => {
            let indexString = index.toString();
            this.save(modalRef, 'delete', null, indexString, null);
            //this.refreshTable();
        });
    }

    public onIconButtonClick ($event: any) {
        var posIndex = this.currentPage * this.paginationData.size + $event.selectedItem;
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

    private fillForm (form: FormGroup, values: any, type: string) {
        let formKeys: string[] = Object.keys(form.controls);

        formKeys.forEach((key: string) => {
            form.controls[key].setValue(values[key]);
            // if (values[key] && form.get(key) && type === 'detail') {
            //   form.controls[key].disable();
            // }
        });
        // if (type === 'changeSuspend' && !form.controls['dateSuspension'].value) {
        //     var currentDate = new Date();
        //     var month = (currentDate.getMonth() + 1).toString();
        //     var day = currentDate.getDate().toString();
        //     month = month.length > 1 ? month : '0' + month;
        //     day = day.length > 1 ? day : '0' + day;
        //     form.controls['dateSuspension'].setValue(currentDate.getFullYear() + '-' + month + '-' + day);
        // }
    }

    private save (modalRef, type, newRow?, index?: string, editedRow?) {
        let repeated = false;
        let found = false;
        if (type != 'delete' && !this.currentModal.get('dateSuspension')) {
            // Controla si un medicamento ya existe para un tratamiento activo
            this.tableData.forEach((row) => {
                if (!row.dateSuspension && this.currentModal.controls.medicine && this.currentModal.controls.medicine.value.name === row.medicine.name) {
                    if (index && this.tableData.indexOf(row).toString() === index) {
                        // Salta si es él mismo
                    } else {
                        repeated = true;
                    }
                }
            });
            if (repeated) {
                this._notification.showErrorToast('duplicatedTreatment');
            }
        }
        if (!repeated) {
            if (type === 'create') {
                if (this.tableData.length === 0) this.tableData = [];
                this.tableData.push(newRow);
            }
            if (type === 'edit') {
                Object.keys(editedRow).forEach((key: string) => {
                    this.tableData[Number(index)][key] = editedRow[key];
                });
            }
            if (type === 'delete') {
                this.tableData.splice(Number(index), 1);
                this.paginationData.totalElements = this.tableData.length;
            }

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
                job: true,
            };

            this._formsService.fillForm(form).subscribe(
                () => {
                    if (type === 'create') {
                        this.paginationData.totalElements = this.tableData.length;
                        this._notification.showSuccessToast('elementCreated');
                    } else if (type === 'edit') {
                        this._notification.showSuccessToast('elementUpdated');
                    } else if (type === 'delete') {
                        this._notification.showSuccessToast('elementDeleted');
                    }
                    modalRef.close();
                    if (this.tableDataFilter.length === 0) this.ngOnInit();
                    else this.refreshTable();
                },
                ({ error }) => {
                    this._notification.showErrorToast(error.errorCode);
                }
            );
        }
    }

    public sortTableDefault () {
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

    public onSort (event: any) {
        this.typeOrder = event.direction;
        this.colOrder = event.column;
        this.refreshTable();
    }

    public selectPage (page: number): void {
        this.currentPage = page;
        this.refreshTable();
    }

    public selectItemsPerPage (number: number) {
        this.itemsPerPage = number;
        this.paginationData.size = number;
        this.selectPage(0);
    }

    public refreshTable () {
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

        this.addColorRow(this.tableData);
        this.tableDataFilter = this.tableData.map((x) => x);
        this.tableDataFilter = this.tableDataFilter.splice(this.currentPage * this.paginationData.size, this.paginationData.size);
    }

    private addColorRow (tableData) {
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
}
