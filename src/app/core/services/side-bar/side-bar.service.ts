import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';

@Injectable({
    providedIn: 'root',
})
export class SideBarService {
    constructor(private _httpClient: HttpClient) { }

    private current: SideBarItemModel;
    public currentSection = new Subject<SideBarItemModel>();
    public event = new Subject();

    setCurrentSection (section: SideBarItemModel) {
        console.log(section);

        if (section) localStorage.setItem('section', JSON.stringify(section));
        else localStorage.removeItem('section');

        this.current = section;
        this.currentSection.next(section);
    }

    setCurrentUrl (url: string) {
        debugger
        const menu: SideBarItemModel = JSON.parse(localStorage.getItem('completeMenu'));
        if (menu) { this.setCurrentSection(this.findSection(menu.children, url)); }
    }

    private findSection (menu: Array<SideBarItemModel>, url: string): SideBarItemModel {
        menu.forEach(item => {
            if (url.indexOf('hopes') < 0) {
                if (!url.startsWith('/')) url = '/hopes/' + url;
                else url = '/hopes' + url;
            }

            if (item.url === url) this.current = item;
            if (item.children && item.children.length > 0) this.findSection(item.children, url);
        });
        return this.current;
    };

    getCurrentSection (): Observable<SideBarItemModel> {
        return this.currentSection.asObservable();
    }

    public getSideBar () {
        return this._httpClient.get('/menus').toPromise();
    }
}
