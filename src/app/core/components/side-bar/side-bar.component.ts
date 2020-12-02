import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { MenuItemModel } from '../../models/menu-item/menu-item.model';
import { LoginService } from '../../services/login/login.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
    private currentRoleSubscription: Subscription;
    public menu: MenuItemModel[];

    @Input() currentMenuId: number;
    @Input() level: number;
    @Output() collapse: EventEmitter<boolean> = new EventEmitter();

    name: string;
    rol: string;

    public collapsed = false;
    public loaded: Boolean = false;

    constructor(
        private _router: Router,
        private _modalService: NgbModal,
        private loginService: LoginService,
        private _sidebar: MenuService
    ) { }

    ngOnInit (): void {
        const user = JSON.parse(localStorage.getItem('user'));
        this.menu = JSON.parse(localStorage.getItem('menu'));

        if (!this.menu || this.menu.length === 0) {
            this._sidebar.getSideBar().subscribe(
                (response: MenuItemModel) => {
                    this.loaded = true;
                    this.menu = response.children;
                    localStorage.setItem('menu', JSON.stringify(response.children));
                    localStorage.setItem('completeMenu', JSON.stringify(response))
                }
            );
        }

        if (user) {
            this.rol = user.rolSelected && user.rolSelected.name ? user.rolSelected.name : '';
            this.name = user.username;
        }
    }

    showSideBar (menuArray: MenuItemModel[]): MenuItemModel[] {
        const rootMenu = menuArray.filter(
            (value: MenuItemModel) => value.id === this.currentMenuId
        );
        return rootMenu;
    }

    toggleCollapse (): void {
        this.collapsed = !this.collapsed;
        this.collapse.emit(this.collapsed);
    }

    logout (): void {
        const modalRef = this._modalService.open(ConfirmModalComponent);

        modalRef.componentInstance.title = 'Salir';
        modalRef.componentInstance.messageModal =
            '¿Estas seguro de que quieres salir?';
        modalRef.componentInstance.cancel.subscribe((event) => {
            modalRef.close();
        });
        modalRef.componentInstance.accept.subscribe((event) => {
            localStorage.clear();
            modalRef.close();
            this.loginService.logout();
        });
    }

    public goToMyAccount (): void {
        this._router.navigate(['my-account']);
    }

    ngOnDestroy () {
        this.currentRoleSubscription.unsubscribe();
    }
}
