import { Component, Input } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() activateMenu: boolean;

  constructor(public _loginSevice: LoginService) {

  }
  submit() {
    this._loginSevice.logout();
  }
}
