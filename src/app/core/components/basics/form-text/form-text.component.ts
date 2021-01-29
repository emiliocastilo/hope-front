import { Component, Input, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
    selector: 'app-form-text',
    templateUrl: './form-text.component.html',
    styleUrls: ['./form-text.component.scss'],
})
export class FormTextComponent implements OnInit {
    @Input() config: FieldConfig;
    constructor() {}
    ngOnInit(): void {}
}
