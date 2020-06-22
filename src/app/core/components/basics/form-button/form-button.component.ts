import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent {
  @Input() clasesBtn: string;
  @Input() texto: string;
  @Input() type = 'button';
  config: FieldConfig;
  group: FormGroup;
}
