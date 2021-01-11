import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import FormUtils from 'src/app/core/utils/FormUtils';
import StringUtils from 'src/app/core/utils/StringUtils';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { formatCurrency } from '@angular/common';

@Component({
    selector: 'app-dynamic-modal',
    templateUrl: './dynamic-modal.component.html',
    styleUrls: ['./dynamic-modal.component.scss'],
})
export class DynamicModalComponent implements OnInit, AfterViewInit {
    public config: FieldConfig[] = [];
    public buttons: string[] = [];
    public filled = [];
    public isLoading = false;
    private isEmpty = true;
    private isEmptyModal = true;
    @ViewChild('form') el: ElementRef;

    @Input() title: string;
    @Input() data: any;
    @Input() key: string;
    @Input() fields: any;
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private _formsService: FormsService) {}

    ngOnInit() {
        this.isLoading = true;
        if (this.key) {
            this.getAndParseFromTemplate();
        } else {
            this.getAndParseFromFields();
        }
    }

    ngAfterViewInit() {
        this.isLoading = false;
        let initConfig = Object.assign(this.el);
        console.log('fooorm', initConfig.form);
        console.log('INIT*****');
        console.log(this.el);
        console.log(initConfig);
    }

    onClose() {
        this.close.emit(null);
    }

    onModalValueChange(event?: any) {
        // Al modificar algún valor del modal, recalculamos para los campos calculados.

        if (this.key) {
            console.log(this.key);
            this.getAndParseFromTemplate();
        } else {
            this.getAndParseFromFields();
        }
    }

    async getAndParseFromTemplate() {
        const data: any = await this._formsService.get(this.key);
        if (data) {
            const emptyForm = this._parseStringToJSON(data.form);
            this.config = FormUtils.createFieldConfig(emptyForm);
            const buttons = this._parseStringToJSON(data.buttons);
            this.buttons = FormUtils.createButtons(buttons);
        } else {
            this.fillForm();
            this.config = FormUtils.createFieldConfig(this.fields, this.config, this._formsService.editing);
        }
    }

    getAndParseFromFields() {
        this.fillForm();
        this.config = FormUtils.createFieldConfig(this.fields, this.filled, this._formsService.editing);
        this.buttons = FormUtils.createButtons(['save']);
        this._formsService.editing = true;
    }

    submit(modalForm: { [name: string]: any }) {
        // Impedimos que se añada un registro vacío aunque no haya campos requeridos
        let object = modalForm;
        for (let key in object) {
            let value = object[key];
            if (value) {
                this.isEmpty = false;
            }
        }
        if (!this.isEmpty) {
            this.save.emit(modalForm);
        } else {
            this.closeModal(true);
        }
    }

    fillForm() {
        if (this.data) {
            Object.keys(this.data).forEach((key) => {
                let field = this.fields.find((o) => o.name === key);
                field = { ...field, value: this.data[key] };
                this.filled.push(field);
            });
        } else {
            this.fields.forEach((field) => {
                field = { ...field, value: field.defaultValue ? field.defaultValue : undefined };
                this.filled.push(field);
            });
        }
    }

    closeModal(cancel: boolean) {
        if (cancel) {
            this.close.emit(null);
        }
    }

    private _parseStringToJSON(form: string): JSON {
        return JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(form));
    }
}
