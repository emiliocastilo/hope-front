import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup, FormArray } from '@angular/forms';
import moment from 'moment';

@Component({
    selector: 'app-form-historic',
    templateUrl: './form-historic.component.html',
    styleUrls: ['./form-historic.component.scss'],
})
export class FormHistoricComponent implements OnInit {
    config: FieldConfig;
    group: FormGroup;
    oldValue: any;
    historicField: any;
    selectedDate: string;
    today: string;

    constructor() { }

    ngOnInit (): void {
        this.checkIfDate();
        if (this.config.historic && this.config.historic.length > 0) {
            this.recoverHistoric();
        }
    }

    checkIfDate () {
        if (this.config.name.includes('date')) {
            this.today = moment(new Date()).format('YYYY-MM-DD');
            this.onChange({target: { value: this.today }}, this.config.name);
        }
    }

    recoverHistoric () {
        setTimeout(() => {
            const control = this.group.controls[this.config.name] as FormArray;
            control.removeAt(0);
            this.config.historic.forEach((e) => {
                this.group.controls[this.config.name].value.push(e);
            });
        }, 1000);
        this.oldValue = this.config.historic && this.config.historic.length > 0 ? (this.config.historic[this.config.historic.length - 1] ? this.config.historic[this.config.historic.length - 1].value : '') : '';
    }

    bindToForm (field: any) {
        if (!this.oldValue) {
            const control = this.group.controls[this.config.name] as FormArray;
            control.removeAt(0);
        }
        field = { ...field, date: localStorage.getItem('historicDate') };
        this.group.controls[this.config.name].value.push(field);
    }

    onChange (event: any, name: string) {
        const isFieldDate = name.includes('date');
        if (isFieldDate) {
            this.onSelectDate(event);
        }
        this.bindToForm({
            date: localStorage.getItem('historicDate'),
            value: isFieldDate ? new Date(event.target.value).toLocaleDateString() : event.target.value,
        });
    }

    onSelectDate (event: any) {
        this.selectedDate = new Date(event.target.value).toISOString();
        localStorage.setItem('historicDate', this.selectedDate);
    }
}
