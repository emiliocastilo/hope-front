import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';
import { LoginService } from '../../services/login/login.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { Subscription } from 'rxjs';
import { CurrentRoleListenerService } from '../../services/current-role-listener/current-role-listener.service';
import { RolModel } from 'src/app/modules/management/models/rol.model';

@Component({
    selector: 'side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
    public menu: MenuItemModel[];
    private currentRoleSubscription: Subscription;

    @Input() currentMenuId: number;
    @Input() level: number;
    @Output() collapse: EventEmitter<boolean> = new EventEmitter();

    name: string;
    rol: string;

    public collapsed = false;
    public loaded: Boolean = false;
    public isMobileScreen: boolean;

    constructor(private _router: Router, private _modalService: NgbModal, private loginService: LoginService, private _menuService: MenuService, private _roleListener: CurrentRoleListenerService) {}

    ngOnInit(): void {
        const user = JSON.parse(localStorage.getItem('user'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
        this.currentRoleSubscription = this._roleListener.getCurrentRole().subscribe((role: RolModel) => (this.rol = role.name));

        if (!this.menu || this.menu.length === 0) {
            this._menuService.getMenu(false).subscribe((response: MenuItemModel) => {
                this.loaded = true;
                this.menu = response.children;
            });
        }
        if (!this.menu || this.menu.length === 0) this.getMenu(false);

        if (user) {
            this.rol = user.rolSelected && user.rolSelected.name ? user.rolSelected.name : '';
            this.name = user.username;
        }

        this.currentRoleSubscription = this._roleListener.getCurrentRole().subscribe((response) => {
            this.rol = response.name;
            this.getMenu(true);
        });
        this.isMobileScreen = this._menuService.isMobileScreen();
    }

    private getMenu(roleChanged: boolean) {
        this._menuService.getMenu(roleChanged).subscribe((response: MenuItemModel) => {
            this.loaded = true;
            this.menu = response.children;
            this._menuService.setCurrentSection(undefined);
        });
    }

    showSideBar(menuArray: MenuItemModel[]): MenuItemModel[] {
        const rootMenu = menuArray.filter((value: MenuItemModel) => value.id === this.currentMenuId);
        return rootMenu;
    }

    toggleCollapse(): void {
        if (this.isMobileScreen) {
            this._menuService.closeMenu();
        } else {
            this.collapsed = !this.collapsed;
            this.collapse.emit(this.collapsed);
        }
    }

    logout(): void {
        const modalRef = this._modalService.open(ConfirmModalComponent);

        modalRef.componentInstance.title = 'Salir';
        modalRef.componentInstance.messageModal = '¿Estas seguro de que quieres salir?';
        modalRef.componentInstance.cancel.subscribe((event) => {
            modalRef.close();
        });
        modalRef.componentInstance.accept.subscribe((event) => {
            localStorage.clear();
            modalRef.close();
            this._menuService.closeMenu();
            this.loginService.logout();
        });
    }

    public goToMyAccount(): void {
        this._router.navigate(['my-account']);
    }

    ngOnDestroy() {
        if (this.currentRoleSubscription) this.currentRoleSubscription.unsubscribe();
    }
}
