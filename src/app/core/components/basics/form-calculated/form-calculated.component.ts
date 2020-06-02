import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-form-calculated',
  templateUrl: './form-calculated.component.html',
  styleUrls: ['./form-calculated.component.scss'],
})
export class FormCalculatedComponent {
  config: FieldConfig;
  group: FormGroup;
}
