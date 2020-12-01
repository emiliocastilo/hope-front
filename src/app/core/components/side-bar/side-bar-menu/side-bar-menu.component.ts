import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'side-bar-menu',
    templateUrl: './side-bar-menu.component.html',
    styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent implements OnInit, OnDestroy {
    private currentSectionSubscription: Subscription;
    private homeUrl = '/hopes';

    public LEVEL_ONE = 1;
    public icons: any;
    public ICONS = {
        Administración: 'settings',
        'Cuadro de Mando': 'bar-chart-2',
        Calendario: 'calendar',
        Alertas: 'bell',
        Paciente: 'users',
        Soporte: 'mail',
    };

    currentSection: SideBarItemModel;

    @Input() parentSection: SideBarItemModel;
    @Input() menu: Array<SideBarItemModel>;
    @Input() level: number;
    @Input() collapsed: boolean;

    constructor(private _sidebar: SideBarService, private _router: Router) { }

    ngOnInit (): void {
        const storagedSection = localStorage.getItem('section');
        if (storagedSection && storagedSection !== 'undefined')
            this.currentSection = JSON.parse(storagedSection);
        this.currentSectionSubscription = this._sidebar
            .getCurrentSection()
            .subscribe((section: SideBarItemModel) => {
                this.currentSection = section;
                this.updateCollapseState(this.menu);
            });

        if (this.currentSection) this.updateCollapseState(this.menu);
        if (!this.level) this.level = this.LEVEL_ONE;
    }

    collapseAll (menu?: Array<SideBarItemModel>) {
        if (menu && menu.length > 0) {
            menu.forEach((element) => {
                element.collapsed = true;
                if (element.children && element.children.length > 0)
                    this.collapseAll(element.children);
            });
        }
    }

    goUrl (section: SideBarItemModel) {
        const url = section.url === this.homeUrl ? this.homeUrl : section.url.split('hopes')[1];
        if (url) { 
            this._router.navigate([url]); 
            this._sidebar.currentSection.next(section);
        }
    }

    updateCollapseState (menu: Array<SideBarItemModel>) {
        if (this.currentSection) {
            menu.forEach((item) => {
                item.collapsed = this.currentSection.path.includes(item.path) ? false : true;
                if (!item.collapsed && item.children && item.children.length > 0) {
                    this.updateCollapseState(item.children);
                } else item.collapsed = true;
            });
        } else this.collapseAll();
    }

    public toggleColapseMenu (menuItem: SideBarItemModel): void {
        if (menuItem.collapsed) this.collapseAll(this.menu);
        menuItem.collapsed = !menuItem.collapsed;
    }

    ngOnDestroy () {
        if (this.currentSectionSubscription)
            this.currentSectionSubscription.unsubscribe();
    }
}
