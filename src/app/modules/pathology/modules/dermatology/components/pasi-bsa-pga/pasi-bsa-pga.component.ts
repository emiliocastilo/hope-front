import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import PasiUtils from './PasiUtils';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PatientModel } from '../../../../models/patient.model';
import { constants } from '../../../../../../../constants/constants';
import { HealthOutcomeService } from '../../services/health-outcome.service';
import { HealthOutcomeModel } from '../../models/health-outcome.model';
import { TranslateService } from '@ngx-translate/core';
import { ManyChartModalComponent } from 'src/app/core/components/modals/many-chart-modal/many-chart-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pasi-bsa-pga',
    templateUrl: './pasi-bsa-pga.component.html',
    styleUrls: ['./pasi-bsa-pga.component.scss'],
})
export class PasiBsaPgaComponent implements OnInit {
    pasiForm: FormGroup;
    pasiScore: string;
    bsaScore: string;
    pgaScore: any;
    bsaCalification: string;
    pasiCalification: string;
    pgaCalification: string;
    today: string;
    cabeza: boolean;
    tronco: boolean;
    esup: boolean;
    einf: boolean;
    patient: PatientModel;
    filledForm: any;
    defaultChecked: boolean;
    key = constants.keyPasiBsaPga;

    constructor(private fb: FormBuilder, private _formsService: FormsService, private hoService: HealthOutcomeService, private _notification: NotificationService, private _modalService: NgbModal, public _translate: TranslateService) {}

    get area(): FormControl {
        return this.pasiForm.controls['area'] as FormControl;
    }
    get infiltracion(): FormControl {
        return this.pasiForm.controls['infiltracion'] as FormControl;
    }
    get escamas(): FormControl {
        return this.pasiForm.controls['escamas'] as FormControl;
    }
    get eritema(): FormControl {
        return this.pasiForm.controls['eritema'] as FormControl;
    }
    get valid(): boolean {
        return this.pasiForm.valid;
    }

    ngOnInit(): void {
        this.today = moment(new Date()).format('YYYY-MM-DD');
        this.getPatientId();
        this.getAndParseForm();
    }

    getPatientId() {
        this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
    }

    async getAndParseForm(event?: any) {
        let dateSelected: any;
        if (event) {
            dateSelected = event.target.value;
            this.onClear();
        }

        this.pasiForm = this.fb.group({
            cabeza: this.fb.group({
                area: new FormControl({ value: '', disabled: true }),
                eritema: new FormControl({ value: '', disabled: true }),
                infiltracion: new FormControl({ value: '', disabled: true }),
                escamas: new FormControl({ value: '', disabled: true }),
                total: '',
            }),
            tronco: this.fb.group({
                area: new FormControl({ value: '', disabled: true }),
                eritema: new FormControl({ value: '', disabled: true }),
                infiltracion: new FormControl({ value: '', disabled: true }),
                escamas: new FormControl({ value: '', disabled: true }),
                total: '',
            }),
            esup: this.fb.group({
                area: new FormControl({ value: '', disabled: true }),
                eritema: new FormControl({ value: '', disabled: true }),
                infiltracion: new FormControl({ value: '', disabled: true }),
                escamas: new FormControl({ value: '', disabled: true }),
                total: '',
            }),
            einf: this.fb.group({
                area: new FormControl({ value: '', disabled: true }),
                eritema: new FormControl({ value: '', disabled: true }),
                infiltracion: new FormControl({ value: '', disabled: true }),
                escamas: new FormControl({ value: '', disabled: true }),
                total: '',
            }),
            evaluationDate: [!event ? this.today : dateSelected, Validators.required],
            pga: ['', Validators.required],
            bsa: ['', Validators.required],
            pasi: ['', Validators.required],
        });
        if (!event) {
            const retrievedForm: any = await this._formsService.retrieveForm(this.key, this.patient.id);
            if (retrievedForm && retrievedForm.data && retrievedForm.data.length > 0) {
                this.filledForm = JSON.parse(retrievedForm.data.find((e) => e.type === 'form').value);
                this.pasiForm.setValue(this.filledForm);
                this.printFormValues(this.filledForm);
            }
        }
    }

    isChecked(event: any, field: string) {
        if (event) {
            this.pasiForm.controls[field].enable();
        } else {
            this.pasiForm.controls[field].reset('');
            this.pasiForm.controls[field].disable();
            this.pasiForm.controls[field].get('total').setValue('');
            this.pasiForm.controls[field].get('total').enable();
        }
        this[field] = event;
    }

