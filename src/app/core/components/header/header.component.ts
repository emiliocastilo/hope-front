import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() activateMenu: boolean;
  name: string = '';
  description: string = '';
  public crumbs: any = [
    {
      url: '/hopes/',
      title: 'Home',
    },
    {
      url: '/hopes/management',
      title: 'management',
    },
    {
      url: '/hopes/management/medics',
      title: 'medics',
    },
  ];

  constructor(
    private _loginSevice: LoginService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const rol =
      user.rolSelected && user.rolSelected.name ? user.rolSelected.name : '';
    this.name = `${user.username} (${rol})`;
    this.description = user.rolSelected.description;
  }

  submit() {
    this._loginSevice.logout();
  }
}
