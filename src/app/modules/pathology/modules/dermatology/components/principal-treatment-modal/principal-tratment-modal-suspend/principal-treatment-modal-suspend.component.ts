import { LineTreatment, SuspendTreatmentModel } from './../../../models/derma-treatment.model';
import { Indication } from './../../../../../../dashboard/components/treatments/treatments-patients/treatments-patients.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { DermaTreatmentModel } from '../../../models/derma-treatment.model';
import moment from 'moment';

enum TREATMENT_TYPE {
    BIOLOGICO = 'BIOLOGICO',
    QUIMICO = 'QUIMICO',
    TOPICO = 'TOPICO',
}

@Component({
    selector: 'app-principal-treatment-modal-suspend',
    templateUrl: './principal-treatment-modal-suspend.component.html',
    styleUrls: ['./principal-treatment-modal-suspend.component.scss'],
})
export class PrincipalTreatmentModalSuspendComponent implements OnInit {
    @Input() indication: string;
    @Input() treatment: DermaTreatmentModel;
    @Input() lineTreatment: LineTreatment;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() suspend: EventEmitter<SuspendTreatmentModel> = new EventEmitter();

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
        this.isFormulaMagistral = this.treatment.masterFormula !== null;

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
    }

    private buildForm(): void {
        this.form = this._formBuilder.group({
            reasonSuspension: ['', Validators.required],
            medicine: [this.lineTreatment.medicine?.description, this.requiredIfNotFormulaMagistral.bind(this)],
            family: [this.lineTreatment.medicine?.family, this.requiredIfNotFormulaMagistral.bind(this)],
            atc: [this.lineTreatment.medicine?.codeAtc, this.requiredIfNotFormulaMagistral.bind(this)],
            cn: [this.lineTreatment.medicine?.nationalCode, this.requiredIfNotFormulaMagistral.bind(this)],
            tract: [this.lineTreatment.medicine?.viaAdministration, this.requiredIfNotFormulaMagistral.bind(this)],
            dose: [this.treatment.dose, this.requiredIfNotFormulaMagistral.bind(this)],
            otherDosis: [this.treatment.otherDose],
            regimenTreatment: [this.treatment.regimen, Validators.required],
            dateSuspension: [moment().format('yyyy-MM-DD')],
            descripcionFormulaMagistral: [this.treatment.masterFormula, this.requiredIfFormulaMagistral.bind(this)],
            dosisFormulaMagistral: [this.treatment.masterFormulaDose],
            opcionMedicamento: [''],
            opcionFormulaMagistral: [''],
        });
    }

    public onSave() {
        if (this.validForm) {
            const suspendTreatment: SuspendTreatmentModel = {
                lineId: this.lineTreatment.lineId,
                reason: this.form.value.reasonSuspension.name,
                suspensionDate: new Date(this.form.value.dateSuspension).toISOString(),
            };
            this.suspend.emit(suspendTreatment);
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
