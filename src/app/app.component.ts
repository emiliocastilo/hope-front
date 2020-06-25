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

        if (url) {
          this.getMenu(url);
        }
      }
    });
  }

  public show(url: string): boolean {
    const arrayNoShow = ['/login', '/select-role'];

    const pass = arrayNoShow.includes(url);

    return pass;
  }

  private getSectionById(id: number): void {
    this._sectionsService.getSectionById(id).subscribe((response) => {
      this.checkCollapsedSection(response);
      this.crumbs = SectionActionBuilder.getCrumbs(response);
    });
  }

  checkCollapsedSection(section: SideBarItemModel) {
    if (section && section.fatherSection !== null) {
      this.collapsedSections.push(section.fatherSection.id);
      this.checkCollapsedSection(section.fatherSection);
    }
    this.activateCollapse(this.menu, section.id);
  }

  activateCollapse(array: any, id: number) {
    array.some((o) =>
      o.id === id
        ? (o.collapsed = true)
        : this.activateCollapse(o.children || [], id)
    );
  }

  private getMenu(url: string) {
    const localMenu: Array<any> = JSON.parse(localStorage.getItem('menu'));
    if (!localMenu) {
      if (!['/login', '/select-role'].includes(url)) {
        this._sideBar.getSideBar().subscribe((response) => {
          if (response.children) {
            this.parseMenu(response.children, url);
          }
        });
      }
    } else {
      this.fetchLocalMenu(url);
    }
  }

  parseMenu(menu: any, url: string) {
    menu.forEach((entry) => {
      if (entry.title === 'Paciente') {
        localStorage.setItem('patientMenu', JSON.stringify(menu));
        entry.children = [];
      }
    });
    localStorage.setItem('menu', JSON.stringify(menu));
    this.fetchLocalMenu(url);
  }

  fetchLocalMenu(url) {
    if (!url.includes('/pathology/patients/')) {
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.menu = JSON.parse(localStorage.getItem('patientMenu'));
    }
    this.level = 1;
    this.generateCrumbs(url);
  }

  onCollapse(event) {
    this.isCollapsed = event;
  }

  private generateCrumbs(url: string) {
    if (url !== '/') {
      const currenSelected = SectionActionBuilder.findSection(
        'url',
        this.menu,
        url
      );
      this.selectedSection = currenSelected;
    }

    if (this.selectedSection && this.selectedSection.id) {
      this.getSectionById(this.selectedSection.id);
    }
  }
}
