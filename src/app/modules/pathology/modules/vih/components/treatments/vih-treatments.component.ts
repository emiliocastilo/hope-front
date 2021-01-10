import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
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
    public columHeaders = ['indication', 'principle', 'brand', 'dose', 'dateStart', 'datePrescription', 'dateSuspension'];
    public actions: TableActionsModel[] = [new TableActionsModel('changeSuspend', 'edit-3'), new TableActionsModel('edit', 'edit-2'), new TableActionsModel('delete', 'trash')];
    public tableData: RowDataModel[] = [];
    public tableDataFilter: any[] = [];
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
    private sizeTable = 5;
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
        console.log(this.templateDataRequest);
        this._formService.getFormData(this.templateDataRequest).subscribe(
            (response: JSONTemplateModel) => this.mongoToObject(response),
            error => this._notification.showErrorToast('ERROR RECUPERANDO DATOS')
        );
    }

    private mongoToObject (mongoObj: JSONTemplateModel): Array<VIHTreatmentModel> {
        const mappedData: Array<VIHTreatmentModel> = [];
        this.treatments = mongoObj.value;

        // mongoObj.value.forEach((treatment: VIHTreatmentModel) => {
        //     // Object.keys(this.defaultValues).forEach((key: string) => {
        //     //     this.config[key] = this.config[key] ? this.config[key] : this.defaultValues[key];
        //     // });
        //     // Object.keys(treatment).forEach((key: string) => {
        //     //     const parsedTreatment: VIHTreatmentModel = {
        //     //         indication: treatment[key],
        //     //         family: 
        //     //     };
        //     // });

        //     // const parsedTreatment: VIHTreatmentModel = {
        //     //     indication: treatment.indication,
        //     //     family: treatment.family,
        //     //     atc: treatment.atc,
        //     //     cn: treatment.cn,
        //     //     tract: treatment.tract,
        //     //     dose: treatment.dose,
        //     //     otherDosis: treatment.otherDosis,

        //     // };
        // });
        return mappedData;
    }

    private objectToMongoJSON (data: VIHTreatmentModel): string {
        const mongoObj = {
            template: this.templateName,
            patientId: this.patient.id,
            data: [
                { type: 'select', name: 'indication', value: data.indication },
                { type: 'input', name: 'family', value: data.family },
                { type: 'input', name: 'atc', value: data.atc },
                { type: 'input', name: 'cn', value: data.cn },
                { type: 'input', name: 'tract', value: data.tract },
                { type: 'input', name: 'dose', value: data.dose },
                { type: 'input', name: 'otherDosis', value: data.otherDosis },
                { type: 'input', name: 'regimenTreatment', value: data.regimenTreatment },
                { type: 'datepicker', name: 'datePrescription', value: data.datePrescription },
                { type: 'datepicker', name: 'dateStart', value: data.dateStart },
                { type: 'datepicker', name: 'expectedEndDate', value: data.expectedEndDate },
                { type: 'input', name: 'observations', value: data.observations },
                { type: 'checkbox', name: 'treatmentContinue', value: data.treatmentContinue },
                { type: 'checkbox', name: 'treatmentPulsatil', value: data.treatmentPulsatil },
                { type: 'input', name: 'reasonChangeOrSuspension', value: data.reasonChangeOrSuspension },
                { type: 'datepicker', name: 'dateSuspension', value: data.dateSuspension },
                { type: 'input', name: 'principle', value: data.principle },
                { type: 'input', name: 'brand', value: data.indication },
                { type: 'input', name: 'type', value: data.type },
            ]
        };

        return JSON.stringify(mongoObj);
    }
}
