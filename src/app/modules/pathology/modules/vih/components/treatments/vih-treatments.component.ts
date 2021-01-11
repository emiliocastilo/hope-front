import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { timingSafeEqual } from 'crypto';
import { from, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/core/components/modals/confirm-modal/confirm-modal.component';
import { PaginationModel } from 'src/app/core/models/pagination/pagination/pagination.model';
import { RowDataModel } from 'src/app/core/models/table/row-data.model';
import { TableActionsModel } from 'src/app/core/models/table/table-actions-model';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { MedicinesServices } from 'src/app/core/services/medicines/medicines.services';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IndicationService } from 'src/app/modules/management/services/indications/indication.service';
import { JSONTemplateModel } from 'src/app/modules/pathology/models/JSON-template.model';
import { TemplateModel } from 'src/app/modules/pathology/models/template.model';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';
import { constants } from 'src/constants/constants';
import { VIHTreatmentModel } from '../../models/vih-treatment.model';

@Component({
    selector: 'app-vih-treatments',
    templateUrl: './vih-treatments.component.html',
    styleUrls: ['./vih-treatments.component.scss']
})
export class VIHTreatmentsComponent implements OnInit {
    key = constants.farmacologiesTreatments;
    public treatments: Array<VIHTreatmentModel> = [];
    public showedTreatments: Array<VIHTreatmentModel> = [];
    public columHeaders = ['indication', 'principle', 'brand', 'dose', 'dateStart', 'datePrescription', 'dateSuspension'];
    public actions: TableActionsModel[] = [
        new TableActionsModel('changeSuspend', 'edit-3'),
        new TableActionsModel('edit', 'edit-2'),
        new TableActionsModel('delete', 'trash')
    ];
    private modalForm: FormGroup = this._formBuilder.group({
        indication: ['', Validators.required],
        specialIndication: [false],
        bigPsychologicalImpact: [false],
        visibleInjury: [false],
        others: [''],
        treatmentType: ['', Validators.required],
        opcionMedicamento: [''],
        opcionFormulaMagistral: [''],

        // medicamento topico
        medicine: ['', Validators.required],
        family: ['', Validators.required],
        atc: ['', Validators.required],
        cn: ['', Validators.required],
        tract: ['', Validators.required],
        // formula magistral topico
        descripcionFormulaMagistral: [''],
        dosisFormulaMagistral: [''],

        dose: ['', Validators.required],
        otherDosis: [''],
        regimenTreatment: ['', Validators.required],
        datePrescription: ['', Validators.required],
        dateStart: ['', Validators.required],
        expectedEndDate: [''],
        observations: [''],
        treatmentContinue: [false],
        treatmentPulsatil: [false],
    });
    private modalFormUpdate: FormGroup = this._formBuilder.group({
        reasonChangeOrSuspension: ['', Validators.required],
        medicine: ['', Validators.required],
        family: ['', Validators.required],
        atc: ['', Validators.required],
        cn: ['', Validators.required],
        tract: ['', Validators.required],
        dose: ['', Validators.required],
        otherDosis: [''],
        regimenTreatment: ['', Validators.required],
        dateSuspension: [''],
    });
    private templateStructure: Array<JSONTemplateModel>;

    //TO DO: Unificar los formularios con los campos comunes
    private modalFormUpdateTopico: FormGroup = this._formBuilder.group({
        reasonChangeOrSuspension: ['', Validators.required],

        descripcionFormulaMagistral: ['', Validators.required],
        dosisFormulaMagistral: [''],
        opcionMedicamento: [''],
        opcionFormulaMagistral: [''],

        regimenTreatment: ['', Validators.required],
        dateSuspension: [],
    });

    private templateName: string = 'treatment-vih';
    // private templateName: string = 'principal-diagnosis';
    private templateDataRequest: string;
    public patient: PatientModel;
    private indication = '';
    private currentPage = 0;
    private colOrder: any;
    private typeOrder: any;
    private itemsPerPage: number;
    public paginationData: PaginationModel;
    private pageSize = 5;
    private currentModal: any;
    public loading: boolean = true;

    constructor(
        private _formService: FormsService,
        private _modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _notification: NotificationService,
        private _translate: TranslateService,
        private _indicationService: IndicationService,
        private _medicinesService: MedicinesServices,
        private _router: Router
    ) { }

    /*
        * 1. Se cargan datos de BD llamando a /forms?template=name&patientId=id
        * 2. Parseo de datos a modelo local para trabajar con los mismos
        * 3. Carga de resultados en tabla configurando paginador y ordenado.
        * 4. Modal alta/modificacion.
        * 5. Modal cambio tratamiento.
        * 6. Modal confirmación borrado.
        * ! Deben parsearse los datos que se vayan a guardar a formato template para su guardado en bd.
    */

    ngOnInit () {
        this.paginationData = {
            number: 0,
            totalElements: 0,
            size: 0,
            totalPages: 0
        };

        if (localStorage.getItem('selectedPatient')) {
            this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
            this.templateDataRequest = `template=${this.templateName}&patientId=${this.patient.id}`;
            this.getData();
        } else {
            this._notification.showErrorToast('No hay paciente seleccionado.');
            this._router.navigateByUrl('pathology/patients');
        }
    }

