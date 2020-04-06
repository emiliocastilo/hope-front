import { Component } from '@angular/core';
import { LoginModel } from './core/models/login.model';
import { LoginService } from './core/services/login/login.service';
import { Router } from '@angular/router';

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
    private _loginService: LoginService
  ) {
    this._loginService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['/login']);
  }
}
