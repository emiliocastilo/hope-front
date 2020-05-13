import { Component, OnInit } from '@angular/core';
import { DispensationModel } from 'src/app/modules/management/models/dispensation/dispensation.model';
import { ActivatedRoute } from '@angular/router';
import { DispensationService } from 'src/app/modules/management/services/dispensation/dispensation.service';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { DispensationModelToRowModelAdapter } from 'src/app/modules/management/adapters/dispensation-model-to-row-model.adapter';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModalComponent } from 'src/app/core/components/modals/editor-modal/editor-modal/editor-modal.component';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { ColumnHeaderModel } from 'src/app/core/models/table/colum-header.model';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-dispensations',
  templateUrl: './dispensations.component.html',
  styleUrls: ['./dispensations.component.scss'],
})
export class DispensationsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dispensationsService: DispensationService,
    private _rowModelAdapter: DispensationModelToRowModelAdapter,
    private _toastr: ToastrService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {}

  private currentPage: number = 0;
  private dispensations: DispensationModel[] = [];
  public paginationData: PaginationModel;
  public columHeaders: Array<ColumnHeaderModel> = [
    new ColumnHeaderModel('Fecha', 2),
    new ColumnHeaderModel('Periodo inicio', 2),
    new ColumnHeaderModel('Periodo fin', 2),
    new ColumnHeaderModel('Num. Registros', 2),
    new ColumnHeaderModel('Acciones', 2),
  ];
  public selectedItem: number;
  private modalForm: FormGroup;
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;

  ngOnInit(): void {
    this.dispensations = this._activatedRoute.snapshot.data.dispensations.content;
    this.paginationData = this._activatedRoute.snapshot.data.dispensations;
    this.modalForm = this._formBuilder.group({
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required],
      fileDispensation: ['', [Validators.required, Validators.pattern]],
    });

    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/management')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/management/dispensations')
    );
  }

  public prepareTableData(): Array<RowDataModel> {
    const rows = this.dispensations.map((dispensation) => {
      return this._rowModelAdapter.adaptModelToRow(dispensation);
    });
    return rows;
  }

  public selectPage(page: number): void {
    this.currentPage = page;
    const query: string = `&page=${page}`;
    this.refreshData(query);
  }

  private refreshData(query: string): void {
    this._dispensationsService.getAll(query).subscribe((data) => {
      this.dispensations = data.content;
      if (this.paginationData.totalElements !== data.totalElements) {
        this.paginationData = data;
      }
    });
  }

  public onSelectedItem(event: number): void {
    this.selectedItem = event;
  }

  public onIconButtonClick(event: any): void {
    if (event && event.type === 'delete') {
      this.showModalConfirm();
    }
  }

  private showModalConfirm() {
    const modalRef = this._modalService.open(ConfirmModalComponent);

    modalRef.componentInstance.title = 'Eliminar Dispensacion';
    modalRef.componentInstance.messageModal = `Estas seguro de que quieres eliminar la despiensacion de la fecha 
      ${this.dispensations[this.selectedItem].date}?`;
    modalRef.componentInstance.cancel.subscribe((event) => {
      modalRef.close();
    });
    modalRef.componentInstance.accept.subscribe((event) => {
      this.deleteDispensation();
      modalRef.close();
    });
  }

  public deleteDispensation(): void {
    const currenDispensation = this.dispensations[this.selectedItem];
    this._dispensationsService.delete(currenDispensation.id).subscribe(
      (data) => {
        this.refreshData(`&page=${this.currentPage}`);
        this._toastr.success('Eliminado exitosamente.');
      },
      (error) => {
        this._toastr.error(error.error);
      }
    );
  }

  private cleanModal(): void {
    this.modalForm.reset();
    this.selectedItem = undefined;
  }

  public showModal() {
    this.cleanModal();
    let modalRef = this._modalService.open(EditorModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = 'createDispensation';
    modalRef.componentInstance.title = 'Dispensaciones';
    modalRef.componentInstance.form = this.modalForm;
    modalRef.componentInstance.close.subscribe((event: any) => {
      modalRef.close();
    });
    modalRef.componentInstance.save.subscribe((event: any) => {
      this.saveDispensation(event, modalRef);
    });
  }

  private saveDispensation(data: DispensationModel, modal: any) {
    this._dispensationsService.save(data).subscribe(
      (response) => {
        modal.close();
        this.refreshData(`&page=${this.currentPage}`);
      },
      (error) => {
        this._toastr.error(error.message);
      }
    );
  }
}
