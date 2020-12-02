import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private current: MenuItemModel;
    public currentSection = new Subject<MenuItemModel>();

    constructor(private _httpClient: HttpClient) { }

    private assignParentAndCollapseStatus (menu: MenuItemModel) {
        menu.collapsed = true;
        if (menu.children && menu.children.length > 0) {
            menu.children.forEach(submenu => {
                submenu.parent = {
                    id: menu.id,
                    title: menu.title,
                    path: menu.path,
                    url: menu.url,
                    collapsed: menu.collapsed
                };
                submenu.collapsed = true;
                if (submenu.children && submenu.children.length > 0) this.assignParentAndCollapseStatus(submenu);
            });
        }
        return menu;
    }

    private findSectionByUrl (menu: Array<MenuItemModel>, url: string): MenuItemModel {
        menu.forEach((item) => {
            if (url.indexOf('hopes') < 0) {
                if (!url.startsWith('/')) url = '/hopes/' + url;
                else url = '/hopes' + url;
            }

            if (item.url === url) this.current = item;
            if (item.children && item.children.length > 0) this.findSectionByUrl(item.children, url);
        });
        return this.current;
    }

    public setCurrentSection (section: MenuItemModel) {
        localStorage.setItem('section', JSON.stringify(section));
        this.current = section;
        this.currentSection.next(section);
    }

    public setCurrentSectionByUrl (url: string) {
        const menu: MenuItemModel = JSON.parse(localStorage.getItem('completeMenu'));
        if (menu) this.setCurrentSection(this.findSectionByUrl(menu.children, url));
    }

    public getCurrentSection (): Observable<MenuItemModel> {
        return this.currentSection.asObservable();
    }

    public getSideBar (): Observable<MenuItemModel> {
        return this._httpClient.get<MenuItemModel>('/menus').pipe(
            map(response => this.assignParentAndCollapseStatus(response))
        );
    }

}
