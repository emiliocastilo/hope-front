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
import { HospitalModel } from '../../../../core/models/hospital/hospital.model';
import { ServiceModel } from '../../../../core/models/service/service.model';
import { PatientModel } from '../../models/patients/patient.model';
import { PathologyModel } from '../../models/patients/pathology.model';
import { HospitalService } from '../../../../core/services/hospital/hospital.service';
import { UserModel } from '../../models/user/user.model';

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
  public selectedRole: RolModel = new RolModel();
  public isEditing = false;
  public users: UserModel[] = [];
  public paginationData: PaginationModel;
  private currentPage = 0;
  public hospitals: HospitalModel[] = [];
  public services: ServiceModel[] = [];
  private pathologies: PathologyModel[] = [];
  private pathologiesIds: string[] = [];
  public selectedPatient: PatientModel = new PatientModel();
  public selectedUser: any;
  private colOrder: any;
  private typeOrder: any;
  public modalForm: FormGroup;
  public actions: TableActionsModel[] = new TableActionsBuilder().getEditAndDelete();
  private itemsPerPage: number;

  constructor(
    private _roleManagementService: RoleManagementService,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _notification: NotificationService,
    private _formBuilder: FormBuilder,
    private _hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.paginationData = this._activatedRoute.snapshot.data.roles;
    this.services = this._activatedRoute.snapshot.data.services;
    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.users = this._activatedRoute.snapshot.data.users.content;
    this.pathologies = this._activatedRoute.snapshot.data.services[0].pathologies;

    this.selectedUser = JSON.parse(localStorage.getItem('user'));
    const userHospital: any = this.hospitals.find(
      (hospital) => hospital.id === this.selectedUser.rolSelected.hospital.id
    );
    this.hospitals = [userHospital];
    this.getPathologiesIds();
    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      hospital: ['', Validators.required],
      serviceDTO: ['', Validators.required],
      pathology: ['', Validators.required],
    });
  }

  public onSelectedItem(event: any): void {
    this.selectedItem = event;
    this.selectedRole.setValuesFromObject(this.roles[event]);

    Object.keys(this.roles[event]).forEach((roleKey: string) => {
      if (this.modalForm.controls[roleKey]) {
        this.modalForm.controls[roleKey].setValue(this.roles[event][roleKey]);
      }
    });
  }
  public getPathologiesIds() {
    this.pathologies.forEach((pathology) => {
      this.pathologiesIds.push(pathology.id);
    });
  }

  public onSearch(event: string): void {
    this._roleManagementService
      .getRolSearches(`${event}&size=${this.paginationData.size}`)
      .subscribe((data: any) => {
        console.log(data);
        this.roles = data.content;
        this.paginationData.number = 1;
        this.paginationData.size = data.size;
        this.paginationData.totalElements = data.totalElements;
      });
  }

  public selectPage(page: number): void {
    let query: string;
    if (this.colOrder && this.typeOrder) {
      query = `&sort=${this.colOrder},${this.typeOrder}&page=${page}`;
    } else {
      query = `&page=${page}`;
    }
    this.currentPage = page;
    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }
    this.refreshData(query);
  }

  public showModal() {
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    let options: any = {};
    if (this.selectedItem !== null) {
      options = {
        hospital: {
          options: this.hospitals,
          optionSelected: this.selectedRole.hospital
            ? this.selectedRole.hospital.id
            : null,
        },
        serviceDTO: {
          options: this.services,
          optionSelected: this.selectedRole.service
            ? this.selectedRole.service.id
            : null,
        },
        pathology: {
          options: this.pathologies,
          optionSelected: this.selectedRole.pathology
            ? this.selectedRole.pathology.id
            : null,
        },
      };
    } else {
      options = {
        hospital: { options: this.hospitals },
        serviceDTO: { options: this.services },
        pathology: { options: this.pathologies },
      };
    }
    modalRef.componentInstance.id = 'rolesEditor';
    modalRef.componentInstance.title = 'Rol';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = options;
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
      formValues.description,
      formValues.service,
      formValues.hospital,
      formValues.pathology
    );
    rol.setValuesFromDinamicForm(formValues);
    this.selectedRole = new RolModel();
    if (this.isEditing) {
      this._roleManagementService.updateRole(rol).subscribe(
        (response) => {
          this._notification.showSuccessToast('elementUpdated');
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
          this._notification.showSuccessToast('elementCreated');
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
          this._notification.showSuccessToast('elementDeleted');
          this.refreshData(`&page=${this.currentPage}`);
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
  }

  private refreshData(query: string): void {
    const user_aux = JSON.parse(localStorage.getItem('user') || '{}');
    this._roleManagementService
      .getRoles(user_aux['rolSelected']['id'], query)
      .subscribe((data) => {
        this.roles = data.content;
        if (this.paginationData.totalPages !== data.totalPages) {
          this.paginationData = data;
        }
        if (this.roles.length === 0 && this.paginationData.totalElements > 0) {
          this.currentPage = this.currentPage - 1;
          this.selectPage(this.currentPage);
        }
      });
  }

  public onSort(event: any) {
    this.colOrder = event.column;
    this.typeOrder = event.direction;
    let query = `&sort=${this.colOrder},${this.typeOrder}&page=${this.currentPage}`;

    if (this.itemsPerPage) {
      query = `${query}&size=${this.itemsPerPage}`;
    }

    this.refreshData(query);
  }

  public selectItemsPerPage(number: number) {
    this.itemsPerPage = number;
    this.selectPage(0);
  }
}
