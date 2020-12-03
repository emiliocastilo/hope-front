import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SectionModel } from 'src/app/modules/management/models/section.model';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private current: MenuItemModel;

  public currentSection = new Subject<MenuItemModel>();
  public allSections: MenuItemModel[];

  constructor(private _httpClient: HttpClient) {
    if (localStorage.getItem('allsections'))
      this.allSections = JSON.parse(localStorage.getItem('allsections'));
    else this.getSideBar();
  }

  private assignParentAndCollapseStatus(menu: MenuItemModel) {
    menu.collapsed = true;
    console.log(menu.parent);
    if (menu.children && menu.children.length > 0) {
      menu.children.forEach((submenu) => {
        // submenu.parent = this.allSections.filter(f => f.id === menu.id)[0];
        // console.log(this.allSections.filter(f => f.id === menu.id)[0]);
        submenu.parent = {
          id: menu.id,
          title: menu.title,
          path: menu.path,
          url: menu.url,
          collapsed: menu.collapsed,
        };
        submenu.collapsed = true;
        if (submenu.children && submenu.children.length > 0)
          this.assignParentAndCollapseStatus(submenu);
      });
    }
    return menu;
  }

  private findSectionByUrl(
    menu: Array<MenuItemModel>,
    url: string
  ): MenuItemModel {
    menu.forEach((item) => {
      if (url.indexOf('hopes') < 0) {
        if (!url.startsWith('/')) url = '/hopes/' + url;
        else url = '/hopes' + url;
      }

      if (item.url === url) this.current = item;
      if (item.children && item.children.length > 0)
        this.findSectionByUrl(item.children, url);
    });
    return this.current;
  }

  private fillSections(section: MenuItemModel) {
    this.allSections.push(section);
    if (section.children && section.children.length > 0)
      section.children.forEach((child) => {
        child.parent = {
          id: section.id,
          title: section.title,
          path: section.path,
          url: section.url,
        };
        this.fillSections(child);
      });
    localStorage.setItem('allsections', JSON.stringify(this.allSections));
  }

  public setCurrentSection(section: MenuItemModel) {
    localStorage.setItem('section', JSON.stringify(section));
    this.current = section;
    this.currentSection.next(section);
  }

  public setCurrentSectionByUrl(url: string) {
    const menu: MenuItemModel = JSON.parse(
      localStorage.getItem('completeMenu')
    );
    if (menu) this.setCurrentSection(this.findSectionByUrl(menu.children, url));
  }

  public getCurrentSection(): Observable<MenuItemModel> {
    return this.currentSection.asObservable();
  }

  public getSideBar(): Observable<MenuItemModel> {
    return this._httpClient.get<MenuItemModel>('/menus').pipe(
      map((response) => {
        this.allSections = [];
        this.fillSections(response);
        return this.assignParentAndCollapseStatus(response);
      })
    );
  }
}
