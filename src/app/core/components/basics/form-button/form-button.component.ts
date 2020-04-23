import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.sass']
})
export class FormButtonComponent {
  config: FieldConfig;
  group: FormGroup;
}
