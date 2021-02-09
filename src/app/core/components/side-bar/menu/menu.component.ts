import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { Subscription } from 'rxjs';
import { CurrentRoleListenerService } from 'src/app/core/services/current-role-listener/current-role-listener.service';
import { RolModel } from 'src/app/modules/management/models/rol.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'inner-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
    private currentSectionSubscription: Subscription;
    private currentRoleSubscription: Subscription;
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

    constructor(private _menuService: MenuService, private _roleListener: CurrentRoleListenerService) { }

    ngOnInit (): void {
        this.currentSection = JSON.parse(localStorage.getItem('section'));

        this.currentRoleSubscription = this._roleListener.getCurrentRole().subscribe((role: RolModel) => {
            this._menuService.getMenu().subscribe((menu: MenuItemModel) => (this.menu = menu.children));
        });

        this.currentSectionSubscription = this._menuService.getCurrentSection().subscribe((section: MenuItemModel) => {
            this.currentSection = section;
            this.updateCollapseState(this.menu);
        });

        this.updateCollapseState(this.menu);
        if (!this.level) this.level = 1;
    }

    private checkHiddenSubsection (item: MenuItemModel) {
        return !item.url.includes(this._menuService.pathologyRoot) || (item.url.includes(this._menuService.pathologyRoot) && this._menuService.thereIsPatientSelected);
    }

    collapseAll (menu?: Array<MenuItemModel>) {
        if (menu && menu.length > 0) {
            menu.forEach((element) => {
                element.collapsed = true;
                element.subsectionVisible = this.checkHiddenSubsection(element);
                if (element.children && element.children.length > 0) this.collapseAll(element.children);
            });
        }
    }

    goUrl (section: MenuItemModel) {
        this._menuService.setCurrentSection(section);
    }

    updateCollapseState (menu: Array<MenuItemModel>) {
        if (this.currentSection) {
            menu.forEach((item) => {
                item.subsectionVisible = this.checkHiddenSubsection(item);
                item.collapsed = this.currentSection.path.includes(item.path) ? false : true;
                if (!item.collapsed && item.children && item.children.length > 0) this.updateCollapseState(item.children);
                else item.collapsed = true;
            });
        } else this.collapseAll();
    }

    public toggleColapseMenu (menuItem: MenuItemModel): void {
        if (menuItem.collapsed) this.collapseAll(this.menu);
        menuItem.collapsed = !menuItem.collapsed;
    }

    ngOnDestroy () {
        if (this.currentSectionSubscription) this.currentSectionSubscription.unsubscribe();
        if (this.currentRoleSubscription) this.currentRoleSubscription.unsubscribe();
    }
}
