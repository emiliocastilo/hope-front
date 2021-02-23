import { ValidatorFn } from '@angular/forms';
export interface AccordionPanel {
    config?: FieldConfig[];
    content: FieldConfig[];
    header: string;
}
export interface FieldConfig {
    accordion?: {
        panels: Array<AccordionPanel>;
    };
    actions?: Array<action>;
    button?: any;
    button_click?: any;
    calculated_back?: any;
    calculated_front?: boolean;
    cleanFormOnChange?: boolean;
    columns?: Array<any>;
    css?: string;
    defaultValue?: any;
    disabled?: boolean;
    enableWhen?: Array<any>;
    endpoint?: string;
    event?: string;
    fields?: Array<any>;
    file?: {
        endpoint: string;
        maxSize: number;
        validExtensions?: Array<string>;
    };
    formula?: any;
    graphBack?: boolean;
    hidden?: boolean;
    hiddenWhen?: Array<any>;
    historic?: Array<any>;
    icon?: string;
    inputType?: string;
    label?: string;
    labelCheckOff: string;
    labelCheckOn: string;
    max?: any;
    min?: any;
    multiselect?: {
        buttonClasses?: string;
        checkedStyle?: 'fontawesome' | 'checkboxes' | 'glyphicon' | 'visual';
        containerClasses?: string;
        displayAllSelectedText?: boolean;
        dynamicTitleMaxItems?: number;
        enableSearch?: boolean;
        itemClasses?: string;
        minSelectionLimit?: number;
        placeholder?: string;
        selectedOptions?: Array<any>;
        selectionLimit?: number;
        showCheckAll?: boolean;
        showUncheckAll?: boolean;
    };
    name: string;
    options?: any[];
    params?: Array<string>;
    placeholder?: string;
    radioButton?: any;
    readonly?: boolean;
    rows?: number;
    selectMultiple?: boolean;
    table?: {
        hiddenColumn?: boolean;
    };
    template?: string;
    type: string;
    validation?: ValidatorFn[];
    value?: any;
}
interface action {
    icon: string;
    name: string;
}
