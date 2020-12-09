import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import moment from 'moment';

@Component({
    selector: 'app-form-datepicker',
    templateUrl: './form-datepicker.component.html',
    styleUrls: ['./form-datepicker.component.scss'],
})
export class FormDatepickerComponent implements OnInit {
    @Input() type = 'date';
    config: FieldConfig;
    group: FormGroup;
    required = false;
    public minDate: string;
    public maxDate: string;

    ngOnInit() {
        this.min();
        this.max();
        this.hasRequiredField(this.group.controls[this.config.name]);
    }

    max() {
        if (this.config.max === 'today') {
            this.maxDate = moment(new Date()).format('YYYY-MM-DD');
        } else {
            this.maxDate = this.config.max;
        }
    }

    min() {
        if (this.config.min === 'today') {
            this.minDate = moment(new Date()).format('YYYY-MM-DD');
        } else {
            this.minDate = this.config.min;
        }
    }
    hasRequiredField(abstractControl: AbstractControl) {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }
    }
}
