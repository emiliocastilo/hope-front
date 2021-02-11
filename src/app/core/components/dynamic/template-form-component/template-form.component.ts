import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-template-form',
    templateUrl: './template-form.component.html',
    styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent {
    key: string;

    constructor(router: Router) {
        const url: string = router.url;
        const segment = url.split(/[\s/]+/);
        this.key = segment[segment.length - 1];
    }
}
