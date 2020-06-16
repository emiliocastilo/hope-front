import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() menuCollapsed = false;
  @Input() crumbs: SideBarItemModel[];
  name: string = '';
  description: string = '';

  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const rol =
      user.rolSelected && user.rolSelected.name ? user.rolSelected.name : '';
    this.name = `${user.username} (${rol})`;
    this.description = user.rolSelected.description;
  }
}
