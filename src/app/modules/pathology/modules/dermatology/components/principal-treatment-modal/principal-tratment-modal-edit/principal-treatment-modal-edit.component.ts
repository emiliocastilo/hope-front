import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { DermaTreatmentModel, EditTreatmentModel, LineTreatment } from '../../../models/derma-treatment.model';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, tap, catchError } from 'rxjs/operators';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IndicationModel } from 'src/app/modules/management/models/indication/indication.model';
import { DoseModel } from 'src/app/modules/management/models/medicines/dose.model';
import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';

enum TREATMENT_TYPE {
    BIOLOGICO = 'BIOLOGICO',
    QUIMICO = 'QUIMICO',
    TOPICO = 'TOPICO',
}

@Component({
    selector: 'app-principal-treatment-modal-edit',
    templateUrl: './principal-treatment-modal-edit.component.html',
    styleUrls: ['./principal-treatment-modal-edit.component.scss'],
})
export class PrincipalTreatmentModalEditComponent implements OnInit {
    @Input() indication: IndicationModel;
    @Input() patientId: string;
    @Input() treatment: DermaTreatmentModel;
    @Input() lineTreatment: LineTreatment;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<EditTreatmentModel> = new EventEmitter();

    public title: string = 'editTreatment';
    public treatmentTypeOptions: Array<{ id: TREATMENT_TYPE; name: string }>;
    public doseOptions: Array<{ id: string; name: string }>;
    public reasonChangeOptions: Array<{ id: number; name: string }>;
    public regimenTreatmentOptions: Array<{ id: number; name: string }>;
    public isFormulaMagistral: boolean = false;
    public isOtherDoseSelected: boolean = false;
    public form: FormGroup;

    public treatmentTypeSelectedId;
    public doseSelectedId;
    public regimenTreatmentSelectedId;

    private originalMedicineId: number;

    constructor(private readonly _translate: TranslateService, private readonly _medicinesService: MedicinesServices, private readonly _notification: NotificationService, private readonly _formBuilder: FormBuilder) {}

    get validForm(): boolean {
        return this.form.valid;
    }

    ngOnInit(): void {
        this.treatmentTypeOptions = [
            { id: TREATMENT_TYPE.BIOLOGICO, name: this._translate.instant('biological') },
            { id: TREATMENT_TYPE.QUIMICO, name: this._translate.instant('chemical') },
            { id: TREATMENT_TYPE.TOPICO, name: this._translate.instant('topical') },
        ];
        this.reasonChangeOptions = [
            { id: 0, name: this._translate.instant('reasonSuspensionList.motive1') },
            { id: 1, name: this._translate.instant('reasonSuspensionList.motive2') },
            { id: 2, name: this._translate.instant('reasonSuspensionList.motive3') },
            { id: 3, name: this._translate.instant('reasonSuspensionList.motive4') },
            { id: 4, name: this._translate.instant('reasonSuspensionList.motive5') },
            { id: 5, name: this._translate.instant('reasonSuspensionList.motive6') },
            { id: 6, name: this._translate.instant('reasonSuspensionList.motive7') },
            { id: 7, name: this._translate.instant('reasonSuspensionList.motive8') },
            { id: 8, name: this._translate.instant('reasonSuspensionList.motive9') },
            { id: 9, name: this._translate.instant('reasonSuspensionList.motive10') },
        ];
        this.regimenTreatmentOptions = [
            { id: 1, name: this._translate.instant('intensificada') },
            { id: 2, name: this._translate.instant('standard') },
            { id: 3, name: this._translate.instant('reduced') },
        ];
        this.buildForm();
        if (this.lineTreatment.medicine) {
            this.originalMedicineId = this.lineTreatment.medicine.id;
            this.getDosesByMedicine(this.lineTreatment.medicine);
        }
    }

