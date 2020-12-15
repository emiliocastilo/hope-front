import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, FormGroup } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';

@Component({
    selector: 'app-input-multi-select',
    templateUrl: './input-multi-select.component.html',
    styleUrls: ['./input-multi-select.component.scss'],
})
export class InputMultiSelectComponent implements OnInit, ControlValueAccessor, OnChanges {
    constructor() { }

    @Input() id: string;
    @Input() isDisabled = false;
    @Input() labelValue = '';
    @Input() name: string;
    @Input() options: any[] = [];
    @Input() optionSelected: number;
    @Input() currentValue: any;
    @Input() placeholder = '';
    @Input() selectMultiple = false;
    @Input() clearAfterSelect = false;
    @Input() form: FormGroup;
    @Input() required = false;
    @Input() changes = false;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    optionsModel: number[];
    myOptions: IMultiSelectOption[];

    public value: string = null;
    childControl = new FormControl();

    optionChangeSelected: boolean;

    // Settings configuration
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block select',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true
    };

    // Text configuration
    myTexts: IMultiSelectTexts = {
        checkAll: 'Seleccionar todo',
        uncheckAll: 'Deseleccionar todo',
        checked: 'Item seleccionado',
        checkedPlural: 'Items seleccionados',
        searchPlaceholder: 'Buscar',
        searchEmptyResult: 'No se han encontrado elementos',
        searchNoRenderText: 'Escribir búsqueda...',
        defaultTitle: 'Título select',
        allSelected: 'Todo seleccionado',
    };

    ngOnInit (): void {
       if (this.optionSelected) {
            const valueSelected = this.options.find((option) => option.id === this.optionSelected);
            if (valueSelected) {
                this.value = valueSelected.name;
            }
        }
        if (!this.value && this.currentValue) {
            this.value = this.currentValue.name;
        }
    }

    ngOnChanges (changes) {
        if (this.changes) {
            if (changes.currentValue.currentValue && changes.currentValue.currentValue.name) {
                this.value = changes.currentValue.currentValue.name;
            }
            // else if (!changes.currentValue.currentValue) {
            //   this.value = '';
            // }
        }
    }

    onChange (value: any): void {
        this.change.emit(this.optionsModel);
    }

    isSelected (option, value) {
        return option.name && value && option.name.toLowerCase() === value.toLowerCase();
    }

    writeValue (value: any): void {
        if (value) {
            this.value = value;
        } else {
            this.value = '';
        }
        this.childControl.setValue(value);
    }

    onTouch = () => { };

    onInput (value: any) {
        this.value = value;
        this.setCurrentValue(value, this.options);
        this.childControl.setValue(this.currentValue);
        if (this.form) {
            this.form.controls[this.id].setValue([this.currentValue]);
        }
        this.onChange(this.value);
        this.onTouch();
    }

    registerOnChange (fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched (fn: any): void {
        this.onTouch = fn;
    }

    setCurrentValue (name: string, objectArray: any[]) {
        objectArray.forEach((object: any) => {
            if (object.name === name) {
                this.currentValue = object;
            }
        });
    }
}
