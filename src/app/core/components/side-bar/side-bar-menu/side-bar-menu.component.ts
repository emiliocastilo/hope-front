import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent implements OnInit {
  public LEVEL_ONE = 1;

  @Input() menu: Array<SideBarItemModel>;
  @Input() selected: SideBarItemModel;
  @Input() level: number;
  @Input() collapsed: boolean;
  public icons: Array<string>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.icons = ['cogs', 'dashboard', 'calendar-o', 'bell-o', 'user-o'];
    if (!this.level) {
      this.level = this.LEVEL_ONE;
    }
  }

  public toggleColapseMenu(menu: SideBarItemModel): void {
    menu.collapsed = !menu.collapsed;
  }
}
