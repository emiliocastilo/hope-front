import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    modules: Array<HomeDashboardModule>;
    menu: MenuItemModel[] = [];
    menuId: number = 2;
    currentSection: number = 1;

    constructor() {}

    ngOnInit(): void {}
}
