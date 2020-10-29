import { Component, OnInit } from '@angular/core';
import { LoginModel } from './core/models/login/login.model';
import { LoginService } from './core/services/login/login.service';
import { Router, ResolveEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from './../assets/i18n/es.json';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'apps-hopes-front';
  public showOnlyMainContainer: boolean = true;

  currentUser: LoginModel;
  public isCollapsed: boolean;

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

  onCollapse(event) {
    this.isCollapsed = event;
  }
}
