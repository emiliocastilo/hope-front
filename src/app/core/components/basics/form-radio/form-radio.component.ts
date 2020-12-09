import { Component } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-form-radio',
    templateUrl: './form-radio.component.html',
    styleUrls: ['./form-radio.component.scss'],
})
export class FormRadioComponent {
    config: FieldConfig;
    group: FormGroup;
    required: boolean = false;

    ngOnInit() {
        this.hasRequiredField(this.group.controls[this.config.name]);
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
