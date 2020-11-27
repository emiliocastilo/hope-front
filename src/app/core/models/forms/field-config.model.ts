import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';

export class FieldConfigModel implements FieldConfig {
  name: string;
  type: string;
  disabled?: boolean;
  label?: string;
  options?: any[];
  placeholder?: string;
  validation?: import('@angular/forms').ValidatorFn[];
  value?: any;
  icon?: string;
  selectMultiple?: boolean;
  radioButton?: any;
  labelCheckOff: string;
  labelCheckOn: string;
  rows?: number;
  inputType?: string;
  css?: string;
}