    private getData () {
        this.loading = true;
        this._formService.getFormData(this.templateDataRequest).subscribe(
            (response: JSONTemplateModel) => {
                this.treatments = this.mongoToObject(response);

                this.paginationData = {
                    number: 1,
                    totalElements: this.treatments.length,
                    size: this.pageSize,
                    totalPages: this.treatments.length / this.pageSize
                };

                this.selectPage(0);
            },
            error => this._notification.showErrorToast('errorRetrievingData'),
            () => this.loading = false
        );
    }

    private mongoToObject (mongoObj: JSONTemplateModel): Array<VIHTreatmentModel> {
        let mappedData: Array<VIHTreatmentModel> = [];
        mappedData = mongoObj.data[0].value;
        return mappedData;
    }

    private objectToMongoJSON (): string {
        const mongoObj = {
            template: this.templateName,
            patientId: this.patient.id,
            data: [{
                type: 'table',
                name: 'principal-treatment',
                value: []
            }],
            job: true
        };

        this.treatments.forEach(treatment => {
            mongoObj.data[0].value.push({
                indication: 'vih',
                treatmentType: 'QUIMICO',
                opcionMedicamento: 'opcionMedicamento',
                medicine: treatment.medicine,
                family: treatment.family,
                atc: treatment.atc,
                cn: treatment.cn,
                tract: treatment.tract,
                dose: treatment.dose,
                otherDosis: treatment.otherDosis,
                regimenTreatment: treatment.regimenTreatment,
                datePrescription: treatment.datePrescription,
                dateStart: treatment.dateStart,
                expectedEndDate: treatment.expectedEndDate,
                observations: treatment.observations,
                treatmentContinue: treatment.treatmentContinue,
                treatmentPulsatil: treatment.treatmentPulsatil,
                reasonChangeOrSuspension: treatment.reasonChangeOrSuspension,
                dateSuspension: treatment.dateSuspension,
                principle: treatment.principle,
                brand: treatment.brand,
                type: 'QUIMICO'
            });
        });

        // ! DATOS DE MENTIRA
        /*
        for (let index = 0; index < 5; index++) {
            mongoObj.data[0].value.push({
                indication: 'vih',
                treatmentType: 'QUIMICO',
                opcionMedicamento: 'opcionMedicamento',
                medicine: {
                    "dateCreated": "2020-11-09T11:20:53",
                    "dateUpdated": "2020-11-09T11:20:53",
                    "id": 7,
                    "actIngredients": "Apremilast",
                    "codeAct": "L04AA32",
                    "acronym": "APR",
                    "nationalCode": "704966",
                    "description": "Apremilast",
                    "presentation": "OTEZLA 10 mg 20 mg 30 mg COMPRIMIDOS RECUBIERTOS CON PELICULA, 27 comprimidos\r\n",
                    "content": null,
                    "authorizationDate": null,
                    "authorized": true,
                    "endDateAuthorization": null,
                    "commercialization": true,
                    "commercializationDate": null,
                    "endDateCommercialization": null,
                    "units": null,
                    "pvl": null,
                    "pvlUnitary": null,
                    "pvp": null,
                    "pathology": "DERMATOLOGÍA",
                    "biologic": true,
                    "viaAdministration": "oral",
                    "family": "QUIMICO",
                    "subfamily": null,
                    "brand": "OTEZLA",
                    "name": "Apremilast"
                },
                family: "QUIMICO",
                atc: "L04AA32",
                cn: "704966",
                tract: "oral",
                dose: {
                    name: "Otra"
                },
                otherDosis: "oral",
                regimenTreatment: "Intensificada",
                datePrescription: "2020-02-01T00:00:00.000Z",
                dateStart: "2020-03-01T00:00:00.000Z",
                expectedEndDate: "2020-05-05T00:00:00.000Z",
                observations: "",
                treatmentContinue: true,
                treatmentPulsatil: false,
                reasonChangeOrSuspension: null,
                dateSuspension: null,
                principle: "Apremilast",
                brand: 'OTEZLA',
                type: 'QUIMICO'
            });
        }
        */

        return JSON.stringify(mongoObj);
    }

    // ! ************** PUBLIC METHODS ************** ! //

    // * PAGINADOR * //

    public selectPage (page: number): void {
        console.log(`selectPage(${page})`);
        this.currentPage = page;
        const indexStartPage = page * this.paginationData.size;
        let finalPageItemIndex = (indexStartPage + this.paginationData.size) - 1;

        // console.log(`PAGE: ${page} | start index: ${indexStartPage} | end index: ${finalPageItemIndex} | last index: ${this.treatments.length - 1}`);

        if (this.treatments.length - 1 < finalPageItemIndex) finalPageItemIndex = this.treatments.length - 1;

        if (finalPageItemIndex + 1 > this.treatments.length) this.showedTreatments.slice(indexStartPage, finalPageItemIndex - this.treatments.length);
        else this.showedTreatments = this.treatments.slice(indexStartPage, indexStartPage + this.paginationData.size);
    }

    public selectItemsPerPage (number: number) {
        this.itemsPerPage = number;
        this.paginationData.size = number;
        this.selectPage(0);
    }

}
