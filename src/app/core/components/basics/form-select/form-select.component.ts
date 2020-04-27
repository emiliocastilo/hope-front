import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent {
  config: FieldConfig;
  group: FormGroup;
}
