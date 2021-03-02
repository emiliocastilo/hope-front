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
    currentPanel: number;
    group: FormGroup;
    id: string;
    name: string;
    optionSelected: boolean;
    panels: AccordionPanel[];
    required = false;

    ngOnInit() {
        this.panels = this.config.accordion.panels;
        this.name = this.config.name;
    }

    setCurrentPanel(panelIndex: number) {
        if (this.currentPanel === panelIndex) this.currentPanel = -1;
        else this.currentPanel = panelIndex;
    }
}
