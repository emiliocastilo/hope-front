import { Input, Output, EventEmitter, OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { LineTreatment, SuspendTreatmentModel } from 'src/app/modules/pathology/modules/dermatology/models/derma-treatment.model';
import { VihTreatmentModel } from '../../../../models/vih-treatment.model';

@Component({
    selector: 'app-principal-treatment-modal-suspend',
    templateUrl: './principal-treatment-modal-suspend.component.html',
    styleUrls: ['./principal-treatment-modal-suspend.component.scss'],
})
export class PrincipalTreatmentModalSuspendComponent implements OnInit {
    @Input() treatment: VihTreatmentModel;
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
            medicine: [this.lineTreatment.medicine?.description, Validators.required],
            family: [this.lineTreatment.medicine?.family, Validators.required],
            atc: [this.lineTreatment.medicine?.codeAtc, Validators.required],
            cn: [this.lineTreatment.medicine?.nationalCode, Validators.required],
            tract: [this.lineTreatment.medicine?.viaAdministration, Validators.required],
            dose: [this.lineTreatment.dose, Validators.required],
            otherDosis: [this.lineTreatment.otherDose],
            regimenTreatment: [this.lineTreatment.regimen, Validators.required],
            dateSuspension: [moment().format('yyyy-MM-DD')],
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
}
