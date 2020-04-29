import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-switch',
  templateUrl: './form-switch.component.html',
  styleUrls: ['./form-switch.component.scss'],
})
export class FormSwitchComponent {
  config: FieldConfig;
  group: FormGroup;
}