    onSave() {
        const form = {
            template: this.key,
            data: PasiUtils.parseEntriesForm(this.pasiForm.value),
            patientId: this.patient.id,
        };

        if (this.pasiForm.valid) {
            if (this.filledForm) {
                this.updateForm(form);
            } else {
                this.fillForm(form);
            }
        }
    }

    saveHealthOutcome() {
        let healthOutcomeArray: HealthOutcomeModel[] = [];
        let ho: HealthOutcomeModel = {
            patientId: this.patient.id,
            date: new Date(this.pasiForm.value.evaluationDate).toISOString(),
        };
        for (let index = 0; index < 3; index++) {
            switch (index) {
                case 0:
                    healthOutcomeArray.push({
                        ...ho,
                        indexType: 'PASI',
                        value: this.pasiScore ? this.pasiScore : this.pasiForm.value.pasi,
                        result: this.pasiCalification,
                    });
                    break;
                case 1:
                    healthOutcomeArray.push({
                        ...ho,
                        indexType: 'BSA',
                        value: this.bsaScore ? this.bsaScore : this.pasiForm.value.bsa,
                        result: this.bsaCalification,
                    });
                    break;
                case 2:
                    healthOutcomeArray.push({
                        ...ho,
                        indexType: 'PGA',
                        value: this.pgaScore ? this.pgaScore : this.pasiForm.value.pga,
                        result: this.pgaCalification,
                    });
                    break;
            }
        }
        this.hoService.saveScore(healthOutcomeArray).subscribe(
            () => {},
            ({ error }) => {
                this._notification.showErrorToast(error.errorCode);
            }
        );
    }

    async showGraph() {
        const dataGraph: any = await this._formsService.retrieveFormGraph(this.key, this.patient.id);

        if (dataGraph.length > 0) {
            dataGraph.forEach((element) => {
                if (element.values.length > 0) {
                    element.values.forEach((value) => {
                        value.date = new Date(value.date);
                    });
                }
            });
        }

        this.showModal(dataGraph);
    }

    private showModal(data: any[]) {
        const modalRef = this._modalService.open(ManyChartModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = 'pasi';
        modalRef.componentInstance.data = data;
        modalRef.componentInstance.close.subscribe(() => {
            modalRef.close();
        });
    }

    getScore(scores: any) {
        this.pasiScore = scores.pasi;
        this.bsaScore = scores.bsa;
        this.pasiForm.controls.bsa.setValue(this.bsaScore);
        this.pasiForm.controls.pasi.setValue(this.pasiScore);
        this.pasiCalification = PasiUtils.getCalificationPasi(this.pasiScore);
        this.bsaCalification = PasiUtils.getCalificationBsa(this.bsaScore);
    }

    onSelectPGA(event: any) {
        const option = event.target.value.split(':')[1].trim();
        this.pgaCalification = PasiUtils.selectPGA(option);
        this.pgaScore = option;
    }

    fillForm(form: any) {
        this._formsService.fillForm(form).subscribe(
            () => {
                this.saveHealthOutcome();
                this._notification.showSuccessToast('elementCreated');
            },
            ({ error }) => {}
        );
    }

    updateForm(form: any) {
        this._formsService.updateForm(form).subscribe(() => {
            this.saveHealthOutcome();
            this._notification.showSuccessToast('elementUpdated');
        });
    }

    onClear() {
        this.pasiForm.reset();
        this.clearLabels();
        this.clearChecks();
    }

    clearChecks() {
        this.isChecked(false, 'cabeza');
        this.isChecked(false, 'tronco');
        this.isChecked(false, 'esup');
        this.isChecked(false, 'einf');
    }

    clearLabels() {
        this.pasiCalification = '';
        this.pgaCalification = '';
        this.bsaCalification = '';
        this.pasiScore = '';
        this.bsaScore = '';
    }

    printFormValues(form: any) {
        this.pasiCalification = PasiUtils.getCalificationPasi(form.pasi);
        this.bsaCalification = PasiUtils.getCalificationBsa(form.bsa);
        this.pgaCalification = PasiUtils.selectPGA(form.pga);
        Object.entries(form).forEach((e: any) => {
            if (typeof e[1] === 'object') {
                if (typeof e[1].total === 'number') {
                    this.isChecked(true, e[0]);
                }
            }
        });
    }
}
