import { FormGroup } from '@angular/forms';
import { FieldConfigModel } from './field-config.interface';

export interface Field {
  config: FieldConfigModel;
  group: FormGroup;
}
