import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
    selector: 'app-from-section',
    templateUrl: './from-section.component.html',
    styleUrls: ['./from-section.component.scss'],
})
export class FromSectionComponent implements OnInit {
    @Input() config: FieldConfig;

    constructor() {}

    ngOnInit(): void {}
}
