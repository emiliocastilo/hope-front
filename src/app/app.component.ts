import { Component, OnInit } from '@angular/core';
import { LoginModel } from './core/models/login/login.model';
import { LoginService } from './core/services/login/login.service';
import { Router, ResolveEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from './../assets/i18n/es.json';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { SectionsService } from 'src/app/modules/management/services/sections/sections.service';
import SectionActionBuilder from 'src/app/core/utils/SectionActionsBuilder';
import { SideBarItemModel } from './core/models/side-bar/side-bar-item.model';

import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'apps-hopes-front';
  public showOnlyMainContainer: boolean = true;

  currentUser: LoginModel;
  public menu: SideBarItemModel[];
  public modules: Array<HomeDashboardModule>;
  public selectedSection: SideBarItemModel;
  public crumbs: SideBarItemModel[];
  public isCollapsed: boolean;
  public level: number;
  collapsedSections = [];

  constructor(
    public _router: Router,
    private _loginService: LoginService,
    private translate: TranslateService,
    private _sectionsService: SectionsService,
    private _sideBar: SideBarService
  ) {
    this._loginService.currentUser.subscribe((x) => (this.currentUser = x));

    if (localStorage.getItem('language')) {
      translate.setTranslation('es', defaultLanguage);
      translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      translate.setTranslation('es', defaultLanguage);
      translate.setDefaultLang('es');
      localStorage.setItem('language', 'es');
    }
  }

  ngOnInit(): void {
    this._router.events.subscribe((event: any) => {
      if (event instanceof ResolveEnd) {
        const url = event.url;
        this.showOnlyMainContainer = this.show(url);
      }
    });
  }

  public show(url: string): boolean {
    const arrayNoShow = ['/login', '/select-role', '/reset-password'];

    const pass = arrayNoShow.includes(url);

    return pass;
  }

  // checkCollapsedSection(section: SideBarItemModel) {
  //   if (section && section.fatherSection !== null) {
  //     this.collapsedSections.push(section.fatherSection.id);
  //     this.checkCollapsedSection(section.fatherSection);
  //   }
  //   this.activateCollapse(this.menu, section.id);
  // }

  // activateCollapse(array: any, id: number) {
  //   array.some((o) =>
  //     o.id === id
  //       ? (o.collapsed = true)
  //       : this.activateCollapse(o.children || [], id)
  //   );
  // }

  onCollapse(event) {
    this.isCollapsed = event;
  }
}
