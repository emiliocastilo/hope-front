import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MimeTypes } from 'src/app/core/enum/mimetype.enum';
import { FileModel } from 'src/app/core/models/file/file.model';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
    public invalidExtension: boolean;
    public selectedFileName: string;

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
    @Input() validExtensions: Array<string> = [];

    constructor(
        private _notification: NotificationService,
        private _translate: TranslateService,
    ) { }

    ngOnInit (): void { }

    private validateFile (file: File): boolean {
        if (this.validExtensions.length > 0) {
            const possibleExtensions = MimeTypes.filter(f => f.type === file.type);

            possibleExtensions.forEach(ext => {
                console.log(ext, this.validExtensions);
                if (this.validExtensions.includes(ext.extension)) {
                    this.invalidExtension = false;
                    return true;
                }
            });

            this.invalidExtension = true;
            this._notification.showWarningToast(this._translate.instant('invalidFileType', { validType: '' }));
            return false;
        } else return true;
    }

    public handleFileInput (files: FileList): void {
        const file: File = files[0];
        console.log(files, file);
        if (this.validateFile(file)) { console.log('valido') };

        // const fileToUpload = files.item(0);
        // const fileExtension = fileToUpload.name.split('.').pop();

        // if (`.${fileExtension}` === this.accept) {
        //     this.formGroup.get(this.name).setValue(fileToUpload);
        // }
    }


}
