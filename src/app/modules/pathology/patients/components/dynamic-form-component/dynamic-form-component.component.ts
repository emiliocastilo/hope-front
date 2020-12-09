import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dynamic-form-component',
    templateUrl: './dynamic-form-component.component.html',
    styleUrls: ['./dynamic-form-component.component.scss'],
})
export class DynamicFormComponentComponent {
    key: string;

    constructor(router: Router) {
        const url: string = router.url;
        const segment = url.split(/[\s/]+/);
        this.key = segment[segment.length - 1];
    }
}
