import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from '../../services/roles/role-management.service';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { RolModel } from '../../models/rol.model';
import { ColumnDataModel } from 'src/app/core/models/table/colum-data.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';

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
  public isEditing: boolean = false;
  public paginationData: PaginationModel;
  private currentPage: number = 0;
  public modalForm: FormGroup;

  constructor(
    private _roleManagementService: RoleManagementService,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _toastr: ToastrService,
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

  public prepareTableData(): Array<RowDataModel> {
    const rows = this.roles
      ? this.roles.map((rol) => {
          return this._adaptModelToRow(rol);
        })
      : [];
    return rows;
  }

  public onSelectedItem(event: number): void {
    this.selectedRole = this.roles[event];
    this.selectedItem = event;
    Object.keys(this.roles[event]).map((patientKey: string) => {
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
        (error) => {
          this._toastr.error(error.message);
        }
      );
    } else {
      this._roleManagementService.createRole(rol).subscribe(
        (response) => {
          modalRef.close();
          this.refreshData(`&page=${this.currentPage}`);
        },
        (error) => {
          this._toastr.error(error.message);
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
    modalRef.componentInstance.messageModal = `Estas seguro de que quieres eliminar el rol 
      ${this.roles[this.selectedItem].name}?`;
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
          this._toastr.success('El rol se ha borrado correctamente');
          this.refreshData(`&page=${this.currentPage}`);
        },
        (error) => {
          this._toastr.error(error.message);
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

  private _adaptModelToRow(rol: RolModel): RowDataModel {
    const row = new RowDataModel();
    row.pushColumn(new ColumnDataModel('text', rol.name));
    row.pushColumn(new ColumnDataModel('text', rol.description));
    // row.pushColumn(
    //   new ColumnDataModel('iconButtons', {
    //     iconButtons: [
    //       {
    //         type: 'edit',
    //         icon: 'fa-lg fa-pencil',
    //       },
    //       {
    //         type: 'delete',
    //         icon: 'fa-lg fa-window-close cfa-red',
    //       },
    //     ],
    //   })
    // );
    return row;
  }
}
