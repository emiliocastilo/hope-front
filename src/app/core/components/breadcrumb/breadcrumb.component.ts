import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
    private currentSectionSubscription: Subscription;
    public homeUrl = '/hopes';
    selectedSection: MenuItemModel;
    crumbs: MenuItemModel[];
    menu: Array<MenuItemModel>;

    constructor(
        private _router: Router,
        private _sidebar: MenuService
    ) { }

    ngOnInit () {
        this.menu = JSON.parse(localStorage.getItem('menu'));
        this.selectedSection = JSON.parse(localStorage.getItem('section'));

        if (this.selectedSection) this.crumbs = this.buildBreadcrumb(this.selectedSection).reverse();

        this.currentSectionSubscription = this._sidebar.getCurrentSection().subscribe(
            (currentSection: MenuItemModel) => {
                this.selectedSection = currentSection;
                this.crumbs = this.buildBreadcrumb(currentSection).reverse();
            });
    }

    private buildBreadcrumb (section: MenuItemModel, breadcrumbs?: MenuItemModel[]): MenuItemModel[] {
        if (!breadcrumbs) breadcrumbs = [];
        if (section.visible) breadcrumbs.push(section);
        if (section.parent) this.buildBreadcrumb(section.parent, breadcrumbs);
        return breadcrumbs;
    }

    navigate (section: MenuItemModel) {
        const url = section.url === this.homeUrl ? this.homeUrl : section.url.split('hopes')[1];
        this._router.navigate([url]);
        this._sidebar.setCurrentSection(section);
    }

    ngOnDestroy () {
        this.currentSectionSubscription.unsubscribe();
    }
}
