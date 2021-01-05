import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientModel } from '../../../management/models/patients/patient.model';
import { PathologyModel } from '../../../management/models/patients/pathology.model';
import { MenuItemModel } from 'src/app/core/models/menu-item/menu-item.model';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import TableActionsBuilder from 'src/app/core/utils/TableActionsBuilder';
import { DynamicFormComponent } from '../../../../core/components/dynamic-form/dynamic-form.component';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { QueryResult } from '../../../management/interfaces/query-result.interface';
import { PharmacyModel } from '../../models/pharmacy/pharmacy.model';
import { UserModel } from '../../../management/models/user/user.model';
import { PHARMACY_TABLE_KEYS } from '../../constants/pharmacy.constants';

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
    public pharmacyKeysToShow: string[] = PHARMACY_TABLE_KEYS;
    public selectedItem: number;
    public modalForm: FormGroup;
    private currentPage = 0;
    private colOrder: any;
    private typeOrder: any;
    public paginationData: PaginationModel;
    // public actions: TableActionsModel[] = new TableActionsBuilder().getDetail();
    private itemsPerPage: number;
    private selectedUser: UserModel;

    public loading: boolean = true;
    public pharmacyRows: Array<PharmacyModel> = [];

    constructor(
        private _pharmacyService: PharmacyService,
        private _notificationService: NotificationService
    ) { }

    ngOnInit (): void {
        this.paginationData = {
            number: 0,
            size: 0,
            totalElements: 0,
            totalPages: 0
        };
        this.getData();
    }

    private getData () {
        this._pharmacyService.getData().subscribe(
            (data: QueryResult<PharmacyModel>) => {
                this.pharmacyRows = data.content;
                this.paginationData = data;
            },
            error => this._notificationService.showErrorToast('pharmacyListError'),
            () => {
                // ! MOCKED TEST ! //
                this.pharmacyRows = JSON.parse('[{"nhc":"NHC-0001","date":"2021-01-03T20:22:13.089Z","nationalCode":"ALI","presentation":"QUI LABORE AMET","quantity":6.1184,"mgDispensed":14.9137,"unitCost":290.3183,"totalCost":532.8243,"testClinical":true,"unitDose":4.3,"botCode":"OFF"},{"nhc":"NHC-0001","date":"2021-01-02T12:22:02.711Z","nationalCode":"EIU","presentation":"AD ANIM LABORUM","quantity":5.9964,"mgDispensed":8.8108,"unitCost":256.5318,"totalCost":1048.5327,"testClinical":false,"unitDose":4.8,"botCode":"ALI"},{"nhc":"NHC-0001","date":"2021-01-01T16:55:37.135Z","nationalCode":"AUT","presentation":"EST LABORUM ENIM","quantity":7.3517,"mgDispensed":12.9937,"unitCost":347.2858,"totalCost":741.7183,"testClinical":true,"unitDose":0.8,"botCode":"CIL"},{"nhc":"NHC-0001","date":"2021-01-05T05:52:23.471Z","nationalCode":"TEM","presentation":"CULPA VENIAM ALIQUIP","quantity":6.4956,"mgDispensed":6.9511,"unitCost":232.2558,"totalCost":1396.1096,"testClinical":false,"unitDose":2.8,"botCode":"ENI"},{"nhc":"NHC-0001","date":"2021-01-04T09:26:33.687Z","nationalCode":"ENI","presentation":"CUPIDATAT CULPA OCCAECAT","quantity":11.8847,"mgDispensed":7.2505,"unitCost":237.5017,"totalCost":981.6604,"testClinical":true,"unitDose":4.9,"botCode":"DUI"},{"nhc":"NHC-0001","date":"2021-01-02T19:42:11.134Z","nationalCode":"IRU","presentation":"CONSEQUAT NON ET","quantity":6.0804,"mgDispensed":8.6824,"unitCost":217.4677,"totalCost":1449.5821,"testClinical":true,"unitDose":0.6,"botCode":"CIL"},{"nhc":"NHC-0001","date":"2021-01-03T22:31:00.830Z","nationalCode":"OCC","presentation":"COMMODO EA LABORUM","quantity":10.4602,"mgDispensed":9.4229,"unitCost":347.4904,"totalCost":1254.1474,"testClinical":true,"unitDose":3.2,"botCode":"CON"},{"nhc":"NHC-0001","date":"2021-01-04T02:44:17.403Z","nationalCode":"ENI","presentation":"LABORUM DOLORE PARIATUR","quantity":13.2024,"mgDispensed":8.0511,"unitCost":290.3171,"totalCost":798.5182,"testClinical":true,"unitDose":2.9,"botCode":"EU "},{"nhc":"NHC-0001","date":"2021-01-02T00:46:34.625Z","nationalCode":"DES","presentation":"INCIDIDUNT DO EA","quantity":6.5971,"mgDispensed":7.4694,"unitCost":295.9487,"totalCost":999.7566,"testClinical":false,"unitDose":2.9,"botCode":"VOL"},{"nhc":"NHC-0001","date":"2021-01-04T23:12:07.314Z","nationalCode":"INC","presentation":"IPSUM PROIDENT AMET","quantity":11.4515,"mgDispensed":12.7097,"unitCost":308.2868,"totalCost":1043.8128,"testClinical":false,"unitDose":1.9,"botCode":"AUT"},{"nhc":"NHC-0001","date":"2021-01-01T22:39:25.994Z","nationalCode":"ANI","presentation":"ADIPISICING VENIAM EA","quantity":11.7645,"mgDispensed":6.2613,"unitCost":208.2065,"totalCost":728.9525,"testClinical":true,"unitDose":0.8,"botCode":"DOL"},{"nhc":"NHC-0001","date":"2021-01-01T19:09:21.002Z","nationalCode":"DUI","presentation":"VOLUPTATE UT DO","quantity":6.6173,"mgDispensed":11.1779,"unitCost":208.0984,"totalCost":957.9352,"testClinical":false,"unitDose":4.8,"botCode":"IPS"},{"nhc":"NHC-0001","date":"2021-01-02T09:16:58.995Z","nationalCode":"IRU","presentation":"EA LABORUM ALIQUA","quantity":10.5481,"mgDispensed":9.6265,"unitCost":267.7555,"totalCost":632.2935,"testClinical":true,"unitDose":2.6,"botCode":"MAG"},{"nhc":"NHC-0001","date":"2021-01-01T18:08:13.778Z","nationalCode":"REP","presentation":"ADIPISICING AUTE COMMODO","quantity":12.6603,"mgDispensed":10.1066,"unitCost":291.7944,"totalCost":738.2196,"testClinical":false,"unitDose":3.6,"botCode":"IN "},{"nhc":"NHC-0001","date":"2021-01-04T07:10:01.723Z","nationalCode":"EIU","presentation":"CONSEQUAT NOSTRUD LOREM","quantity":10.7943,"mgDispensed":14.0518,"unitCost":175.0719,"totalCost":634.0937,"testClinical":true,"unitDose":4.8,"botCode":"MIN"},{"nhc":"NHC-0001","date":"2021-01-05T04:51:52.541Z","nationalCode":"EA ","presentation":"CULPA SINT EIUSMOD","quantity":9.0173,"mgDispensed":10.0637,"unitCost":178.3255,"totalCost":1381.9798,"testClinical":true,"unitDose":4.5,"botCode":"IPS"},{"nhc":"NHC-0001","date":"2021-01-03T10:46:07.554Z","nationalCode":"PAR","presentation":"QUIS ADIPISICING MINIM","quantity":13.1681,"mgDispensed":12.6458,"unitCost":217.0085,"totalCost":1085.6607,"testClinical":false,"unitDose":2.7,"botCode":"EIU"},{"nhc":"NHC-0001","date":"2021-01-04T23:03:08.257Z","nationalCode":"NIS","presentation":"CONSEQUAT LABORUM COMMODO","quantity":8.2664,"mgDispensed":12.7815,"unitCost":193.7829,"totalCost":860.3397,"testClinical":false,"unitDose":0.2,"botCode":"IPS"},{"nhc":"NHC-0001","date":"2021-01-01T15:26:43.279Z","nationalCode":"AME","presentation":"SIT EIUSMOD AUTE","quantity":5.7715,"mgDispensed":5.8284,"unitCost":344.0466,"totalCost":863.8019,"testClinical":false,"unitDose":3.4,"botCode":"MOL"},{"nhc":"NHC-0001","date":"2021-01-03T15:18:36.035Z","nationalCode":"DOL","presentation":"EXCEPTEUR CILLUM DUIS","quantity":7.473,"mgDispensed":14.1154,"unitCost":272.0607,"totalCost":532.4458,"testClinical":false,"unitDose":2.8,"botCode":"EXC"}]');
                this.paginationData = {
                    number: 20,
                    size: 20,
                    totalElements: 20,
                    totalPages: 4
                };
                // ! MOCKED TEST ! //
                this.loading = false;
            }
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

        if (this.itemsPerPage) query = `${query}&size=${this.itemsPerPage}`;

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
        this._pharmacyService.getData(query).subscribe(
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
