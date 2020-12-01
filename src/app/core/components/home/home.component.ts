import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { SideBarService } from '../../services/side-bar/side-bar.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    // modules: Array<HomeDashboardModule>;
    modules: Array<SideBarItemModel>;

    constructor(private _sidebar: SideBarService) { }

    ngOnInit (): void {
        this.modules = JSON.parse(localStorage.getItem('menu'));
        if (!this.modules) {
            this.fetchModules();
        }
    }

    fetchModules () {
        // const response: any = await this._sidebar.getSideBar();
        // this.modules = response.children;
        this._sidebar.getSideBar().subscribe(response => this.modules = response.children);
    }
}
