import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
    selector: 'app-form-space',
    templateUrl: './from-space.component.html',
    styleUrls: ['./form-space.component.scss'],
})
export class FormSpaceComponent implements OnInit {
    @Input() config: FieldConfig;

    constructor() {}

    ngOnInit(): void {}
}
