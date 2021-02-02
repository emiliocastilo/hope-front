import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import StringUtils from '../../utils/StringUtils';
import FormUtils from '../../utils/FormUtils';
import { NotificationService } from '../../services/notification.service';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';
import { HttpClient } from '@angular/common/http';
import { HealthOutcomeService } from 'src/app/modules/pathology/patients/services/health-outcome.service';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit, OnDestroy {
    public config: FieldConfig[] = [];
    public buttons: string[] = [];
    public filledForm: any;
    @Input() key = '';
    patient: PatientModel;
    emptyForm: any;

    constructor(private _formsService: FormsService, public _translate: TranslateService, private _notification: NotificationService, private hoService: HealthOutcomeService, private _http: HttpClient) {}

    ngOnInit(): void {
        this.getPatientId();
        this.getAndParseForm();
    }

    getPatientId() {
        this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
    }

    async getAndParseForm() {
        const retrievedForm: any = await this._formsService.retrieveForm(this.key, this.patient.id);
        if (retrievedForm && retrievedForm.data && retrievedForm.data.length > 0) {
            this.filledForm = retrievedForm.data;
        }
        const data: any = await this._formsService.get(this.key);
        if (data) {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const cie = currentUser ? currentUser.rolSelected.hospital.cie.replace('CIE', 'CIE ') : 'CIE';
            data.form = data.form.replace(/{{currentCIE}}/g, cie);

            this.emptyForm = this._parseStringToJSON(data.form);
            this.config = FormUtils.createFieldConfig(this.emptyForm, this.filledForm);
            const buttons = this._parseStringToJSON(data.buttons);
            this.buttons = FormUtils.createButtons(buttons);
        } else {
            this._notification.showErrorToast('formNotFound');
        }
        this.detectCalculatedBackOnInit();
        this._formsService.setSavedForm(true);
        this.buttons.forEach((button) => {
            if (button === 'save') {
                this._formsService.setMustBeSaved(true);
            }
        });
    }

    submit(value: { [name: string]: any }) {
        console.log(value);
        if (value) {
            const form = {
                template: this.key,
                data: FormUtils.parseEntriesForm(value, this.config),
                patientId: this.patient.id,
            };
            if (this.filledForm) {
                this.updateForm(form);
            } else {
                this.fillForm(form);
            }
            this._formsService.setSavedForm(true);
            if (this.key === 'dlqi') {
                const ho = {
                    patientId: this.patient.id,
                    date: new Date(value.evaluationDate).toISOString(),
                    indexType: 'DLQI',
                    value: value.dlqiScore,
                    result: value.clasificationScore,
                };
                this.hoService.saveScore([ho]).subscribe(
                    () => {},
                    ({ error }) => {
                        this._notification.showErrorToast(error.errorCode);
                    }
                );
            }
        } else {
            this._notification.showErrorToast('errorForm');
        }
    }

    detectCalculatedBackOnInit() {
        const calculatedFields = this.config.filter((e) => e.calculated_back && e.event === 'init');
        const params = [];
        if (calculatedFields && calculatedFields.length > 0) {
            calculatedFields.forEach((field) => {
                const patient = this.patient.id;
                let urlEndpoint = field.endpoint;
                urlEndpoint = urlEndpoint.replace('${patient}', patient);
                for (let f = 0; f < params.length; f++) {
                    const configParams = this.config.filter((e) => e.name === params[f]);
                    if (configParams != null && configParams.length > 1) {
                        urlEndpoint = urlEndpoint.replace('${' + f + '}', configParams[0].value);
                    }
                }
                field.value = this._http.get(urlEndpoint).toPromise();
            });
        }
    }

    checkHistoricField(val: any) {
        this.emptyForm.forEach((field) => {
            if (field.type === 'historic') {
                const entry = {
                    date: new Date().toISOString(),
                    value: val && val[field.name],
                };
                field.historic.push(entry);
                val[field.name] = '';
            }
        });
        const json = {
            key: this.key,
            form: JSON.stringify(this.emptyForm),
        };
        this._formsService.updateForm(json).subscribe(
            (response) => {
                console.log(response);
            },
            (err) => console.log(err)
        );
    }

    fillForm(form: any) {
        this._formsService.fillForm(form).subscribe(
            () => {
                this.getAndParseForm();
                this._notification.showSuccessToast('elementCreated');
                this._formsService.setSavedForm(true);
            },
            ({ error }) => {
                this._notification.showErrorToast(error.errorCode);
            }
        );
    }

    updateForm(form: any) {
        this._formsService.updateForm(form).subscribe(
            (data: any) => {
                this.getAndParseForm();
                this._notification.showSuccessToast('elementUpdated');
                this._formsService.setSavedForm(true);
            },
            ({ error }) => {
                this._notification.showErrorToast(error.errorCode);
            }
        );
    }

    private _parseStringToJSON(form: string): JSON {
        //TODO: check if json is valid
        return JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(form));
    }

    ngOnDestroy() {
        this._formsService.setSavedForm(true);
    }
}
