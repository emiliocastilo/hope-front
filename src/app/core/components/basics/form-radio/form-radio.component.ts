import { Component } from '@angular/core';
import { FieldConfigModel} from '../../models/forms/field-config.model';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
})
export class FormRadioComponent {
  config: FieldConfigModel;
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
