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
import { SectionModel } from '../../models/section.model';
import { SectionsService } from '../../services/sections/sections.service';

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

  constructor(
    private sectionsService: SectionsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.modalForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: [''],
      order: ['', Validators.required],
      principal: ['', Validators.required],
      active: ['', Validators.required],
      url: ['', Validators.required],
      // fatherSection: ['', Validators.required],
      rolesList: ['', Validators.required],
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
    this.showModal();
  }

  public editSection(node: SectionModel): void {
    this.isEditing = true;
    this.setFormValues(node);
    this.showModal(node);
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
    Object.keys(node).map((nodeKey) => {
      if (this.modalForm.controls[nodeKey]) {
        this.modalForm.controls[nodeKey].setValue(node[nodeKey]);
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
    if (this.isEditing && node) {
      id = node.id;
    }
    const section: SectionModel = new SectionModel(
      id,
      formValues.description,
      formValues.icon,
      formValues.active,
      formValues.order,
      formValues.principal,
      formValues.title,
      formValues.url,
      formValues.roles,
      formValues.fatherSection
    );
    this.selectedSection = new SectionModel();
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
