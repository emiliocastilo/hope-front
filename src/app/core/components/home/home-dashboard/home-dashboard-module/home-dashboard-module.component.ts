import { Component, OnInit, Input } from '@angular/core';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu/menu.service';

@Component({
    selector: 'home-dashboard-module',
    templateUrl: './home-dashboard-module.component.html',
    styleUrls: ['./home-dashboard-module.component.scss'],
})
export class HomeDashboardModuleComponent implements OnInit {
    @Input() module: HomeDashboardModule;

    constructor(private _router: Router, private _sidebar: MenuService) {}

    ngOnInit(): void {}

    goToUrl(section: any) {
        event.preventDefault();
        const url = section.url.split('hopes')[1];
        this._router.navigate([url]);
        this._sidebar.setCurrentSection(section);
    }
}
