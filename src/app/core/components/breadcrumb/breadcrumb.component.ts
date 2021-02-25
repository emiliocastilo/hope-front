import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';
import { MenuService } from '../../services/menu/menu.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
    private currentSectionSubscription: Subscription;
    private fullMenu: MenuItemModel;
    public homeUrl = '/hopes';
    public isMobileScreen: boolean;
    private indexBreadcrumb: number = 0;

    selectedSection: MenuItemModel;
    crumbs: MenuItemModel[];
    menu: Array<MenuItemModel>;

    constructor(private _sidebar: MenuService, private _menuService: MenuService) {}

    ngOnInit() {
        this.crumbs = [];
        this.menu = JSON.parse(localStorage.getItem('menu'));
        this.selectedSection = JSON.parse(localStorage.getItem('section'));
        this.fullMenu = JSON.parse(localStorage.getItem('completeMenu'));

        if (this.selectedSection) {
            this.crumbs = this.buildBreadcrumb(this.selectedSection).reverse();
            this.indexBreadcrumb = this.crumbs.length - 1;
        }

        this.currentSectionSubscription = this._sidebar.getCurrentSection().subscribe((currentSection: MenuItemModel) => {
            this.selectedSection = currentSection;
            this.crumbs = this.buildBreadcrumb(currentSection).reverse();
            this.indexBreadcrumb = this.crumbs.length - 1;
        });
        this.isMobileScreen = this._menuService.isMobileScreen();
    }

    private buildBreadcrumb(section: MenuItemModel, breadcrumbs?: MenuItemModel[]): MenuItemModel[] {
        if (!breadcrumbs) breadcrumbs = [];
        if ((section.visible === undefined || section.visible) && section.url !== '/hopes') breadcrumbs.push(section);

        if (section.parentId) {
            if (!this._sidebar.allSections) this._sidebar.fillSections(this.fullMenu);
            this.buildBreadcrumb(this._sidebar.allSections.filter((f) => f.id === section.parentId)[0], breadcrumbs);
        }
        return breadcrumbs;
    }

    public navigate(section?: MenuItemModel): void {
        this._sidebar.setCurrentSection(section);
    }

    public openMenu(): void {
        this._menuService.openMenu();
    }

    public decreaseIndexBreadcrums(): void {
        if (this.indexBreadcrumb > 0) {
            this.indexBreadcrumb--;
        }
    }

    public increaseIndexBreadcrums(): void {
        if (this.indexBreadcrumb < this.crumbs.length) {
            this.indexBreadcrumb++;
        }
    }

    public indexIsLastElement(): boolean {
        return this.crumbs.length === this.indexBreadcrumb + 1;
    }

    public indexIsFirstElement(): boolean {
        return this.indexBreadcrumb <= 0;
    }

    public getCrumbSelectedTitle(): string {
        return this.crumbs.length > 0 ? this.crumbs[this.indexBreadcrumb].title : '';
    }

    public navigateCrumbSelected(): void {
        this.navigate(this.crumbs[this.indexBreadcrumb]);
    }

    ngOnDestroy() {
        this.currentSectionSubscription.unsubscribe();
    }
}
