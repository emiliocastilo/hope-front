import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from '../../services/roles/role-management.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { RolModel } from '../../models/rol.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  public columnsHeader: Array<string> = ['name', 'description'];
  public roles: Array<RolModel>;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public tableData: Array<RowDataModel>;
  public selectedItem: number;
  public selectedRole: RolModel;
  public isEditing = false;
  public paginationData: PaginationModel;
  private currentPage = 0;
  public modalForm: FormGroup;
  public actions: TableActionsModel[] = new TableActionsBuilder().getEditAndDelete();

  constructor(
    private _roleManagementService: RoleManagementService,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _notification: NotificationService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/management/roles')
    );

    this.paginationData = this._activatedRoute.snapshot.data.roles;

    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public onSelectedItem(event: number): void {
    this.selectedRole = this.roles[event];
    this.selectedItem = event;
    Object.keys(this.roles[event]).forEach((patientKey: string) => {
      if (this.modalForm.controls[patientKey]) {
        this.modalForm.controls[patientKey].setValue(
          this.roles[event][patientKey]
        );
      }
    });
  }

  public onSearch(event: string): void {
    this._roleManagementService.getRolSearches(event).subscribe((data: any) => {
      this.roles = data.content;
    });
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    this.refreshData(`&page=${page}`);
  }

  public showModal() {
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'rolesEditor';
    modalRef.componentInstance.title = 'Rol';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef);
    });
  }

  private saveOrUpdate(event: any, modalRef: any): void {
    const formValues: RolModel = event.value;
    let id;
    if (this.isEditing) {
      id = this.roles[this.selectedItem].id;
    }

    const rol: RolModel = new RolModel(
      id,
      formValues.name,
      formValues.description
    );

    this.selectedRole = new RolModel();
    if (this.isEditing) {
      this._roleManagementService.updateRole(rol).subscribe(
        (response) => {
          this.isEditing = false;
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    } else {
      this._roleManagementService.createRole(rol).subscribe(
        (response) => {
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    }
  }

  public newRole() {
    this.isEditing = false;
    this.selectedItem = null;
    this.modalForm.reset();
    this.showModal();
  }

  public onIconButtonClick(event: any) {
    if (event && event.type === 'edit') {
      this.editRole();
    } else if (event && event.type === 'delete') {
      this.showModalConfirm();
    }
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar Rol';
    modalRef.componentInstance.messageModal = `¿Estás seguro de que quieres eliminar el rol ${
      this.roles[this.selectedItem].name
    }?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deleteRole();
      modalRef.close();
    });
  }

  public editRole(): void {
    this.isEditing = true;
    this.showModal();
  }

  public deleteRole(): void {
    this._roleManagementService
      .deleteRole(this.roles[this.selectedItem].id)
      .subscribe(
        (response) => {
          this._notification.showSuccessToast('element_deleted');
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
  }

  private refreshData(query: string): void {
    this._roleManagementService.getRoles(query).subscribe((data) => {
      this.roles = data.content;
      if (this.paginationData.totalElements !== data.totalElements) {
        this.paginationData = data;
      }
    });
  }

  public onSort(event: any) {
    this.refreshData(`&sort=${event.column},${event.direction}`);
  }
}
