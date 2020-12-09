import { Component, OnInit } from '@angular/core';
import { FieldConfigModel} from '../../models/forms/field-config.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-switch',
  templateUrl: './form-switch.component.html',
  styleUrls: ['./form-switch.component.scss'],
})
export class FormSwitchComponent {
  config: FieldConfigModel;
  group: FormGroup;
}
