import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'inner-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
    private currentSectionSubscription: Subscription;
    private homeUrl = '/hopes';

    public icons: any;
    public ICONS = {
        Administración: 'settings',
        'Cuadro de Mando': 'bar-chart-2',
        Calendario: 'calendar',
        Alertas: 'bell',
        Paciente: 'users',
        Soporte: 'mail',
    };

    currentSection: MenuItemModel;

    @Input() menu: Array<MenuItemModel>;
    @Input() level: number;
    @Input() collapsed: boolean;

    constructor(private _sidebar: MenuService, private _router: Router) { }

    ngOnInit (): void {
        this.currentSection = JSON.parse(localStorage.getItem('section'));
        this.currentSectionSubscription = this._sidebar
            .getCurrentSection().subscribe(
                (section: MenuItemModel) => {
                    console.log(section);
                    this.currentSection = section;
                    this.updateCollapseState(this.menu);
                });

        if (!this.menu) {
            this.menu = JSON.parse(localStorage.getItem('menu'));
            if (!this.menu) {
                this._sidebar.getSideBar().subscribe(
                    (response: MenuItemModel) => {
                        this.menu = response.children;
                        localStorage.setItem('menu', JSON.stringify(response.children));
                        localStorage.setItem('completeMenu', JSON.stringify(response))
                    }
                );
            }
        }

        if (this.currentSection) this.updateCollapseState(this.menu);
        if (!this.level) this.level = 1;
    }

    collapseAll (menu?: Array<MenuItemModel>) {
        if (menu && menu.length > 0) {
            menu.forEach((element) => {
                element.collapsed = true;
                if (element.children && element.children.length > 0)
                    this.collapseAll(element.children);
            });
        }
    }

    goUrl (section: MenuItemModel) {
        const url = section.url === this.homeUrl ? this.homeUrl : section.url.split('hopes')[1];
        if (url) {
            this._router.navigate([url]);
            this._sidebar.setCurrentSection(section);
        }
    }

    updateCollapseState (menu: Array<MenuItemModel>) {
        if (this.currentSection) {
            menu.forEach((item) => {
                item.collapsed = this.currentSection.path.includes(item.path) ? false : true;
                if (!item.collapsed && item.children && item.children.length > 0) {
                    this.updateCollapseState(item.children);
                } else item.collapsed = true;
            });
        } else this.collapseAll();
    }

    public toggleColapseMenu (menuItem: MenuItemModel): void {
        if (menuItem.collapsed) this.collapseAll(this.menu);
        menuItem.collapsed = !menuItem.collapsed;
    }

    ngOnDestroy () {
        if (this.currentSectionSubscription)
            this.currentSectionSubscription.unsubscribe();
    }
}
