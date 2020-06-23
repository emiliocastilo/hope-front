import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss'],
})
export class FormDatepickerComponent {
  @Input() type = 'date';
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
