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

    ngOnInit () {
        console.log(this.config);
        this.hasRequiredField(this.group.controls[this.config.name]);
        const msConfig = this.config.multiselect;
        this.options = this.config.options;
        console.log(this.options);
        this.selectedOptions = msConfig.selectedOptions;
        this.multiSelectSettings = {
            enableSearch: true,
            checkedStyle: msConfig.checkedStyle ? msConfig.checkedStyle : 'fontawesome',
            buttonClasses: `btn btn-primary multiselect-button ${msConfig.buttonClasses}`,
            itemClasses: msConfig.itemClasses,
            containerClasses: msConfig.containerClasses,
            dynamicTitleMaxItems: msConfig.dynamicTitleMaxItems ? msConfig.dynamicTitleMaxItems : 5,
            displayAllSelectedText: msConfig.displayAllSelectedText,
            selectionLimit: msConfig.selectionLimit ? msConfig.selectionLimit : 0,
            minSelectionLimit: msConfig.minSelectionLimit ? msConfig.minSelectionLimit : 0,
            showCheckAll: msConfig.showCheckAll,
            showUncheckAll: msConfig.showUncheckAll
        };
        this.multiSelectTexts = {
            checkAll: 'Seleccionar todo',
            uncheckAll: 'Deseleccionar todo',
            checked: 'Item seleccionado',
            checkedPlural: 'Items seleccionados',
            searchPlaceholder: 'Buscar',
            searchEmptyResult: 'No se han encontrado elementos',
            searchNoRenderText: 'Escribir búsqueda...',
            defaultTitle: msConfig.defaultTitle,
            allSelected: 'Todo seleccionado',
        };

        if (this.selectedOptions && this.selectedOptions.length > 0) this.selectedOptions.forEach(element => this.optionsModel.push(element.id));
        this.loaded = true;
    }

    hasRequiredField (abstractControl: AbstractControl) {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }
    }

    onChange (value: any): void {
        // const selected = [];
        // value.forEach(element => selected.push(this.options.filter(f => f.id === element)[0]));
    }
}
