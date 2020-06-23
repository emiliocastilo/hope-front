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
  labelCheckOff: string;
  labelCheckOn: string;
  rows?: number;
  inputType?: string;
  formula?: any;
  calculated_front?: boolean;
  params?: Array<string>;
  actions?: Array<string>;
  columns?: Array<any>;
  fields?: Array<any>;
  historic?: Array<any>;
}
