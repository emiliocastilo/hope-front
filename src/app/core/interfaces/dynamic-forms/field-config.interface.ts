import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  name: string;
  type: string;
  disabled?: boolean;
  label?: string;
  options?: any[];
  placeholder?: string;
  validation?: ValidatorFn[];
  value?: any;
  icon?: string;
  selectMultiple?: boolean;
  radioButton?: any;
  rows?: number;
  inputType?: string;
}
