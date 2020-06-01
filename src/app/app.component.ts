import { Component, OnInit } from '@angular/core';
import { LoginModel } from './core/models/login/login.model';
import { LoginService } from './core/services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from './../assets/i18n/es.json';
import { SectionModel } from './modules/management/models/section.model';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'apps-hopes-front';

  currentUser: LoginModel;
  public menu: SectionModel[];
  public modules: Array<HomeDashboardModule>;

  constructor(
    public _router: Router,
    private _loginService: LoginService,
    private translate: TranslateService
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
    const rootMenu = JSON.parse(localStorage.getItem('menu'));
    this.menu = rootMenu.filter((item) => item.url.endsWith('dashboard'));
    if (this.menu.length) {
      this.modules = rootMenu.find((item) =>
        item.url.endsWith('dashboard')
      ).children;
    }
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['/login']);
  }

  public showHeader(): boolean {
    return !this._router.url.includes('login');
  }

  public showSidebar(): boolean {
    console.log(this._router);

    return !this._router.url.includes('login') || this._router.url !== '/';
  }
}
