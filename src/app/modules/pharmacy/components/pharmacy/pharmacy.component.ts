import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientModel } from '../../../management/models/patients/patient.model';
import { PathologyModel } from '../../../management/models/patients/pathology.model';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';
import { HospitalModel } from 'src/app/core/models/hospital/hospital.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { PATIENT_TABLE_KEYS } from '../../../management/constants/patients.constants';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { DynamicFormComponent } from '../../../../core/components/dynamic-form/dynamic-form.component';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { QueryResult } from '../../../management/interfaces/query-result.interface';
import { PharmacyModel } from '../../models/pharmacy/pharmacy.model';
import { UserModel } from '../../../management/models/user/user.model';

@Component({
    selector: 'app-pharmacy',
    templateUrl: './pharmacy.component.html',
    styleUrls: ['./pharmacy.component.scss'],
})
export class PharmacyComponent implements OnInit {
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    public menu: MenuItemModel[] = [];
    public menuSelected: MenuItemModel;
    public patients: PatientModel[] = [];
    public patientKeysToShow: string[] = PATIENT_TABLE_KEYS;
    public selectedItem: number;
    public selectedPatient: PatientModel = new PatientModel();
    public isEditing = false;
    public modalForm: FormGroup;
    private hospitals: HospitalModel[] = [];
    private pathologies: PathologyModel[] = [];
    private pathologiesIds: string[] = [];
    private currentPage = 0;
    private colOrder: any;
    private typeOrder: any;
    public paginationData: PaginationModel;
    public actions: TableActionsModel[] = new TableActionsBuilder().getEditAndDelete();
    private itemsPerPage: number;
    private selectedUser: UserModel;

    public loading: boolean = true;
    public pharmacyRows: Array<PharmacyModel> = [];

    constructor(
        private _pharmacyService: PharmacyService,
        private _notificationService: NotificationService
    ) { }

    ngOnInit (): void {
        this.getData();
    }

    public getData () {
        this._pharmacyService.get().subscribe(
            (data: QueryResult<PharmacyModel>) => this.pharmacyRows = data.content,
            error => this._notificationService.showErrorToast('pharmacyListError'),
            () => this.loading = false
        );
    }

    public onSearch (event: string): void {
        const currentPathology: PathologyModel = this.selectedUser.rolSelected.pathology;
        this._pharmacyService.getSearch(currentPathology.id, event).subscribe(
            (data: QueryResult<PharmacyModel>) => {
                this.pharmacyRows = data.content;
                this.currentPage = 0;
            });
    }

    public onSort (event: any) {
        this.colOrder = event.column;
        this.typeOrder = event.direction;
        let query = `&sort=${this.colOrder},${this.typeOrder}&page=${this.currentPage}`;

        if (this.itemsPerPage) {
            query = `${query}&size=${this.itemsPerPage}`;
        }

        this.refreshData(query);
    }

    public selectItemsPerPage (number: number) {
        this.itemsPerPage = number;
        this.selectPage(0);
    }

    public selectPage (page: number): void {
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

    private refreshData (query: string): void {
        this._pharmacyService.get(query).subscribe(
            (data: QueryResult<PharmacyModel>) => {
                this.pharmacyRows = data.content;
                this.paginationData.totalElements = data.totalElements;
                if (this.paginationData.totalPages !== data.totalPages) {
                    this.paginationData = data;
                }
                if (this.patients.length === 0 && this.paginationData.totalElements > 0) {
                    this.currentPage = this.currentPage - 1;
                    this.selectPage(this.currentPage);
                }
            });
    }
}
