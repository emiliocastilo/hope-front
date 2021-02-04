import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccordionPanel, FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';

@Component({
    selector: 'app-form-accordion',
    templateUrl: './form-accordion.component.html',
    styleUrls: ['./form-accordion.component.scss'],
})
export class FormAccordionComponent implements OnInit {
    config: FieldConfig;
    name: string;
    id: string;
    group: FormGroup;
    optionSelected: boolean;
    required = false;
    panels: AccordionPanel[];

    ngOnInit() {
        this.panels = this.config.accordion.panels;
        this.name = this.config.name;
        console.log(`${this.name}`, this.config);
    }
}
