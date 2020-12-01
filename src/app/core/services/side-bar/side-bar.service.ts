import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';

@Injectable({
    providedIn: 'root',
})
export class SideBarService {
    constructor(private _httpClient: HttpClient) { }

    private current: SideBarItemModel;
    public currentSection = new Subject<SideBarItemModel>();
    public event = new Subject();

    private assignCollapseState (menu: SideBarItemModel) {
        menu.collapsed = true;
        if (menu.children && menu.children.length > 0) {
            menu.children.forEach(menu => {
                menu.collapsed = true;
                if (menu.children && menu.children.length > 0) this.assignCollapseState(menu);
            });
        }
        return menu;
    }

    setCurrentSection (section: SideBarItemModel) {
        console.log(section);

        if (section) localStorage.setItem('section', JSON.stringify(section));
        else localStorage.removeItem('section');

        this.current = section;
        this.currentSection.next(section);
    }

    setCurrentUrl (url: string) {
        const menu: SideBarItemModel = JSON.parse(
            localStorage.getItem('completeMenu')
        );
        if (menu) {
            this.setCurrentSection(this.findSectionByUrl(menu.children, url));
        }
    }

    private findSectionByUrl (
        menu: Array<SideBarItemModel>,
        url: string
    ): SideBarItemModel {
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

    getCurrentSection (): Observable<SideBarItemModel> {
        return this.currentSection.asObservable();
    }

    public getSideBar (): Observable<SideBarItemModel> {
        return this._httpClient.get<SideBarItemModel>('/menus').pipe(
            map(response => this.assignCollapseState(response))
        );
    }

}
