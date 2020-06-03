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

import { StorageService } from 'src/app/core/services/localstorage/storage.service';
import menu from 'src/app/core/mocks/menu';

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
          this.getMenu();

          if (!this.showOnlyMainContainer && this.menu) {
            this.generateCrumbs(url);
          }
        }
      }
    });
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['/login']);
  }

  public show(url: string): boolean {
    const arrayNoShow = ['/login', '/select-role'];

    const pass = arrayNoShow.includes(url);

    return pass;
  }

  private getSectionById(id: number): void {
    this._sectionsService.getSectionById(id).subscribe((response) => {
      this.crumbs = new SectionActionBuilder(this.menu).getCrumbs(response);
    });
  }

  private getMenu(): void {
    new StorageService().changes.subscribe((change) => {
      console.log(change);
    });
    this.menu = JSON.parse(localStorage.getItem('menu'))
      ? JSON.parse(localStorage.getItem('menu'))
      : menu.children;
    // if( !this.showOnlyMainContainer ) {
    //   this._sideBar.getSideBar().subscribe((response) => {
    //     if(response.children) {
    //       this.menu = response.children
    //       localStorage.setItem(
    //         'menu',
    //         JSON.stringify(this.menu)
    //       );
    //     }
    //   });
    // }
  }

  private generateCrumbs(url: string) {
    const currenSelected = new SectionActionBuilder(this.menu).getSelectedByUrl(
      url
    );
    console.log(currenSelected);
    if (this.selectedSection && currenSelected) {
      if (this.selectedSection.id !== currenSelected.id) {
        this.selectedSection = currenSelected;
        this.getSectionById(this.selectedSection.id);
      }
    } else {
      this.selectedSection = currenSelected;
      if (this.selectedSection) {
        this.getSectionById(this.selectedSection.id);
      }
    }
  }
}
