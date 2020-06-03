import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { SECTIONS_TABLE_HEADERS } from 'src/app/modules/management/constants/sections.constants';
import { RolModel } from '../../models/rol.model';
import { SectionModel } from '../../models/section.model';
import { RoleManagementService } from '../../services/roles/role-management.service';
import { SectionsService } from '../../services/sections/sections.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  public sections: Array<SectionModel>;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public tableHeaders: Array<ColumnHeaderModel> = SECTIONS_TABLE_HEADERS;
  public tableData: Array<RowDataModel>;
  public isEditing: boolean;
  public selectedItem: number;
  public selectedSection: SectionModel = new SectionModel();
  public modalForm: FormGroup;
  public options: ITreeOptions;
  public roles: Array<RolModel> = [];
  public activeRoles: Array<RolModel> = [];

  constructor(
    private sectionsService: SectionsService,
    private rolService: RoleManagementService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: [''],
      order: ['', Validators.required],
      principal: [false],
      active: [false],
      url: ['', Validators.required],
      fatherSection: [{ value: '', disabled: true }, Validators.required],
      roles: [null],
    });
  }

  ngOnInit(): void {
    // Carga menú lateral
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/management/sections')
    );
    // fin carga menú lateral
    this.options = {
      actionMapping: {
        mouse: {
          contextMenu: (tree, node, $event) => {
            $event.preventDefault();
          },
          dblClick: (tree, node, $event) => {
            if (node.hasChildren) {
              TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            }
          },
        },
      },
      displayField: 'title',
    };
    this.retrieveSections();
  }

  public saveSection(parentNode?: SectionModel): void {
    this.isEditing = false;
    this.selectedItem = null;
    this.modalForm.reset();
    this.makeRequests(parentNode ? parentNode.id : 1);
  }

  public editSection(node: SectionModel): void {
    this.isEditing = true;
    this.makeRequests(node.id);
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

  public showConfirmRemove(node?: SectionModel) {
    const modalRef = this.modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar Sección';
    modalRef.componentInstance.messageModal = `¿Estas seguro de que quieres eliminar la sección '${node.title}'?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deleteSection(node.id);
      modalRef.close();
    });
  }

  private deleteSection(id: number): void {
    this.sectionsService.deleteSection(id).subscribe(
      (response) => {
        this.toastr.success('La sección se ha borrado correctamente');
        this.retrieveSections();
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
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
    const modalRef = this.modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'sectionsEditor';
    modalRef.componentInstance.title = 'Sección';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.options = { roles: this.roles };
    modalRef.componentInstance.activeRoles = this.activeRoles;
    modalRef.componentInstance.close.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event) => {
      if (this.modalForm.valid) {
        this.saveOrUpdate(event, modalRef, node);
      }
    });
  }

  private saveOrUpdate(event: any, modalRef: any, node?: SectionModel): void {
    const formValues: SectionModel = event.value;
    let id;
    let fatherSection = node;
    if (this.isEditing && node) {
      id = node.id;
      fatherSection = node.fatherSection;
    }
    const section: SectionModel = new SectionModel(
      id,
      formValues.description,
      formValues.icon ? formValues.icon : '',
      formValues.active ? formValues.active : false,
      formValues.order,
      formValues.principal ? formValues.principal : false,
      formValues.title,
      formValues.url,
      modalRef.componentInstance.activeRoles,
      fatherSection
    );
    if (this.isEditing) {
      this.sectionsService.updateSection(section).subscribe(
        (response) => {
          this.isEditing = false;
          modalRef.close();
          this.retrieveSections();
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    } else {
      this.sectionsService.createSection(section).subscribe(
        (response) => {
          modalRef.close();
          this.retrieveSections();
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    }
  }

  private retrieveSections(): void {
    this.sectionsService.getSections().subscribe((data) => {
      this.sections = data.children;
    });
  }
}