    private buildForm(): void {
        const treatmentTypeSelected = this.treatmentTypeOptions.find((type: { id: string; name: string }) => type.id.toUpperCase() === this.lineTreatment.type);
        this.treatmentTypeSelectedId = treatmentTypeSelected.id;
        this.regimenTreatmentSelectedId = this.regimenTreatmentOptions.find((regimen: { id: number; name: string }) => regimen.name === this.treatment.regimen).id;
        let opcionBiologica: string = '';

        if (this.lineTreatment.type === TREATMENT_TYPE.TOPICO) {
            this.isFormulaMagistral = !this.lineTreatment.medicine;
            opcionBiologica = this.isFormulaMagistral ? 'opcionFormulaMagistral' : 'opcionMedicamento';
        }
        this.form = this._formBuilder.group({
            reasonChange: [''],
            indication: [this.indication.description, Validators.required],
            specialIndication: [this.treatment.specialIndication],
            bigPsychologicalImpact: [this.treatment.psychologicalImpact],
            visibleInjury: [this.treatment.visibleInjury],
            others: [this.treatment.other],
            treatmentType: [treatmentTypeSelected, Validators.required],
            opcionMedicamento: [''],
            opcionFormulaMagistral: [''],
            opcionBiologica: [opcionBiologica],
            medicine: [this.lineTreatment.medicine ? { ...this.lineTreatment.medicine, name: this.lineTreatment.medicine?.description } : '', this.requiredIfNotFormulaMagistral.bind(this)],
            family: [this.lineTreatment.medicine?.family, this.requiredIfNotFormulaMagistral.bind(this)],
            atc: [this.lineTreatment.medicine?.codeAtc, this.requiredIfNotFormulaMagistral.bind(this)],
            cn: [this.lineTreatment.medicine?.nationalCode, this.requiredIfNotFormulaMagistral.bind(this)],
            tract: [this.lineTreatment.medicine?.viaAdministration, this.requiredIfNotFormulaMagistral.bind(this)],
            descripcionFormulaMagistral: [this.treatment.masterFormula, this.requiredIfFormulaMagistral.bind(this)],
            dosisFormulaMagistral: [this.treatment.masterFormulaDose],
            dose: [this.treatment.dose, this.requiredIfNotFormulaMagistral.bind(this)],
            otherDosis: [this.treatment.otherDose, this.requiredOtherDose.bind(this)],
            regimenTreatment: [this.treatment.regimen, Validators.required],
            datePrescription: [this.treatment.datePrescription, Validators.required],
            dateStart: [this.treatment.initDate, Validators.required],
            expectedEndDate: [this.treatment.expectedEndDate],
            observations: [this.treatment.observations],
            treatmentContinue: [this.treatment.treatmentContinue],
            treatmentPulsatil: [this.treatment.pulsatileTreatment],
        });
    }

    public onSave() {
        if (this.validForm) {
            const treatmentData = this.form.value;
            const patientTreatment: EditTreatmentModel = {
                lineId: this.lineTreatment.lineId,
                patientTreatment: this.treatment.treatmentId,
                datePrescription: treatmentData.datePrescription ? new Date(treatmentData.datePrescription).toISOString() : '',
                expectedEndDate: treatmentData.expectedEndDate ? new Date(treatmentData.expectedEndDate).toISOString() : '',
                type: treatmentData.treatmentType.id,
                regimen: treatmentData.regimenTreatment?.name,
                medicine: treatmentData.medicine,
                dose: treatmentData.dose?.name,
                masterFormula: treatmentData.descripcionFormulaMagistral,
                masterFormulaDose: treatmentData.dosisFormulaMagistral,
                initDate: treatmentData.dateStart ? new Date(treatmentData.dateStart).toISOString() : '',
                psychologicalImpact: treatmentData.bigPsychologicalImpact,
                observations: treatmentData.observations,
                otherDose: treatmentData.otherDosis,
                treatmentContinue: treatmentData.treatmentContinue,
                visibleInjury: treatmentData.visibleInjury,
                pulsatileTreatment: treatmentData.treatmentPulsatil,
                other: treatmentData.others,
                hadMedicineChange: this.originalMedicineId !== treatmentData.medicine?.id,
                reason: treatmentData.reasonChange.name,
                modificationCount: this.lineTreatment.modificationCount,
                specialIndication: treatmentData.specialIndication,
            };

            this.save.emit(patientTreatment);
        }
    }

    public onClose() {
        this.cancel.emit(null);
    }

    public getInvalidLabel(formKey: string): string {
        const errors = this.form ? this.form.get(formKey).errors : undefined;
        const label = errors ? Object.keys(errors).filter((key: string) => errors[key]) : undefined;
        return label ? `form.validate.${label[0]}` : 'form.validate.required';
    }

