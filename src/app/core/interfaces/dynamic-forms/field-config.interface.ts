import { ValidatorFn } from '@angular/forms';
export interface AccordionPanel {
    header: string;
    content: FieldConfig[];
    config?: FieldConfig[];
}
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
    calculated_back?: any;
    event?: string;
    graphBack?: boolean;
    max?: any;
    min?: any;
    enableWhen?: Array<any>;
    hiddenWhen?: Array<any>;
    defaultValue?: any;
    button?: any;
    button_click?: any;
    hidden?: boolean;
    params?: Array<string>;
    actions?: Array<action>;
    columns?: Array<any>;
    fields?: Array<any>;
    historic?: Array<any>;
    endpoint?: string;
    template?: string;
    css?: string;
    readonly?: boolean;
    cleanFormOnChange?: boolean;
    multiselect?: {
        enableSearch?: boolean;
        checkedStyle?: 'fontawesome' | 'checkboxes' | 'glyphicon' | 'visual';
        buttonClasses?: string;
        itemClasses?: string;
        containerClasses?: string;
        dynamicTitleMaxItems?: number;
        displayAllSelectedText?: boolean;
        selectionLimit?: number;
        minSelectionLimit?: number;
        showCheckAll?: boolean;
        showUncheckAll?: boolean;
        placeholder?: string;
        selectedOptions?: Array<any>;
    };
    file?: {
        endpoint: string;
        validExtensions?: Array<string>;
        maxSize: number;
    };
    accordion?: {
        panels: Array<AccordionPanel>;
    };
}

interface action {
    name: string;
    icon: string;
}
