import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MimeTypes } from 'src/app/core/enum/mimetype.enum';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FileUtils } from 'src/app/core/utils/file.utils';

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
    public invalidExtension: boolean;
    public selectedFileName: string;
    public currentFile: any;

    @Input() clases: string;
    @Input() id: string;
    @Input() isDisabled: boolean = false;
    @Input() label: string = '';
    @Input() maxlength: any = 256;
    @Input() name: string;
    @Input() placeholder = '';
    @Input() required: boolean = false;
    @Input() type: string = 'file';
    @Input() accept: string;
    @Input() currentValue: File;
    @Input() formGroup: FormGroup;
    @Input() validExtensions: Array<string>;

    constructor(private _notification: NotificationService, private _translate: TranslateService) { }

    ngOnInit (): void {
        if (!this.validExtensions) this.validExtensions = [];
    }

    public handleFileInput (files: FileList): void {
        const file: File = files[0];

        if (!FileUtils.checkValidExtension(file, this.validExtensions)) {
            let validExtensionsString = '';
            this.validExtensions.forEach(element => {
                if (validExtensionsString.length > 0) validExtensionsString += ', ';
                validExtensionsString += element;
            });
            console.log(validExtensionsString);
            this._notification.showWarningToast(this._translate.instant('notifications.invalidFileType', { validTypes: validExtensionsString }));
            this.currentFile = undefined;
        } else {
            // const fileToUpload = files.item(0);
            // const fileExtension = fileToUpload.name.split('.').pop();
            // if (`.${fileExtension}` === this.accept) {
            //     this.formGroup.get(this.name).setValue(fileToUpload);
            // }
        }

    }
}
