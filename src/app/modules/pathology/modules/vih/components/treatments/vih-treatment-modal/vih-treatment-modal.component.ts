import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';

@Component({
    selector: 'app-vih-treatment-modal',
    templateUrl: './vih-treatment-modal.component.html',
    styleUrls: ['./vih-treatment-modal.component.scss']
})
export class VIHTreatmentModalComponent implements OnInit {
    @Input() type: string;
    @Input() title: string;
    @Input() form: FormGroup;
    @Input() options: any[];
    @Input() selectOptions = {
        treatmentType: [{ id: 'QUIMICO', name: this._translate.instant('chemical') }],
        doses: [],
        regimes: [
            { id: 1, name: this._translate.instant('intensificada') },
            { id: 2, name: this._translate.instant('standard') },
            { id: 3, name: this._translate.instant('reduced') },
        ]
    };
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() update: EventEmitter<any> = new EventEmitter();
    @Output() selectDose: EventEmitter<any> = new EventEmitter();
    @Output() selectTreatmentType: EventEmitter<any> = new EventEmitter();
    @Output() selectTopicalType: EventEmitter<any> = new EventEmitter();

    public showRequiredLegend: boolean = false;

    constructor(
        private _medicinesService: MedicinesServices,
        private _notification: NotificationService,
        private _translate: TranslateService,
    ) { }

    get validForm (): boolean {
        return this.form.valid;
    }

    ngOnInit (): void {
        console.log(this.form.value);
        if (this.type === 'edit') this.getDoses(this.form.controls.medicine.value.id);
    }

    private getDoses (medicineId: number) {
        from(this._medicinesService.getDosesByMedicine(`medicineId=${medicineId}`)).subscribe(
            (data: any) => {
                data.forEach(element => element.name = element.description);
                data.push({ id: 0, name: 'Otra' });
                this.selectOptions.doses = data;
            }, error => this._notification.showErrorToast(error.errorCode)
        )
    }

    private resetFields (keys: any[]) {
        keys.forEach((key) => {
            this.form.get(key).reset('');
        });
    }

    public onSelectInputTypeahead (med: MedicineModel) {
        this.selectOptions.doses = [];
        this.form.controls.family.setValue(med.family);
        this.form.controls.atc.setValue(med.codeAct);
        this.form.controls.cn.setValue(med.nationalCode);
        this.form.controls.tract.setValue(med.viaAdministration);
        this.getDoses(med.id);
    }

    formatter = (state) => state.name;

    search = (text$: Observable<string>) => {
        return text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap((term) =>
                this._medicinesService.getByText(`search=${term}&family=QUIMICO`)
                    .pipe(
                        map((response: any) => {
                            return response.content;
                        }),
                        tap((data) => {
                            data.forEach((element) => element.name = element.description);
                        }),
                        catchError(() => {
                            return of([]);
                        })
                    )
            )
        );
    };

    public doseChange (event) {
        if (event.name === 'Otra') {
            this.form.controls.otherDosis.setValidators(Validators.required);
        } else {
            this.form.controls.otherDosis.clearValidators();
            this.form.controls.otherDosis.reset('');
            this.form.controls.regimenTreatment.setValue({ id: 2, name: this._translate.instant('standard') });
        }
    }

    public onSave () {
        if (this.validForm) {
            this.save.emit(this.form);
        }
    }

    public onUpdate () {
        if (this.validForm) {
            this.update.emit(this.form);
        }
    }

    public onClose () {
        this.cancel.emit(null);
    }

    public isDisabled (formKey) {
        if (this.type === 'changeSuspend') {
            return ['medicine', 'family', 'atc', 'cn', 'tract', 'indication'].indexOf(formKey) > -1;
        } else {
            return ['family', 'atc', 'cn', 'tract', 'indication'].indexOf(formKey) > -1;
        }
    }

}
