import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
    constructor() {}

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

    ngOnInit(): void {}

    public handleFileInput(files: FileList): void {
        const fileToUpload = files.item(0);
        const fileExtension = fileToUpload.name.split('.').pop();

        if (`.${fileExtension}` === this.accept) {
            this.formGroup.get(this.name).setValue(fileToUpload);
        }
    }
}
