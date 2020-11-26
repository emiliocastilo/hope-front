import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { LoginService } from '../../services/login/login.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SideBarService } from '../../services/side-bar/side-bar.service';
import { CurrentRoleListenerService } from '../../services/current-role-listener/current-role-listener.service';
import { Subscription } from 'rxjs';
import { RolModel } from 'src/app/modules/management/models/rol.model';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  private currentRoleSubscription: Subscription;

  menu: any;
  @Input() currentMenuId: number;
  @Input() level: number;
  @Output() collapse: EventEmitter<boolean> = new EventEmitter();
  name: string;
  rol: string;

  collapsed = false;
  public reloading: Boolean = false;

  constructor(
    private _router: Router,
    private _modalService: NgbModal,
    private loginService: LoginService,
    private _sidebar: SideBarService,
    private _roleListener: CurrentRoleListenerService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);
    this.detectRouterChanges();
    this.listenEvents();

    if (user) {
      this.rol =
        user.rolSelected && user.rolSelected.name ? user.rolSelected.name : '';
      this.name = user.username;
    }

    if (!this.menu) {
      this.fetchMenu();
    }

    this.currentRoleSubscription = this._roleListener
      .getCurrentRole()
      .subscribe((role: RolModel) => {
        user.rolSelected = role;
        this.rol = role.name;
        this.fetchMenu();
      });
  }

  listenEvents() {
    this._sidebar.event.subscribe((events) => {
      if (events === 'fetch menu') {
        setTimeout(() => {
          this.fetchMenu();
        }, 500);
      }
    });
  }

  detectRouterChanges() {
    this._router.events.subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      if (url) {
        this.fetchLocalMenu(event.urlAfterRedirects);
      }
    });
  }

  async fetchMenu() {
    const response: any = await this._sidebar.getSideBar();
    localStorage.setItem('completeMenu', JSON.stringify(response));
    this.parseMenu();
  }

  parseMenu() {
    const menu = JSON.parse(localStorage.getItem('completeMenu')).children;
    menu.forEach((entry) => {
      if (entry.title === 'Paciente') {
        localStorage.setItem('patientMenu', JSON.stringify(menu));
        entry.children = [];
      }
    });
    localStorage.setItem('menu', JSON.stringify(menu));
    this.fetchLocalMenu(this._router.url);
  }

  fetchLocalMenu(url: string) {
    if (!url.includes('/pathology/patients/')) {
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.menu = JSON.parse(localStorage.getItem('patientMenu'));
    }
    //this.level = 1;
  }

  showSideBar(menuArray: SideBarItemModel[]): SideBarItemModel[] {
    const rootMenu = menuArray.filter(
      (value: SideBarItemModel) => value.id === this.currentMenuId
    );
    return rootMenu;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapse.emit(this.collapsed);
  }

  logout(): void {
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

  public goToMyAccount(): void {
    this._router.navigate(['my-account']);
  }

  ngOnDestroy() {
    this.currentRoleSubscription.unsubscribe();
  }
}
