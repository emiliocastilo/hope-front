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
import { PathologyModel } from 'src/app/modules/management/models/patients/pathology.model';
import { UserModel } from 'src/app/modules/management/models/user/user.model';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private current: MenuItemModel;
    private fullMenu: MenuItemModel;
    private homeUrl = '/hopes';
    private pathologyPath: string;

    public currentPathology: PathologyModel;
    public pathologyRoot: string;
    public currentSection = new Subject<MenuItemModel>();
    public allSections: MenuItemModel[] = [];
    public thereIsPatientSelected: boolean = false;

    constructor(private _httpClient: HttpClient, private _formService: FormsService, private _modalService: NgbModal, private translate: TranslateService, private _router: Router) {
        this.fullMenu = JSON.parse(localStorage.getItem('completeMenu'));
        this.thereIsPatientSelected = localStorage.getItem('selectedPatient') !== undefined && localStorage.getItem('selectedPatient') !== null;
        if (!this.fullMenu) this.getMenu().subscribe((response: MenuItemModel) => this.initialSetUp());
        else this.initialSetUp();
    }

    private initialSetUp() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.currentPathology = user.rolSelected.pathology;
            this.setPathology(user);
            if (this.allSections.length === 0) this.fillSections(this.fullMenu);
            const currentSection = JSON.parse(localStorage.getItem('section'));
            if (currentSection) this.setCurrentSection(currentSection);
        }
    }

    private setPathology(user?: any) {
        // TODO limpiar asignaciones code pathology
        if (!user) user = JSON.parse(localStorage.getItem('user'));
        this.currentPathology = user.rolSelected.pathology;
        const pathologyName = this.currentPathology.name.toLowerCase();
        const pathologyRoots = ['derma', 'vih'];
        this.currentPathology.code = pathologyRoots.filter((f) => pathologyName.includes(f))[0];
        this.pathologyRoot = `/hopes/pathology/`;
        console.log(`PATHOLOGY RADICAL: ${this.pathologyRoot}`);
    }

    private assignParentAndCollapseStatus(menu: MenuItemModel, root?: string) {
        menu.collapsed = true;
        menu.path = `${root ? root : ''}/${menu.id}`;
        this.thereIsPatientSelected = localStorage.getItem('selectedPatient') !== undefined && localStorage.getItem('selectedPatient') !== null;
        if (!this.pathologyPath) this.setPathologyPath();

        if (menu.children && menu.children.length > 0) {
            menu.children.forEach((submenu) => {
                submenu.parentId = menu.id;
                submenu.path = `${menu.path}/${submenu.id}`;
                submenu.collapsed = true;
                submenu.subsectionVisible = this.checkVisibleSection(submenu);
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
        if (section) {
            section.visible = true;
            this.allSections.push(section);
            if (section.children && section.children.length > 0)
                section.children.forEach((child) => {
                    child.parentId = section.id;
                    this.fillSections(child);
                });
        }
    }

    public checkVisibleSection(item: MenuItemModel) {
        if (!this.pathologyPath) this.pathologyPath = this.setPathologyPath();
        return !item.path.includes(this.pathologyPath) || (item.path.includes(this.pathologyPath) && this.thereIsPatientSelected);
    }

    private setPathologyPath(): string {
        let path = undefined;
        if (!this.allSections || this.allSections.length === 0) this.fillSections(this.fullMenu);

        if (this.allSections && this.allSections.length > 0) {
            const sect = this.allSections.filter((f) => f.url.includes(this.pathologyRoot));
            path = sect && sect.length > 0 && sect[0].path ? sect[0].path : undefined;
        }
        return path;
    }

    public setCurrentSection(section?: MenuItemModel) {
        if (!this._formService.getMustBeSaved() || (this._formService.getMustBeSaved() && this._formService.getSavedForm())) {
            // * SE PROCEDE AL CAMBIO DE SECCIÓN * //
            if (!this.allSections) this.fillSections(this.fullMenu);
            if (!this.pathologyPath) this.setPathologyPath();
            if (!section) section = this.allSections.filter((f) => f.title === 'Hopes')[0];

            const url = section && section.url === this.homeUrl ? this.homeUrl : section.url.split('/hopes')[1];

            if ((this.pathologyPath && !section.path.includes(this.pathologyPath)) || this.pathologyPath === section.path || (this.pathologyPath && section.path.includes(this.pathologyPath) && !this.thereIsPatientSelected)) {
                this.thereIsPatientSelected = false;
                localStorage.removeItem('selectedPatient');
                this.assignParentAndCollapseStatus(this.fullMenu);
            }

            this.current = section;
            localStorage.setItem('section', JSON.stringify(section));
            if (url) this._router.navigate([url]);
            this.currentSection.next(section);
        } else {
            // * SE EVITA EL CAMBIO DE SECCIÓN * //
            if (section && section.url != '#' && section.url != this.current.url) this.showModalConfirm(section);
            else if (!section) this.showModalConfirm();
        }
    }

    public setCurrentSectionByUrl(url: string) {
        const menu: MenuItemModel = JSON.parse(localStorage.getItem('completeMenu'));
        if (menu) this.setCurrentSection(this.findSectionByUrl(menu.children, url));
    }

    public getCurrentSection(): Observable<MenuItemModel> {
        return this.currentSection.asObservable();
    }

    public getMenu(rolChanged?: boolean): Observable<MenuItemModel> {
        return new Observable<MenuItemModel>((obs) => {
            if (this.fullMenu && !rolChanged) obs.next(this.fullMenu);
            else {
                this._httpClient
                    .get<MenuItemModel>('/menus')
                    .pipe(
                        map((response) => {
                            this.allSections = [];
                            this.fullMenu = response;
                            this.setPathology();
                            this.fillSections(response);
                            this.pathologyPath = this.setPathologyPath();
                            const menu = this.assignParentAndCollapseStatus(response);
                            localStorage.setItem('menu', JSON.stringify(response.children));
                            localStorage.setItem('completeMenu', JSON.stringify(response));
                            return menu;
                        })
                    )
                    .subscribe((menu) => obs.next(menu));
            }
        });

        return;
    }
    private showModalConfirm(section?: MenuItemModel) {
        const modalRef = this._modalService.open(ConfirmModalComponent);
        modalRef.componentInstance.title = this.translate.instant('saveWarning');
        modalRef.componentInstance.messageModal = this.translate.instant('saveWarningMessage');
        
        modalRef.componentInstance.cancel.subscribe((event) => {
            modalRef.close();
            this._formService.setSavedStatusForm(false);
        });

        modalRef.componentInstance.accept.subscribe((event) => {
            modalRef.close();
            this._formService.setSavedStatusForm(true);
            section ? this.setCurrentSection(section) : this.setCurrentSection();
        });
    }
}
