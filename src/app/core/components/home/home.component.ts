import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';
import { MenuService } from '../../services/menu/menu.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    modules: Array<MenuItemModel>;

    constructor(private _sidebar: MenuService) {}

    ngOnInit(): void {
        this.modules = JSON.parse(localStorage.getItem('menu'));
        if (!this.modules) {
            this.fetchModules();
        }
    }

    fetchModules() {
        this._sidebar.getSideBar().subscribe((response) => (this.modules = response.children));
    }
}
