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
  optionSelected: boolean;

  /* TODO: Hay que revisar el value que recibimos del select para evitar una comprobación por string
   * y usar una comprobación por null o vacío.
   */
  onSelect(event): void {
    this.optionSelected = !event.target.value.startsWith('0: ');
  }
}
