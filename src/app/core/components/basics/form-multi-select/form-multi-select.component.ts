import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';

import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
    selector: 'app-form-multi-select',
    templateUrl: './form-multi-select.component.html',
    styleUrls: ['./form-multi-select.component.scss'],
})
export class FormMultiSelectComponent implements OnInit {
    config: FieldConfig;
    group: FormGroup;
    options: Array<any>;
    optionSelected: boolean;
    required = false;

    selectedOptions: Array<any>;
    optionsModel: Array<any>;
    multiSelectSettings: IMultiSelectSettings;
    multiSelectTexts: IMultiSelectTexts;
    loaded: boolean;

    ngOnInit() {
        this.loaded = false;
        this.hasRequiredField(this.group.controls[this.config.name]);
        this.options = this.config.options;

        this.selectedOptions = this.config.multiselect.selectedOptions ? this.config.multiselect.selectedOptions : undefined;

        this.multiSelectSettings = {
            enableSearch: false,
            checkedStyle: this.config.multiselect.checkedStyle ? this.config.multiselect.checkedStyle : 'fontawesome',
            buttonClasses: `btn btn-primary multiselect-button ${this.config.multiselect.buttonClasses ? this.config.multiselect.buttonClasses : ''}`,
            itemClasses: this.config.multiselect.itemClasses ? this.config.multiselect.itemClasses : '',
            containerClasses: this.config.multiselect.containerClasses ? this.config.multiselect.containerClasses : '',
            dynamicTitleMaxItems: this.config.multiselect.dynamicTitleMaxItems ? this.config.multiselect.dynamicTitleMaxItems : 5,
            displayAllSelectedText: this.config.multiselect.displayAllSelectedText,
            selectionLimit: this.config.multiselect.selectionLimit ? this.config.multiselect.selectionLimit : 0,
            minSelectionLimit: this.config.multiselect.minSelectionLimit ? this.config.multiselect.minSelectionLimit : 0,
            showCheckAll: this.config.multiselect.showCheckAll,
            showUncheckAll: this.config.multiselect.showUncheckAll,
        };
        this.multiSelectTexts = {
            checkAll: 'Seleccionar todo',
            uncheckAll: 'Deseleccionar todo',
            checked: 'Item seleccionado',
            checkedPlural: 'Items seleccionados',
            searchPlaceholder: 'Buscar',
            searchEmptyResult: 'No se han encontrado elementos',
            searchNoRenderText: 'Escribir búsqueda...',
            defaultTitle: this.config.multiselect.placeholder,
            allSelected: 'Todo seleccionado',
        };

        if (this.selectedOptions && this.selectedOptions.length > 0) this.selectedOptions.forEach((element) => this.optionsModel.push(element.id));
        this.loaded = true;
    }

    hasRequiredField(abstractControl: AbstractControl) {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }
    }

    onChange(value: any): void {
        const selected = [];
        value.forEach((element) => selected.push(this.options.filter((f) => f.id === element)[0]));
        this.group.controls[this.config.name].setValue(selected);
    }
}
