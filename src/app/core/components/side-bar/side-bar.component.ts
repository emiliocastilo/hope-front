import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { LoginService } from '../../services/login/login.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() menu: Array<SideBarItemModel>;
  @Input() selected: SideBarItemModel;
  @Input() currentMenuId: number;
  @Input() level: number;
  @Output() collapse: EventEmitter<boolean> = new EventEmitter();
  name: string;
  rol: string;

  collapsed = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _modalService: NgbModal,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.rol =
        user.rolSelected && user.rolSelected.name ? user.rolSelected.name : '';
      this.name = user.username;
    }
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
      modalRef.close();
      this.loginService.logout();
    });
  }
}
