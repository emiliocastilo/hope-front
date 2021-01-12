import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() update: EventEmitter<any> = new EventEmitter();
    @Output() selectDose: EventEmitter<any> = new EventEmitter();
    @Output() selectTreatmentType: EventEmitter<any> = new EventEmitter();
    @Output() selectTopicalType: EventEmitter<any> = new EventEmitter();

    public showRequiredLegend: boolean = false;
    public selectOptions = {
        treatmentType: [
            { id: 'BIOLOGICO', name: this._translate.instant('biological') },
            { id: 'QUIMICO', name: this._translate.instant('chemical') },
            { id: 'TOPICO', name: this._translate.instant('topical') },
        ],
        doses: [],
        regimes: [
            { name: this._translate.instant('intensificada') },
            { name: this._translate.instant('standard') },
            { name: this._translate.instant('reduced') },
        ]
    };

    constructor(
        private _translate: TranslateService,
        private _medicinesService: MedicinesServices,
        private _notification: NotificationService
    ) { }

    get validForm (): boolean {
        return this.form.valid;
    }

    ngOnInit (): void {
        console.log(this.form);
        // this.showRequiredLegend = this.checkIfThereRequiredField();
    }

    private getDoses (medicineId: string) {
        from(this._medicinesService.getDosesByMedicine(`medicineId=${medicineId}`)).subscribe(
            (data: any) => {
                console.log(data);
                data.forEach(element => element.name = element.description);
                data.push({ name: 'Otra' });
                this.selectOptions.doses = data;
            }, error => this._notification.showErrorToast(error.errorCode)
        )
    }

    public onSelectInputTypeahead (event) {
        this.selectOptions.doses = [];
        console.log(event);
        this.form.controls.family.setValue(event.family);
        this.form.controls.atc.setValue(event.codeAct);
        this.form.controls.cn.setValue(event.nationalCode);
        this.form.controls.tract.setValue(event.viaAdministration);
        this.getDoses(event.id);
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

    public medicineChange (event) {
        console.log(event);
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
