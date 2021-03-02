import { NotificationService } from './../../../../../../../../core/services/notification.service';
import { MedicinesServices } from './../../../../../../../../core/services/medicines/medicines.services';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DoseModel } from './../../../../../../../management/models/medicines/dose.model';
import { MedicineModel } from './../../../../../../../management/models/medicines/medicines.model';
import { FormGroup, Validators, ValidationErrors, FormControl, FormBuilder } from '@angular/forms';
import { VihTreatmentModel } from './../../../../models/vih-treatment.model';
import { IndicationModel } from './../../../../../../../management/models/indication/indication.model';
import { Input, Output, EventEmitter, OnInit, Component } from '@angular/core';
import moment from 'moment';

@Component({
    selector: 'app-principal-treatment-modal-create',
    templateUrl: './principal-treatment-modal-create.component.html',
    styleUrls: ['./principal-treatment-modal-create.component.scss'],
})
export class PrincipalTreatmentModalCreateComponent implements OnInit {
    @Input() indication: IndicationModel;
    @Input() patientId: string;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<VihTreatmentModel> = new EventEmitter();

    public title: string = 'newTreatment';
    public doseOptions: Array<{ id: string; name: string }>;
    public gesidaGuidelineOptions: Array<{ id: number; name: string }>;
    public regimeTarOptions: Array<{ id: number; name: string }>;
    public regimenTreatmentOptions: Array<{ name: string }>;
    public isOtherDoseSelected: boolean = false;
    public form: FormGroup;

    constructor(private readonly _translate: TranslateService, private readonly _medicinesService: MedicinesServices, private readonly _notification: NotificationService, private readonly _formBuilder: FormBuilder) {}

    get validForm(): boolean {
        return this.form.valid;
    }

    ngOnInit(): void {
        this.fillSelectOptions();
        this.buildForm();
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
    }

    private buildForm(): void {
        this.form = this._formBuilder.group({
            medicine: ['', Validators.required],
            gesidaGuideline: ['', Validators.required],
            regimeTar: ['', Validators.required],

            family: ['', Validators.required],
            atc: ['', Validators.required],
            cn: ['', Validators.required],
            tract: ['', Validators.required],
            dose: ['', Validators.required],
            otherDosis: ['', this.requiredOtherDose.bind(this)],
            datePrescription: [moment().format('YYYY-MM-DD'), Validators.required],
            expectedEndDate: [''],
            dateStart: [moment().format('YYYY-MM-DD'), Validators.required],
            observations: [''],
        });
    }

    public onSave() {
        if (this.validForm) {
            const treatmentData = this.form.value;
            const patientTreatment: VihTreatmentModel = {
                datePrescription: treatmentData.datePrescription ? new Date(treatmentData.datePrescription).toISOString() : '',
                expectedEndDate: treatmentData.expectedEndDate ? new Date(treatmentData.expectedEndDate).toISOString() : '',
                patientDiagnose: { patient: { id: this.patientId } },
                regimen: treatmentData.regimeTar?.name,
                active: true,
                medicine: treatmentData.medicine,
                dose: treatmentData.dose?.name,
                initDate: treatmentData.dateStart ? new Date(treatmentData.dateStart).toISOString() : '',
                observations: treatmentData.observations,
                otherDose: treatmentData.otherDosis,
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

        /*  this._medicinesService.getDosesByMedicine(`medicineId=${medicine.id}`).subscribe(
            (doses: DoseModel[]) => this.setDoses(doses),
            (error) => this._notification.showErrorToast('Ha ocurrido un error recuperando las dosis')
        );*/
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
    }

    private resetFields(keys: any[]) {
        keys.forEach((key) => {
            this.form.get(key).reset();
        });
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
                    tap((data: Array<any>) => {
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
