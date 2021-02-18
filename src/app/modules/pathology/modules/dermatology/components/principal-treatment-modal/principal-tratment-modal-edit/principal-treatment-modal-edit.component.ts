import { MedicineModel } from '../../../../../../management/models/medicines/medicines.model';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, Validator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, tap, catchError } from 'rxjs/operators';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { DoseModel } from 'src/app/modules/management/models/medicines/dose.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DermaTreatmentModel } from '../../../models/derma-treatment.model';

enum TREATMENT_TYPE {
    BIOLOGICO = 'BIOLOGICO',
    QUIMICO = 'QUIMICO',
    TOPICO = 'TOPICO',
}

@Component({
    selector: 'app-principal-treatment-modal',
    templateUrl: './principal-treatment-modal-edit.component.html',
    styleUrls: ['./principal-treatment-modal-edit.component.scss'],
})
export class PrincipalTreatmentModalEditComponent implements OnInit {
    @Input() indication: string;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<DermaTreatmentModel> = new EventEmitter();

    public title: string = 'newTreatment';
    public treatmentTypeOptions: Array<{ id: TREATMENT_TYPE; name: string }>;
    public doseOptions: Array<{ id: string; name: string }>;
    public regimenTreatmentOptions: Array<{ name: string }>;
    public isFormulaMagistral: boolean = false;
    public form: FormGroup;

    constructor(private readonly _translate: TranslateService, private readonly _medicinesService: MedicinesServices, private readonly _notification: NotificationService, private readonly _formBuilder: FormBuilder) {}

    get validForm(): boolean {
        return this.form.valid;
    }

    ngOnInit(): void {
        this.buildForm();
        this.treatmentTypeOptions = [
            { id: TREATMENT_TYPE.BIOLOGICO, name: this._translate.instant('biological') },
            { id: TREATMENT_TYPE.QUIMICO, name: this._translate.instant('chemical') },
            { id: TREATMENT_TYPE.TOPICO, name: this._translate.instant('topical') },
        ];
        this.regimenTreatmentOptions = [{ name: this._translate.instant('intensificada') }, { name: this._translate.instant('standard') }, { name: this._translate.instant('reduced') }];
        this.form.get('indication').setValue(this.indication);
    }

    private buildForm(): void {
        this.form = this._formBuilder.group({
            indication: ['', Validators.required],
            specialIndication: [false],
            bigPsychologicalImpact: [false],
            visibleInjury: [false],
            others: [''],
            treatmentType: ['', Validators.required],
            opcionMedicamento: [''],
            opcionFormulaMagistral: [''],
            medicine: ['', this.requiredIfNotFormulaMagistral.bind(this)],
            family: ['', this.requiredIfNotFormulaMagistral.bind(this)],
            atc: ['', this.requiredIfNotFormulaMagistral.bind(this)],
            cn: ['', this.requiredIfNotFormulaMagistral.bind(this)],
            tract: ['', this.requiredIfNotFormulaMagistral.bind(this)],
            descripcionFormulaMagistral: ['', this.requiredIfFormulaMagistral.bind(this)],
            dosisFormulaMagistral: [''],
            dose: ['', this.requiredIfNotFormulaMagistral.bind(this)],
            otherDosis: [''],
            regimenTreatment: ['', Validators.required],
            datePrescription: ['', Validators.required],
            dateStart: ['', Validators.required],
            expectedEndDate: [''],
            observations: [''],
            treatmentContinue: [false],
            treatmentPulsatil: [false],
        });
    }

    public onSave() {
        if (this.validForm) {
            this.save.emit(this.form.value);
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
        this.form.controls.act.setValue(medicine.codeAtc);
        this.form.controls.cn.setValue(medicine.nationalCode);
        this.form.controls.tract.setValue(medicine.viaAdministration);

        this._medicinesService.getDosesByMedicine(`medicineId=${medicine.id}`).subscribe(
            (doses: DoseModel[]) => this.setDoses(doses),
            (error) => this._notification.showErrorToast('Ha ocurrido un error recuperando las dosis')
        );
    }

    public onDoseSelect(event: any) {
        if (event && event.name === 'Otra') this.form.controls.otherDosis.setValidators(Validators.required);
        else {
            this.form.controls.otherDosis.clearValidators();
            this.form.controls.otherDosis.setValue('');
        }

        this.form.controls.regimenTreatment.setValue({ name: this._translate.instant('standard') });
    }

    private setDoses(doses: DoseModel[]) {
        const comboData = [];
        doses.forEach((element: DoseModel, i: number) => comboData.push({ id: i, name: `${element.description} ${element.doseIndicated ? '(' + element.doseIndicated + ')' : ''}` }));
        comboData.push({ id: doses.length + 1, name: 'Otra' });
        this.doseOptions = comboData;
    }

    public isTreatmentTopicSelected(): boolean {
        return this.form.get('treatmentType')?.value.id === TREATMENT_TYPE.TOPICO;
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
        this.form.updateValueAndValidity();
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
