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
  private fullMenu: MenuItemModel;
  public homeUrl = '/hopes';

  selectedSection: MenuItemModel;
  crumbs: MenuItemModel[];
  menu: Array<MenuItemModel>;

  constructor(private _router: Router, private _sidebar: MenuService) {}

  ngOnInit() {
    this.crumbs = [];
    this.menu = JSON.parse(localStorage.getItem('menu'));
    this.selectedSection = JSON.parse(localStorage.getItem('section'));
    this.fullMenu = JSON.parse(localStorage.getItem('completeMenu'));

    if (this.selectedSection)
      this.crumbs = this.buildBreadcrumb(this.selectedSection).reverse();

    this.currentSectionSubscription = this._sidebar
      .getCurrentSection()
      .subscribe((currentSection: MenuItemModel) => {
        this.selectedSection = currentSection;
        this.crumbs = this.buildBreadcrumb(currentSection).reverse();
      });
  }

  private buildBreadcrumb(
    section: MenuItemModel,
    breadcrumbs?: MenuItemModel[]
  ): MenuItemModel[] {
    if (!breadcrumbs) breadcrumbs = [];
    if (
      (section.visible === undefined || section.visible) &&
      section.url !== '/hopes'
    )
      breadcrumbs.push(section);

    if (section.parentId) {
      if (!this._sidebar.allSections) this._sidebar.fillSections(this.fullMenu);
      this.buildBreadcrumb(
        this._sidebar.allSections.filter((f) => f.id === section.parentId)[0],
        breadcrumbs
      );
    }
    return breadcrumbs;
  }

  navigate(section?: MenuItemModel) {
    const url = !section ? this.homeUrl : section.url.split('hopes')[1];
    if (!section) {
      if (!this._sidebar.allSections) this._sidebar.fillSections(this.fullMenu);
      section = this._sidebar.allSections.filter(
        (f) => f.url === this.homeUrl
      )[0];
    }

    if (url) {
      this._router.navigate([url]);
      this._sidebar.setCurrentSection(section);
    }
  }

  ngOnDestroy() {
    this.currentSectionSubscription.unsubscribe();
  }
}
