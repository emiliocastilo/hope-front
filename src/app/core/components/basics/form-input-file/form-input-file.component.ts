import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FileUtils } from 'src/app/core/utils/file.utils';

export interface FileConfig {
    endpoint: string;
    validExtensions?: Array<string>;
}

@Component({
    selector: 'app-form-input-file',
    templateUrl: './form-input-file.component.html',
    styleUrls: ['./form-input-file.component.scss'],
})
export class FormInputFileComponent implements OnInit {
    public invalidExtension: boolean;
    public selectedFileName: string;
    public currentFile: any;

    config: FieldConfig;
    group: FormGroup;
    fileConfig: FileConfig;
    loaded: boolean;

    public id: string;
    public name: string;
    public label: string;
    public styles: string;
    public required = false;


    constructor(
        private _notification: NotificationService,
        private _translate: TranslateService,
        private _formsService: FormsService
    ) { }

    ngOnInit () {
        this.hasRequiredField(this.group.controls[this.config.name]);
        console.log(this.config);
        this.id = `${this.config.name.toLowerCase()}-id`;
        this.fileConfig = this.config.file;
        this.name = this.config.name;
        this.label = this.config.label;
        this.styles = `${this.config.css} dynamic-field`;
        this.loaded = true;
    }

    private hasRequiredField (abstractControl: AbstractControl) {
        if (abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                this.required = true;
            }
        }
    }

    public handleFileInput (files: FileList): void {
        const file: File = files[0];
        console.log('check file');
        if (!FileUtils.checkValidExtension(file, this.fileConfig.validExtensions)) {
            let validExtensionsString = '';
            this.fileConfig.validExtensions.forEach(element => {
                if (validExtensionsString.length > 0) validExtensionsString += ', ';
                validExtensionsString += element;
            });
            this._notification.showWarningToast(this._translate.instant('notifications.invalidFileType', { validTypes: validExtensionsString }));
            this.currentFile = undefined;
        } else {
            // TODO : PROBAR CON ENDPOINT FUNCIONAL
            this._formsService.postEndpoint(this.fileConfig.endpoint, file).subscribe(
                response => this.group.controls[this.config.name].setValue(response.id),
                error => { 
                    this._notification.showErrorToast('fileUploadError');
                    this.currentFile = undefined;
                }
            );
        }
    }
}
