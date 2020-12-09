import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FieldConfigModel} from '../../models/forms/field-config.model';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
  config: FieldConfigModel;
  group: FormGroup;
  optionSelected: boolean;
  required = false;

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

  /* TODO: Hay que revisar el value que recibimos del select para evitar una comprobación por string
   * y usar una comprobación por null o vacío.
   */
  onSelect(event): void {
    this.optionSelected = !event.target.value.startsWith('0: ');
  }
}
