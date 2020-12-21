import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormsService } from 'src/app/core/services/forms/forms.service';

@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
    config: FieldConfig;
    group: FormGroup;
    optionSelected: boolean;
    required = false;

    public options: Array<any>;

    constructor(private _formService: FormsService) {}

    ngOnInit() {
        this.options = [];
        this.hasRequiredField(this.group.controls[this.config.name]);
        if (this.config.options && this.config.options.length > 0) this.options = this.config.options;
        else if (this.config.endpoint)
            this._formService.callEndpoint(this.config.endpoint).subscribe((response) => {
                response.forEach((element) => {
                    this.options.push({ value: element.id, name: element.description });
                });
            });
        else this.options = [];
    }

    hasRequiredField(abstractControl: AbstractControl) {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }
    }

    /* TODO: Hay que revisar el value que recibimos del select para evitar una comprobación por string
     * y usar una comprobación por null o vacío.
     */
    onSelect(event): void {
        this.optionSelected = !event.target.value.startsWith('0: ');
    }
}
