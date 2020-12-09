import { Component, OnInit, Input } from '@angular/core';

import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';

@Component({
    selector: 'home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: ['./home-dashboard.component.scss'],
})
export class HomeDashboardComponent implements OnInit {
    @Input() modules: Array<HomeDashboardModule>;

    constructor() {}

    ngOnInit(): void {}
}
