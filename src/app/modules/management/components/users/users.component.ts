import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'src/app/core/components/dynamic-form/dynamic-form.component';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { UsersModel } from 'src/app/modules/management/models/user/user.model';
import { UsersService } from 'src/app/modules/management/services/medic/users.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServiceModel } from 'src/app/core/models/service/service.model';
import { TranslateService } from '@ngx-translate/core';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { RolModel } from '../../models/rol.model';
import { UserModel } from '../../../../core/models/user/user.model';
import { RoleService } from '../../../../core/services/role/role.service';
import { forkJoin } from 'rxjs';
import { SectionModel } from '../../models/section.model';
import { RoleManagementService } from '../../services/roles/role-management.service';
import { SectionsService } from '../../services/sections/sections.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  constructor(
    private _modalService: NgbModal,
    private _notification: NotificationService,
    public _usersService: UsersService,
    public _translate: TranslateService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private rolService: RoleManagementService,
    private sectionsService: SectionsService
  ) {}
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public modalForm: FormGroup;
  public columHeaders = ['name', 'surname', 'dni', 'phone', 'collegeNumber'];
  public hospitals: HospitalModel[] = [];
  public isDetailModal = false;
  public isEditModal = false;
  public isEditing = false;
  public isNewModal = false;
  public users: UsersModel[] = [];
  public selectedItem: number;
  public services: ServiceModel[] = [];
  public paginationData: PaginationModel;
  private currentPage: number = 0;
  private colOrder: any;
  private typeOrder: any;
  public selectedUsers = new UsersModel();
  public selectedUser: any;
  public actions: TableActionsModel[] = new TableActionsBuilder().getEditAndDelete();
  private itemsPerPage: number;
  public roles: Array<RolModel> = [];
  public activeRoles: Array<RolModel> = [];

  ngOnInit() {
    this.services = this._activatedRoute.snapshot.data.services;
    this.hospitals = this._activatedRoute.snapshot.data.hospitals;
    this.users = this._activatedRoute.snapshot.data.users.content;
    this.paginationData = this._activatedRoute.snapshot.data.users;

    this.selectedUser = JSON.parse(localStorage.getItem('user'));

    const userHospital: any = this.hospitals.find(
      (hospital) => hospital.id === this.selectedUser.hospitalId
    );
    this.hospitals = [userHospital];

    this.modalForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,8}[A-Za-z]$')],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{2,3}-? ?[0-9]{6,7}$')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          Validators.email,
        ],
      ],
      collegeNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{9}')],
      ],
      hospital: [null, Validators.required],
      serviceDTO: [null, Validators.required],
      username: ['', Validators.required],
      roles: [null],
    });
  }

  onSearch(data: any) {
    this._usersService.findUsers(data).subscribe(
      (response) => {
        this.users = response.content;
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = event;

    // this.users[event].serviceDTO = this.selectedUsers.hospital[0].serviceDTO;

    this.selectedUsers.setValuesFromObject(this.users[event], this.hospitals);

    Object.keys(this.selectedUsers).forEach((doctorKey: string) => {
      if (this.modalForm.controls[doctorKey]) {
        this.modalForm.controls[doctorKey].setValue(
          this.selectedUsers[doctorKey]
        );
      }
    });
  }

  public onIconButtonClick(event: any): void {
    if (event && event.type === 'edit') {
      if (this.selectedUsers && this.selectedUsers.hospital.length > 0) {
        this.services = this.selectedUsers.hospital[0].serviceDTO;
        if (this.services.length === 0) {
          this.modalForm.controls['serviceDTO'].setValue(null);
        }
      }
      this.editDoctor();
    } else {
      this.showModalConfirm();
    }
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.title = 'Eliminar Médico';
    modalRef.componentInstance.messageModal = `¿Estás seguro de que quieres eliminar el médico
      ${this.users[this.selectedItem].name} ${
      this.users[this.selectedItem].surname
    }?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deleteUser();
      modalRef.close();
    });
  }

  public saveUser(parentNode?: SectionModel): void {
    this.isEditing = false;
    this.selectedItem = null;
    this.modalForm.reset();
    this.showModal();
    this.makeRequests(parentNode ? parentNode.id : 1);
  }

  public editDoctor(): void {
    this.isEditing = true;
    this.showModal();
  }

  private saveOrUpdate(
    event: FormGroup,
    modalRef: any,
    node: SectionModel
  ): void {
    const formValues: UsersModel = event.value;
    let id: number;
    const currentDoctor = this.users[this.selectedItem];
    if (this.isEditing) {
      id = currentDoctor.id;
      formValues.userDTO = currentDoctor.userDTO;
    }

    const user: UsersModel = new UsersModel(
      id,
      formValues.name,
      formValues.surname,
      formValues.phone,
      formValues.dni,
      formValues.collegeNumber,
      formValues.userDTO,
      formValues.username,
      formValues.email,
      formValues.serviceDTO,
      formValues.hospital,
      formValues.roles
    );

    user.setValuesFromDinamicForm(formValues);

    if (this.isEditing) {
      this._usersService.updateUser(UsersModel).subscribe(
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
      this._usersService.postUser(UsersModel).subscribe(
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
  private makeRequests(id: number): void {
    const getRoles = this.rolService.getAllRoles();
    const getNodeData = this.sectionsService.getSectionById(id);

    forkJoin([getRoles, getNodeData]).subscribe((responseData) => {
      this.roles = responseData[0];
      this.activeRoles = this.isEditing ? responseData[1].roles : [];
      this.setFormValues(responseData[1]);
      this.showModal(responseData[1]);
    });
  }
  private setFormValues(node: SectionModel): void {
    Object.keys(node).forEach((nodeKey) => {
      if (this.modalForm.controls[nodeKey]) {
        if (nodeKey === 'fatherSection') {
          if (node[nodeKey] && this.isEditing) {
            this.modalForm.controls[nodeKey].setValue(node[nodeKey].title);
          } else {
            this.modalForm.controls[nodeKey].setValue(node.title);
          }
        } else if (nodeKey !== 'roles' && this.isEditing === true) {
          this.modalForm.controls[nodeKey].setValue(node[nodeKey]);
        }
      }
    });
  }

  private showModal(node?: SectionModel) {
    const modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    let options: any = {};
    if (
      this.selectedItem != null &&
      this.selectedUsers.hospital.length > 0 &&
      this.selectedUsers.serviceDTO
    ) {
      const servicesDto: any[] = [this.selectedUsers.serviceDTO];
      options = {
        roles: { options: this.roles },
        hospital: {
          options: this.hospitals,
          optionSelected: this.selectedUsers.hospital[0].id,
        },
        serviceDTO: {
          options: this.services,
          optionSelected: servicesDto[0].id,
        },
      };
    } else {
      this.services = [];
      options = {
        roles: { options: this.roles },
        hospital: { options: this.hospitals },
        serviceDTO: { options: this.services },
      };
    }

    modalRef.componentInstance.id = 'doctoreditor';
    modalRef.componentInstance.title = 'Nuevo Usuario';
    modalRef.componentInstance.options = options;
    modalRef.componentInstance.activeRoles = this.activeRoles;
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      this.saveOrUpdate(event, modalRef, node);
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

  private refreshData(query: string): void {
    this._usersService.getAll(query).subscribe((data) => {
      this.users = data.content;
      if (this.paginationData.totalPages !== data.totalPages) {
        this.paginationData = data;
      }
    });
  }

  public deleteUser(): void {
    this._usersService.deleteUser(this.users[this.selectedItem].id).subscribe(
      (response) => {
        this.refreshData(`&page=${this.currentPage}`);
        this._notification.showSuccessToast('elementDeleted');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }
}
