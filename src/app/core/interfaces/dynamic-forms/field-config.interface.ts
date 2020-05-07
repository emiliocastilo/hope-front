import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: any[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  icon?: string;
  selectMultiple?: boolean;
  radioButton?: any;
  rows?: number;
  inputType?: string;
}
