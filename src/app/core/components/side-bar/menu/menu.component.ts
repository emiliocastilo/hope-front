import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';
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
    public subsectionVisible: boolean;
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

    constructor(private _menuService: MenuService) {}

    ngOnInit(): void {
        this.currentSection = JSON.parse(localStorage.getItem('section'));

        this.currentSectionSubscription = this._menuService.getCurrentSection().subscribe((section: MenuItemModel) => {
            this.currentSection = section;
            this.updateCollapseState(this.menu);
        });

        this.updateCollapseState(this.menu);
        if (!this.level) this.level = 1;
    }

    collapseAll(menu?: Array<MenuItemModel>) {
        if (menu && menu.length > 0) {
            menu.forEach((element) => {
                element.collapsed = true;
                element.subsectionVisible = !element.url.includes('/pathology/patients') || (element.url.includes('/pathology/patients') && this._menuService.thereIsPatientSelected);
                if (element.children && element.children.length > 0) this.collapseAll(element.children);
            });
        }
    }

    goUrl(section: MenuItemModel) {
        this._menuService.setCurrentSection(section);
    }

    updateCollapseState(menu: Array<MenuItemModel>) {
        if (this.currentSection) {
            menu.forEach((item) => {
                item.subsectionVisible = !item.url.includes('/pathology/patients') || (item.url.includes('/pathology/patients') && this._menuService.thereIsPatientSelected);
                item.collapsed = this.currentSection.path.includes(item.path) ? false : true;
                if (!item.collapsed && item.children && item.children.length > 0) this.updateCollapseState(item.children);
                else item.collapsed = true;
            });
        } else this.collapseAll();
    }

    public toggleColapseMenu(menuItem: MenuItemModel): void {
        if (menuItem.collapsed) this.collapseAll(this.menu);
        menuItem.collapsed = !menuItem.collapsed;
    }

    ngOnDestroy() {
        if (this.currentSectionSubscription) this.currentSectionSubscription.unsubscribe();
    }
}
