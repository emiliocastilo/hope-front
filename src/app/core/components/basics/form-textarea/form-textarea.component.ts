import { Component, Input, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form-textarea',
    templateUrl: './form-textarea.component.html',
    styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextareaComponent implements OnInit {
    config: FieldConfig;
    group: FormGroup;
    rows: number;
    required: boolean = false;

    ngOnInit () {
        this.hasRequiredField(this.group.controls[this.config.name]);
        this.rows = this.config ? this.config.rows : 1;
    }

    hasRequiredField (abstractControl: AbstractControl) {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }
    }

    removeMutation (index: number) {
        this.group.controls.mutationsAdd.value.splice(index, 1);
    }
}
