import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FieldConfigModel} from '../../models/forms/field-config.model';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
})
export class FormCheckboxComponent implements OnInit {
  config: FieldConfigModel;
  group: FormGroup;
  required: boolean;
  constructor() {
    this.required = false;
  }
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

  switch() {
    this.config.value = !this.config.value;
  }
}
