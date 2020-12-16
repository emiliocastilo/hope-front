import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, FormGroup } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';

@Component({
    selector: 'app-input-multi-select',
    templateUrl: './input-multi-select.component.html',
    styleUrls: ['./input-multi-select.component.scss'],
})
export class InputMultiSelectComponent implements OnInit, ControlValueAccessor, OnChanges {
    public loaded: boolean = false;

    constructor() {}

    @Input() id: string;
    @Input() isDisabled = false;
    @Input() labelValue = '';
    @Input() name: string;
    @Input() options: any[] = [];
    @Input() selectedOptions: Array<any>;
    @Input() currentValue: any;
    @Input() clearAfterSelect = false;
    @Input() form: FormGroup;
    @Input() required = false;
    @Input() changes = false;

    // * MULTISELECT CONFIG PARAMS * //
    @Input() buttonClasses: string;
    @Input() containerClasses: string;
    @Input() checkClasses: 'fontawesome' | 'checkboxes' | 'glyphicon' | 'visual';
    @Input() itemClasses: string;
    @Input() dynamicTitleMaxItems: number;
    @Input() minSelectionLimit: number;
    @Input() selectionLimit: number;
    @Input() showCheckAll: boolean;
    @Input() showUncheckAll: boolean;

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    optionsModel: number[];
    multiSelectOptions: IMultiSelectOption[];

    public value: string = null;
    childControl = new FormControl();

    multiSelectSettings: IMultiSelectSettings;
    multiSelectTexts: IMultiSelectTexts;

    ngOnInit(): void {
        this.multiSelectSettings = {
            enableSearch: false,
            checkedStyle: this.checkClasses ? this.checkClasses : 'fontawesome',
            buttonClasses: `btn btn-primary multiselect-button ${this.buttonClasses}`,
            itemClasses: this.itemClasses,
            containerClasses: this.containerClasses,
            dynamicTitleMaxItems: this.dynamicTitleMaxItems ? this.dynamicTitleMaxItems : 5,
            displayAllSelectedText: true,
            selectionLimit: this.selectionLimit ? this.selectionLimit : 0,
            minSelectionLimit: this.minSelectionLimit ? this.minSelectionLimit : 0,
            showCheckAll: this.showCheckAll,
            showUncheckAll: this.showUncheckAll,
        };

        this.multiSelectTexts = {
            checkAll: 'Seleccionar todo',
            uncheckAll: 'Deseleccionar todo',
            checked: 'Item seleccionado',
            checkedPlural: 'Items seleccionados',
            searchPlaceholder: 'Buscar',
            searchEmptyResult: 'No se han encontrado elementos',
            searchNoRenderText: 'Escribir búsqueda...',
            defaultTitle: this.labelValue,
            allSelected: 'Todo seleccionado',
        };

        this.optionsModel = [];

        if (this.selectedOptions && this.selectedOptions.length > 0) {
            this.selectedOptions.forEach((element) => this.optionsModel.push(element.id));
        }
        this.loaded = true;
    }

    ngOnChanges(changes) {
        if (this.changes) {
            if (changes.currentValue.currentValue && changes.currentValue.currentValue.name) {
                this.value = changes.currentValue.currentValue.name;
            }
        }
    }

    onChange(value: any): void {
        const selected = [];
        value.forEach((element) => selected.push(this.options.filter((f) => f.id === element)[0]));
        this.childControl.setValue(selected);
        if (this.form) this.form.controls[this.id].setValue([selected]);
        this.change.emit(selected);
    }

    isSelected(option, value) {
        return option.name && value && option.name.toLowerCase() === value.toLowerCase();
    }

    writeValue(value: any): void {
        if (value) this.value = value;
        else this.value = '';
        this.childControl.setValue(value);
    }

    onTouch = () => {};

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
}
