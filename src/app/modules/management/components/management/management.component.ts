import { Component, OnInit } from '@angular/core';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
    modules: Array<HomeDashboardModule>;
    menu: MenuItemModel[] = [];
    public menuId = 4;

    constructor() {}

    ngOnInit(): void {
        const rootMenu = JSON.parse(localStorage.getItem('menu'));
        if (rootMenu) {
            this.menu = rootMenu.filter((item) => item.url.endsWith('/management'));
            this.modules = rootMenu.find((item) => item.url.endsWith('/management')).children;
        }
    }
}
