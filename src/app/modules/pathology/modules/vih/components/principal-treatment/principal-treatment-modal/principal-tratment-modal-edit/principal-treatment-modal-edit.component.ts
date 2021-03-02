import { VihEditTreatmentModel, VihLineTreatment } from './../../../../models/vih-treatment.model';
import { Input, Output, EventEmitter, OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, tap, catchError } from 'rxjs/operators';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IndicationModel } from 'src/app/modules/management/models/indication/indication.model';
import { DoseModel } from 'src/app/modules/management/models/medicines/dose.model';
import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';
import { VihTreatmentModel } from '../../../../models/vih-treatment.model';
@Component({
    selector: 'app-principal-treatment-modal-edit',
    templateUrl: './principal-treatment-modal-edit.component.html',
    styleUrls: ['./principal-treatment-modal-edit.component.scss'],
})
export class PrincipalTreatmentModalEditComponent implements OnInit {
    @Input() indication: IndicationModel;
    @Input() patientId: string;
    @Input() treatment: VihTreatmentModel;
    @Input() lineTreatment: VihLineTreatment;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<VihEditTreatmentModel> = new EventEmitter();

    public title: string = 'editTreatment';
    public doseOptions: Array<{ id: string; name: string }>;
    public gesidaGuidelineOptions: Array<{ id: number; name: string }>;
    public regimeTarOptions: Array<{ id: number; name: string }>;
    public reasonChangeOptions: Array<{ id: number; name: string }>;
    public isOtherDoseSelected: boolean = false;
    public form: FormGroup;

    public gesidaGuidelineSelectedId;
    public doseSelectedId;
    public regimenTreatmentSelectedId;

    private originalMedicineId: number;

    constructor(private readonly _translate: TranslateService, private readonly _medicinesService: MedicinesServices, private readonly _notification: NotificationService, private readonly _formBuilder: FormBuilder) {}

    get validForm(): boolean {
        return this.form.valid;
    }

    ngOnInit(): void {
        this.fillSelectOptions();
        this.buildForm();
        if (this.lineTreatment.medicine) {
            this.originalMedicineId = this.lineTreatment.medicine.id;
            this.getDosesByMedicine(this.lineTreatment.medicine);
        }
    }
    private fillSelectOptions() {
        this.gesidaGuidelineOptions = [
            { id: 1, name: this._translate.instant('gesidaGuideline.preferenteStartGuideline') },
            { id: 2, name: this._translate.instant('gesidaGuideline.alternativeStartGuideline') },
            { id: 3, name: this._translate.instant('gesidaGuideline.recommendedChangeGuideline') },
            { id: 4, name: this._translate.instant('gesidaGuideline.otherGuidelineChange') },
        ];
        this.regimeTarOptions = [
            { id: 1, name: this._translate.instant('regimeTar.simplification') },
            { id: 2, name: this._translate.instant('regimeTar.standardScheme') },
            { id: 3, name: this._translate.instant('regimeTar.intensifiedScheme') },
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
    }

    private buildForm(): void {
        this.gesidaGuidelineSelectedId = this.gesidaGuidelineOptions.find((type: { id: number; name: string }) => type.name === this.lineTreatment.gesidaGuideline).id;
        this.regimenTreatmentSelectedId = this.regimeTarOptions.find((regimen: { id: number; name: string }) => regimen.name === this.treatment.regimen).id;

        this.form = this._formBuilder.group({
            gesidaGuideline: ['', Validators.required],
            reasonChange: [''],
            medicine: [this.lineTreatment.medicine ? { ...this.lineTreatment.medicine, name: this.lineTreatment.medicine?.description } : '', Validators.required],
            family: [this.lineTreatment.medicine?.family, Validators.required],
            atc: [this.lineTreatment.medicine?.codeAtc, Validators.required],
            cn: [this.lineTreatment.medicine?.nationalCode, Validators.required],
            tract: [this.lineTreatment.medicine?.viaAdministration, Validators.required],
            dose: [this.lineTreatment.dose, Validators.required],
            otherDosis: [this.lineTreatment.otherDose, this.requiredOtherDose.bind(this)],
            regimeTar: [this.lineTreatment.regimen, Validators.required],
            datePrescription: [this.lineTreatment.datePrescription, Validators.required],
            dateStart: [this.lineTreatment.initDate, Validators.required],
            expectedEndDate: [this.lineTreatment.expectedEndDate],
            observations: [this.lineTreatment.observations],
        });
    }

    public onSave() {
        if (this.validForm) {
            const treatmentData = this.form.value;
            const patientTreatment: VihEditTreatmentModel = {
                lineId: this.lineTreatment.lineId,
                patientTreatment: this.treatment.treatmentId,
                datePrescription: treatmentData.datePrescription ? new Date(treatmentData.datePrescription).toISOString() : '',
                expectedEndDate: treatmentData.expectedEndDate ? new Date(treatmentData.expectedEndDate).toISOString() : '',
                regimen: treatmentData.regimenTreatment?.name || treatmentData.regimenTreatment,
                medicine: treatmentData.medicine,
                dose: treatmentData.dose?.name || treatmentData.dose,
                initDate: treatmentData.dateStart ? new Date(treatmentData.dateStart).toISOString() : '',
                observations: treatmentData.observations,
                otherDose: treatmentData.otherDosis,
                hadMedicineChange: this.originalMedicineId !== treatmentData.medicine?.id,
                reason: treatmentData.reasonChange.name,
                modificationCount: this.lineTreatment.modificationCount,
                gesidaGuideline: treatmentData.gesidaGuideline?.name || treatmentData.gesidaGuideline,
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
        this.isOtherDoseSelected = this.lineTreatment.dose === 'Otra';
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
                this._medicinesService.getByText(`search=${term}`).pipe(
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
