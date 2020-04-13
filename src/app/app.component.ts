import { Component } from '@angular/core';
import { LoginModel } from './core/models/login.model';
import { LoginService } from './core/services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from "./../assets/i18n/es.json";

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'apps-hopes-front';

  currentUser: LoginModel;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private translate: TranslateService
  ) {
    this._loginService.currentUser.subscribe(x => this.currentUser = x);

    if (localStorage.getItem('language')) {
      translate.setTranslation('es', defaultLanguage);
      translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      translate.setTranslation('es', defaultLanguage);
      translate.setDefaultLang('es');
      localStorage.setItem('language', 'es');
    }
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['/login']);
  }
}