    public onSelectTreatmentType(treatmentSelected: { id: TREATMENT_TYPE; name: string }): void {
        if (treatmentSelected.id === TREATMENT_TYPE.BIOLOGICO || treatmentSelected.id === TREATMENT_TYPE.QUIMICO || treatmentSelected.id === TREATMENT_TYPE.TOPICO) {
            this.form.get('opcionMedicamento').setValue('opcionMedicamento');
            this.resetFields(['family', 'atc', 'cn', 'tract', 'medicine', 'descripcionFormulaMagistral', 'dosisFormulaMagistral']);
        }
        this.isFormulaMagistral = false;
    }

    public onSelectMedicine(medicine: MedicineModel): void {
        this.doseOptions = [];
        this.form.controls.family.setValue(medicine.family);
        this.form.controls.atc.setValue(medicine.codeAtc);
        this.form.controls.cn.setValue(medicine.nationalCode);
        this.form.controls.tract.setValue(medicine.viaAdministration);
        this.form.controls.dose.reset();

        this.getDosesByMedicine(medicine);
    }

    private getDosesByMedicine(medicine: MedicineModel) {
        this._medicinesService.getDosesByMedicine(`medicineId=${medicine.id}`).subscribe(
            (doses: DoseModel[]) => this.setDoses(doses),
            (error) => this._notification.showErrorToast('Ha ocurrido un error recuperando las dosis')
        );
    }

    public onDoseSelect(event: any) {
        this.isOtherDoseSelected = event && event.name === 'Otra';
        this.form.get('otherDosis').updateValueAndValidity();
    }

    private setDoses(doses: DoseModel[]) {
        const comboData = [];
        doses.forEach((element: DoseModel, i: number) => comboData.push({ id: i, name: `${element.description} ${element.doseIndicated ? '(' + element.doseIndicated + ')' : ''}` }));
        comboData.push({ id: doses.length + 1, name: 'Otra' });
        this.doseOptions = comboData;
        this.doseSelectedId = comboData.find((doseSelectedItem: { id: string; name: string }) => doseSelectedItem.name === this.lineTreatment.dose)?.id ?? null;
    }

    public isTreatmentTopicSelected(): boolean {
        return this.form.get('treatmentType')?.value?.id === TREATMENT_TYPE.TOPICO;
    }

    public setRadioValues(key: string) {
        if (key === 'opcionFormulaMagistral') {
            this.form.get('opcionFormulaMagistral').setValue(key);
            this.form.get('opcionMedicamento').setValue('');
            this.isFormulaMagistral = true;
            this.resetFields(['family', 'atc', 'cn', 'tract', 'medicine', 'dose', 'otherDosis']);
        } else if (key === 'opcionMedicamento') {
            this.form.get('opcionFormulaMagistral').setValue('');
            this.form.get('opcionMedicamento').setValue(key);
            this.isFormulaMagistral = false;
            this.resetFields(['descripcionFormulaMagistral', 'dosisFormulaMagistral']);
        }
    }

    private resetFields(keys: any[]) {
        keys.forEach((key) => {
            this.form.get(key).reset();
        });
    }

    private requiredIfNotFormulaMagistral(formControl: FormControl): ValidationErrors {
        let errors: ValidationErrors = null;
        if (!this.isFormulaMagistral && !formControl.value) {
            errors = { required: true };
        }
        return errors;
    }
    private requiredIfFormulaMagistral(formControl: FormControl): ValidationErrors {
        let errors: ValidationErrors = null;
        if (this.isFormulaMagistral && !formControl.value) {
            errors = { required: true };
        }
        return errors;
    }

    private requiredOtherDose(formControl: FormControl): ValidationErrors {
        let errors: ValidationErrors = null;
        if (this.isOtherDoseSelected && !formControl.value) {
            errors = { required: true };
        }
        return errors;
    }

    search = (text$: Observable<string>) => {
        return text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap((term) =>
                this._medicinesService
                    .getByText(
                        `search=${term}&treatmentType=${
                            this.form.get('treatmentType').value.id ? this.form.get('treatmentType').value.id : this.form.get('treatmentType').value[0]?.id ? this.form.get('treatmentType').value[0].id : this.form.get('treatmentType').value
                        }`
                    )
                    .pipe(
                        map((response: any) => {
                            return response.content;
                        }),
                        tap((data) => {
                            data.forEach((element) => (element.name = element.description));
                        }),
                        catchError(() => {
                            return of([]);
                        })
                    )
            )
        );
    };

    formatter = (state) => state.name;
}
