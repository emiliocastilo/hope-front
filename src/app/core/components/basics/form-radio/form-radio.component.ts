import { Component } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss']
})
export class FormRadioComponent {
  config: FieldConfig;
  group: FormGroup;
}

