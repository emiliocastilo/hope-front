import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { Router } from '@angular/router';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
  selector: 'side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent implements OnInit {
  public LEVEL_ONE = 1;
  public ICONS = ['settings', 'bar-chart-2', 'calendar', 'bell', 'users'];

  @Input() menu: Array<SideBarItemModel>;
  @Input() selected: SideBarItemModel;
  @Input() level: number;
  @Input() collapsed: boolean;
  @Output() nav: EventEmitter<any> = new EventEmitter();
  public icons: Array<string>;

  constructor(
    private _sidebar: SideBarService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.icons = this.ICONS;
    if (!this.level) {
      this.level = this.LEVEL_ONE;
    }
  }

  goUrl(section: SideBarItemModel) {
    event.preventDefault();
    const url = section.url.split('hopes')[1];
    this._router.navigate([url]);
    this._sidebar.event.next(section);
  }

  public toggleColapseMenu(menu: SideBarItemModel): void {
    menu.collapsed = !menu.collapsed;
    localStorage.setItem('collapsedSection', JSON.stringify(menu));
  }
}
