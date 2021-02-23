import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';

export class FieldConfigModel implements FieldConfig {
    css?: string;
    disabled?: boolean;
    formula?: any;
    icon?: string;
    inputType?: string;
    label?: string;
    labelCheckOff: string;
    labelCheckOn: string;
    name: string;
    options?: any[];
    placeholder?: string;
    radioButton?: any;
    readonly?: boolean;
    rows?: number;
    selectMultiple?: boolean;
    type: string;
    validation?: import('@angular/forms').ValidatorFn[];
    value?: any;
}
