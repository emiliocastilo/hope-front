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
    templateUrl: './principal-treatment-modal-suspend.component.html',
    styleUrls: ['./principal-treatment-modal-suspend.component.scss'],
})
export class PrincipalTreatmentModalSuspendComponent implements OnInit {
    @Input() indication: string;
    @Input() treatment: DermaTreatmentModel;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<DermaTreatmentModel> = new EventEmitter();

    public title: string = 'suspendTreatment';
    public isFormulaMagistral: boolean = false;
    public reasonSuspensionOptions: Array<{ id: number; name: string }> = [];
    public form: FormGroup;

    constructor(private readonly _formBuilder: FormBuilder, private readonly _translate: TranslateService) {}

    get validForm(): boolean {
        return this.form.valid;
    }

    ngOnInit(): void {
        this.buildForm();
        this.isFormulaMagistral = this.treatment.masterFormula !== '';

        this.reasonSuspensionOptions = [
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
        this.form.get('indication').setValue(this.indication);
    }

    private buildForm(): void {
        this.form = this._formBuilder.group({
            reasonSuspension: ['', Validators.required],
            medicine: [this.treatment.medicine?.name, this.requiredIfNotFormulaMagistral.bind(this)],
            family: [this.treatment.medicine?.family, this.requiredIfNotFormulaMagistral.bind(this)],
            atc: [this.treatment.medicine?.codeAtc, this.requiredIfNotFormulaMagistral.bind(this)],
            cn: [this.treatment.medicine?.nationalCode, this.requiredIfNotFormulaMagistral.bind(this)],
            tract: [this.treatment.medicine?.viaAdministration, this.requiredIfNotFormulaMagistral.bind(this)],
            dose: [this.treatment.dose, this.requiredIfNotFormulaMagistral.bind(this)],
            otherDosis: [this.treatment.otherDose],
            regimenTreatment: [this.treatment.regimen, Validators.required],
            dateSuspension: [new Date()],
            descripcionFormulaMagistral: [this.treatment.masterFormula, this.requiredIfFormulaMagistral.bind(this)],
            dosisFormulaMagistral: [this.treatment.masterFormulaDose],
            opcionMedicamento: [''],
            opcionFormulaMagistral: [''],
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
}
