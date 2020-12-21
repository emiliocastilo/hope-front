import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from '../forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { ifError } from 'assert';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private current: MenuItemModel;
    private fullMenu: MenuItemModel;
    private homeUrl = '/hopes';

    public currentSection = new Subject<MenuItemModel>();
    public allSections: MenuItemModel[];
    public thereIsPatientSelected: boolean = false;

    constructor(private _httpClient: HttpClient, private _formService: FormsService, private _modalService: NgbModal, private translate: TranslateService, private _router: Router) {
        this.fullMenu = JSON.parse(localStorage.getItem('completeMenu'));
        this.thereIsPatientSelected = localStorage.getItem('thereIsPatientSelected') !== undefined && localStorage.getItem('thereIsPatientSelected') !== null;
        this.getSideBar();
    }

    private assignParentAndCollapseStatus(menu: MenuItemModel, root?: string) {
        menu.collapsed = true;
        menu.path = `${root ? root : ''}/${menu.id}`;
        if (menu.children && menu.children.length > 0) {
            menu.children.forEach((submenu) => {
                submenu.parentId = menu.id;
                submenu.path = `${menu.path}/${submenu.id}/`;
                submenu.collapsed = true;
                submenu.subsectionVisible = !submenu.url.includes('/pathology/patients') || (submenu.url.includes('/pathology/patients') && this.thereIsPatientSelected);
                if (submenu.children && submenu.children.length > 0) this.assignParentAndCollapseStatus(submenu, menu.path);
            });
        }
        return menu;
    }

    private findSectionByUrl(menu: Array<MenuItemModel>, url: string): MenuItemModel {
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

    public fillSections(section: MenuItemModel) {
        if (!this.allSections) this.allSections = [];
        section.visible = true;
        this.allSections.push(section);
        if (section.children && section.children.length > 0)
            section.children.forEach((child) => {
                child.parentId = section.id;
                this.fillSections(child);
            });
    }

    public setCurrentSection(section?: MenuItemModel) {
        if (!this._formService.getMustBeSaved() || (this._formService.getMustBeSaved() && this._formService.getSavedForm())) {
            if (!section) {
                if (!this.allSections) this.fillSections(this.fullMenu);
                section = this.allSections.filter((f) => f.url === '/hopes')[0];
            }

            const url = section.url === this.homeUrl ? this.homeUrl : section.url.split('/hopes')[1];

            this.current = section;
            localStorage.setItem('section', JSON.stringify(section));
            if (url) this._router.navigate([url]);
            this.currentSection.next(section);
        } else {
            if (section && section.url != '#' && section.url != this.current.url) {
                this.showModalConfirm(section);
            } else if (!section) {
                this.showModalConfirm();
            }
        }
    }

    public setCurrentSectionByUrl(url: string) {
        const menu: MenuItemModel = JSON.parse(localStorage.getItem('completeMenu'));
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
                const menu = this.assignParentAndCollapseStatus(response);
                localStorage.setItem('menu', JSON.stringify(response.children));
                localStorage.setItem('completeMenu', JSON.stringify(response));
                return menu;
            })
        );
    }
    private showModalConfirm(section?: MenuItemModel) {
        const modalRef = this._modalService.open(ConfirmModalComponent);
        modalRef.componentInstance.title = this.translate.instant('saveWarning');
        modalRef.componentInstance.messageModal = this.translate.instant('saveWarningMessage');
        modalRef.componentInstance.cancel.subscribe((event) => {
            modalRef.close();
            this._formService.setSavedForm(false);
        });
        modalRef.componentInstance.accept.subscribe((event) => {
            modalRef.close();
            this._formService.setSavedForm(true);
            section ? this.setCurrentSection(section) : this.setCurrentSection();
        });
    }
}
