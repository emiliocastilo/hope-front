import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { NotificationService } from 'src/app/core/services/notification.service';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { QueryResult } from 'src/app/modules/management/interfaces/query-result.interface';
import { PatientTreatmentService } from 'src/app/modules/pathology/services/patient-treatment.service';
import { PatientTreatmentModel } from '../../../../models/patient-treatment.model';

@Component({
    selector: 'app-vih-treatments',
    templateUrl: './vih-treatments.component.html',
    styleUrls: ['./vih-treatments.component.scss']
})
export class VIHTreatmentsComponent implements OnInit {
    private currentPage: number = 0;
    private colOrder: any;
    private typeOrder: any;
    private itemsPerPage: number;

    public loading: boolean = true;
    public columnsHeader: Array<string> = ['indication', 'principle', 'brand', 'dose', 'dateStart', 'datePrescription', 'dateSuspension', 'treatmentType', 'actions'];
    public tableData: Array<RowDataModel>;
    public modalForm: FormGroup;
    public selectedItem: number;
    public isEditing = false;
    public paginationData: PaginationModel;
    public selectedUser: any;
    public patientTreatments: Array<PatientTreatmentModel>;
    public selectedMedicine: PatientTreatmentModel;
    public actions: TableActionsModel[] = new TableActionsBuilder().getChangeModificationAndDelete();

    constructor(
        private _modalService: NgbModal,
        private _notification: NotificationService,
        private _patientTreatmentService: PatientTreatmentService
    ) { }

    ngOnInit () {
        this.getData();
    }

    private getData () {
        this.loading = true;
        this._patientTreatmentService.get().subscribe(
            (data: QueryResult<PatientTreatmentModel>) => {
                this.patientTreatments = data.content;
                this.paginationData = data;
            }, error => this._notification.showErrorToast(error.errorCode),
            () => this.loading = false
        );
    }

    private cleanModal (): void {
        this.modalForm.reset();
        this.selectedItem = undefined;
    }

    private refreshData (query: string): void {
        const user_aux = JSON.parse(localStorage.getItem('user') || '{}');
        this._patientTreatmentService.get(query).subscribe(
            (data: QueryResult<PatientTreatmentModel>) => {
                this.patientTreatments = data.content;

                // ! Si number es reasignado se producirá un bucle infinito de llamadas a API
                // if (this.paginationData.number !== data.number) this.paginationData.number = data.number;

                if (this.paginationData.size !== data.size) this.paginationData.size = data.size;
                if (this.paginationData.totalPages !== data.totalPages) this.paginationData.totalPages = data.totalPages;
                if (this.paginationData.totalElements !== data.totalElements) this.paginationData.totalElements = data.totalElements;

                if (this.paginationData.totalPages !== data.totalPages) {
                    this.paginationData = data;
                }

                if (this.patientTreatments.length === 0 && this.paginationData.totalElements > 0) {
                    this.currentPage = this.currentPage - 1;
                    this.selectPage(this.currentPage);
                }
            });
    }

    private delete (id: number) {
        this._medicinesService.delete(id).subscribe(
            (success) => {
                this._notification.showSuccessToast('elementDeleted');
                this.selectPage(this.currentPage);
            },
            (error) => this._notification.showErrorToast('errorDeleting')
        );
    }

    private showModalConfirm () {
        const modalRef = this._modalService.open(ConfirmModalComponent);
        const current = this.medicines[this.selectedItem];
        modalRef.componentInstance.title = 'Eliminar medicamento';
        modalRef.componentInstance.messageModal = `¿Estás seguro de que quieres eliminar el medicamento ${current.nationalCode} ${current.actIngredients}?`;
        modalRef.componentInstance.cancel.subscribe((event) => {
            modalRef.close();
        });
        modalRef.componentInstance.accept.subscribe((event) => {
            this.delete(current.id);
            modalRef.close();
        });
    }

    public selectPage (page: number): void {
        this.paginationData.number = page + 1;
        let query: string;
        if (this.colOrder && this.typeOrder) {
            query = `?sort=${this.colOrder},${this.typeOrder}&page=${page}`;
        } else {
            query = `?page=${page}`;
        }
        this.currentPage = page;
        if (this.itemsPerPage) {
            query = `${query}&size=${this.itemsPerPage}`;
        }
        this.refreshData(query);
    }

    public showModal () {
        this.cleanModal();
        let modalRef = this._modalService.open(EditorModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.id = 'editmedicine';
        modalRef.componentInstance.title = 'Medicamentos';
        modalRef.componentInstance.form = this.modalForm;
        modalRef.componentInstance.close.subscribe((event: any) => {
            modalRef.close();
        });
        modalRef.componentInstance.save.subscribe((event: any) => {
            this.saveMedicine(event, modalRef);
        });
    }

    public selectItemsPerPage (number: number) {
        this.itemsPerPage = number;
        this.selectPage(0);
    }

    public onSelectedItem (event: any): void {
        this.selectedItem = event;
        this.selectedMedicine = this.medicines[event];
        Object.keys(this.medicines[event]).forEach((key: string) => {
            if (this.modalForm.controls[key]) {
                this.modalForm.controls[key].setValue(this.medicines[event][key]);
            }
        });
    }

    public onSearch (event: string): void {
        this._medicinesService.getSearch(event).subscribe((data: QueryResult<MedicineModel>) => {
            this.medicines = data.content;
            this.dataMap();
            this.paginationData.number = 1;
            this.paginationData.size = data.size;
            this.paginationData.totalElements = data.totalElements;
        });
    }

    public onSort (event: any) {
        this.colOrder = event.column;
        this.typeOrder = event.direction;
        let query = `?sort=${this.colOrder},${this.typeOrder}&page=${this.currentPage}`;
        if (this.itemsPerPage) query = `${query}&size=${this.itemsPerPage}`;
        this.refreshData(query);
    }

    public onIconButtonClick (event: any) {
        if (event && event.type === 'delete') {
            this.showModalConfirm();
        }
    }
}


}
