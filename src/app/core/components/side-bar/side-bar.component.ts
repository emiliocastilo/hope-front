import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() menu: Array<SideBarItemModel>;
  @Input() selected: SideBarItemModel;
  @Input() currentMenuId: number;
  name: string;
  rol: string;

  collapsed = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.rol =
      user.rolSelected && user.rolSelected.name ? user.rolSelected.name : '';
    this.name = user.username;
  }

  showSideBar(menuArray: SideBarItemModel[]): SideBarItemModel[] {
    const rootMenu = menuArray.filter(
      (value: SideBarItemModel) => value.id === this.currentMenuId
    );
    return rootMenu;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    this.loginService.logout();
  }
}
