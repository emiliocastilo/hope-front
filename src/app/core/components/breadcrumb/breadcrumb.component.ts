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

  constructor(private _router: Router, private _sidebar: MenuService) {}

  ngOnInit() {
    this.crumbs = [];
    this.menu = JSON.parse(localStorage.getItem('menu'));
    this.selectedSection = JSON.parse(localStorage.getItem('section'));

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
    console.log(section.parent);
    if (!breadcrumbs) breadcrumbs = [];
    if (
      (section.visible === undefined || section.visible) &&
      section.path !== '/hopes'
    )
      breadcrumbs.push(section);

    if (section.parent) {
      if (this._sidebar.allSections && this._sidebar.allSections.length > 0)
        this.buildBreadcrumb(
          this._sidebar.allSections.filter(
            (f) => f.id === section.parent.id
          )[0],
          breadcrumbs
        );
    }
    return breadcrumbs;
  }

  navigate(section: MenuItemModel) {
    const url =
      !section.url || section.url === this.homeUrl
        ? this.homeUrl
        : section.url.split('hopes')[1];
    this._router.navigate([url]);
    if (url !== this.homeUrl) {
      this._sidebar.setCurrentSection(section);
    } else {
      debugger;
      this._sidebar.setCurrentSection(
        this._sidebar.allSections.filter((f) => f.path === this.homeUrl)[0]
      );
    }
  }

  ngOnDestroy() {
    this.currentSectionSubscription.unsubscribe();
  }
}
