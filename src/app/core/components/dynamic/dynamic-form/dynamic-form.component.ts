import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../interfaces/dynamic-forms/field-config.interface';
import FormUtils from '../../../utils/FormUtils';
import { ManyChartModalComponent } from 'src/app/core/components/modals/many-chart-modal/many-chart-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from '../../../services/forms/forms.service';
import { PatientModel } from 'src/app/modules/pathology/models/patient.model';
import { DynamicFormService } from '../../../services/dynamic-form/dynamic-form.service';
import { Subscription } from 'rxjs';
import { CalculatedBackService } from 'src/app/core/services/dynamic-form/calculated-back.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges, OnDestroy, OnInit {
    private currentPatient: PatientModel = JSON.parse(localStorage.getItem('selectedPatient'));
    private formObserver: Subscription;
    private onLoad: boolean = true;
    private formValueChangeSubscription: Subscription;

    @Input() config: FieldConfig[] = [];
    @Input() buttons: string[] = [];
    @Input() key: string;
    @Input() isModal: boolean = false;
    @Input() isAccordion: boolean = false;
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    form: FormGroup;
    public f: any;

    get controls() {
        return this.config.filter(({ type }) => type !== 'button' || 'title');
    }
    get changes() {
        return this.form.valueChanges;
    }
    get valid() {
        return this.form.valid;
    }
    get value() {
        return this.form.value;
    }

    constructor(private fb: FormBuilder, private _modalService: NgbModal, private _formsService: FormsService, private _dynamicFormService: DynamicFormService, private readonly calculatedBackService: CalculatedBackService) {}

    ngOnInit() {
        this.onLoad = true;
        if (this.isAccordion) this.form = this._dynamicFormService.form;
        else this.form = new FormGroup({});

        this.formObserver = this._dynamicFormService.getForm().subscribe((form: FormGroup) => {
            if (this.config.length > 0) {
                this.onLoad = true;
                if (this.formValueChangeSubscription) this.formValueChangeSubscription.unsubscribe();

                this.form = form;
                this.detectCalculated();
                this.displayElement(this.config);

                if (!this.isAccordion) this._formsService.currentConfig = { key: this.key, config: this.config };

                this.formValueChangeSubscription = this.form.valueChanges.subscribe((f) => {
                    if (!this.onLoad && !this.isModal) this._formsService.updateTemplateObject(this.form);
                });
                setTimeout(() => {
                    this.onLoad = false;
                    this._formsService.setSavedStatusForm(true);
                }, 1000);
            }
        });

        if (this.isModal) {
            this.form = this._dynamicFormService.addControls(this.controls, this.config, this.isModal);
            this.displayElement(this.config);
            this.detectCalculated();
            this.detectCalculatedBack();
        } else this._dynamicFormService.addControls(this.controls, this.config, this.isModal);
    }

    ngOnChanges() {
        if (this.form) {
            if (this.key === 'personal-information') this.config = FormUtils.getLocalStoragePatientData(this.config);
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.name);
            const parsedData = [];

            controls.filter((control) => !configControls.includes(control)).forEach((control) => this.form.removeControl(control));
            configControls
                .filter((control) => !controls.includes(control))
                .forEach((name) => {
                    const config = this.config.find((control) => control.name === name);
                    if (this.isNormalType(config.type)) {
                        this.form.addControl(name, this.createControl(config));
                    }
                    if (config.type === 'table') {
                        this._formsService.setMustBeSaved(true);
                        const controlArray = this.createArray(config);
                        controlArray.removeAt(0);
                        this.form.addControl(name, controlArray);
                    }
                    if (config.type === 'historic') {
                        this.form.addControl(name, this.createHistoric(config));
                    }
                });

            this.detectCalculatedBack();
            this.detectCalculated();

            if (!this.isModal) this._dynamicFormService.setForm(this.form);
        }
    }

    public handleSubmit(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        if (this.valid && this.validationHistoric(event)) {
            const form = this.setValueToEmptyHistoricInput(event);
            this.submit.emit(form);
        } else {
            this.submit.emit(null);
        }
    }

    public cleanClick(event: Event): void {
        this.form.reset();
    }

    public cancelClick(): void {
        if (this.isModal) {
            this.cancel.emit(true);
        }
    }

    public showChartFront(event: Event): void {
        let parseData = [];
        if (this.controls.find((f) => f.type === 'historic')) {
            this.controls.forEach((control) => {
                if (control.type === 'historic' && control.historic && control.name !== 'date') {
                    const object = {
                        name: control.label,
                        values: this.parseIsoToDate(control.historic),
                    };
                    parseData.push(object);
                }
            });
        } else if (this.controls.find((f) => f.type === 'table')) {
            const charts = [];
            const tableRows = this.controls.find((f) => f.type === 'table').value;

            tableRows.forEach((row) => {
                Object.keys(row).forEach((field) => {
                    if (field !== 'date') {
                        if (!charts.find((f) => f.name === field)) charts.push({ name: field, values: [] });
                        charts.find((f) => f.name === field).values.push({ date: new Date(row.date), value: row[field] });
                    }
                });
            });
            parseData = charts;
        }

        this.showModal(parseData);
    }

    public async showChartFromBack(): Promise<any> {
        const patient = JSON.parse(localStorage.getItem('selectedPatient'));
        const dataGraph: any = await this._formsService.retrieveFormGraph(this.key, patient.id);

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

    private isNormalType(type: string): boolean {
        const isArray = ['table', 'historic', 'title', 'button'];
        const found = isArray.find((e) => e === type);
        if (found) {
            return false;
        } else {
            return true;
        }
    }

    private detectCalculated(): void {
        this.changes.subscribe((change: any) => {
            const params = [];
            // Calculated front
            let calculatedFields = this.config.filter((e) => e.calculated_front);
            if (calculatedFields && calculatedFields.length > 0) {
                calculatedFields.forEach((field) => {
                    field.params.forEach((e, i) => {
                        params[i] = change[e];
                    });
                    const value = FormUtils[field.formula](params);
                    this.form?.controls[field.name]?.setValue(value ? value : '', {
                        emitEvent: false,
                    });
                });
            }
            this.enabledThen(this.config);
            this.displayElement(this.config);
        });
    }

    private enabledThen(config: Array<FieldConfig>): void {
        const calculatedFields = config.filter((e) => e.enableWhen && e.enableWhen.length >= 2);
        if (calculatedFields && calculatedFields.length > 0) {
            calculatedFields.forEach((field) => {
                const controlName = field.enableWhen[0];

                if (this.form.controls[field.enableWhen[0]] && ((field.enableWhen[1] === 'not_empty' && this.form.controls[field.enableWhen[0]].value) || this.form.controls[field.enableWhen[0]].value === field.enableWhen[1])) {
                    this.setDisabled(field.name, false);
                } else {
                    this.setDisabled(field.name, true);
                    this.form.controls[field.name]?.setValue('', {
                        emitEvent: false,
                    });
                    if (field.type === 'checkbox') {
                        this.form.controls[field.name]?.setValue(false, {
                            emitEvent: false,
                        });
                    } else {
                        this.form.controls[field.name]?.setValue('', {
                            emitEvent: false,
                        });
                    }
                }
            });
        }
    }

    private detectCalculatedBack(): void {
        this.changes.pipe(debounceTime(800)).subscribe((change) => {
            const calculatedField: FieldConfig = this.config.find((e) => e.calculated_back); //TODO: actualmente solo funciona con un campo calculado en back por formulario (find)
            if (calculatedField) {
                if (this.dirtyFields(calculatedField.params) && this.validFields(calculatedField.params)) {
                    let body: any = {};
                    for (let index in calculatedField.params) {
                        body[calculatedField.params[index]] = change[calculatedField.params[index]];
                    }
                    this.calculatedBackService.calculateFieldInBack(calculatedField.endpoint, body).subscribe((calculatedValue: string) => {
                        this.form.get(calculatedField.name).setValue(calculatedValue);
                        this.form.markAsPristine();
                    });
                }
            }
        });
    }

    private validFields(fields: string[]): boolean {
        return fields.filter((field: string) => this.form.get(field).invalid).length === 0;
    }

    private dirtyFields(fields: string[]): boolean {
        const a = fields.filter((field: string) => this.form.get(field).dirty);
        return a.length > 0;
    }

    private displayElement(config: Array<FieldConfig>): void {
        const calculatedFields = config.filter((e) => e.hiddenWhen && e.hiddenWhen.length >= 2);
        if (calculatedFields && calculatedFields.length > 0) {
            calculatedFields.forEach((field) => {
                if (document.getElementById(field.name)) {
                    if (this.showWhen(field)) {
                        field.hidden = false;
                    } else if (field.type === 'table' || field.type === 'historic') {
                        field.hidden = true;
                        this.form.controls[field.name].setValue([], {
                            emitEvent: false,
                        });
                    } else {
                        field.hidden = true;
                        this.form.controls[field.name].setValue('', {
                            emitEvent: false,
                        });
                    }
                }
            });
        }
    }

    showWhen(field: FieldConfig) {
        // ? Cuando devuelve true el objeto es visible ? //
        if (field.hiddenWhen[0] === 'patientGender') {
            return this.currentPatient.genderCode !== field.hiddenWhen[1];
        } else {
            switch (field.hiddenWhen[1]) {
                case 'not_empty':
                    return this.form.controls[field.hiddenWhen[0]].value !== '';

                case 'empty':
                    return this.form.controls[field.hiddenWhen[0]].value !== null && this.form.controls[field.hiddenWhen[0]].value !== undefined && this.form.controls[field.hiddenWhen[0]].value !== '';

                default:
                    return !this.form.controls[field.hiddenWhen[0]] || this.form.controls[field.hiddenWhen[0]].value === field.hiddenWhen[1];
            }
        }
    }

    private createControl(config: FieldConfig): FormControl {
        if (config.calculated_front) {
            const params = [];
            config.params.forEach((e, i) => {
                // Diferenciamos para los calculated front según si es nuevo (carga defaultValues) o no
                params[i] = this.form ? this.form.getRawValue()[e] : this.config[i].value;
            });

            config.value = FormUtils[config.formula](params);
        }
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
    }

    private createArray(config: FieldConfig): FormArray {
        const group: FormGroup = this.fb.group({});
        config.fields.forEach((field) => {
            group.addControl(field.name, this.fb.control(''));
        });
        return this.fb.array([group]);
    }

    private createHistoric(config: FieldConfig): FormArray {
        const { validation } = config;
        const group = this.fb.group({});
        group.addControl('date', this.fb.control('', validation));
        group.addControl('value', this.fb.control('', validation));
        return this.fb.array([group]);
    }

    private parseIsoToDate(array: any[]): any[] {
        const parseArrayData = array
            .filter((object) => object.date && object.value)
            .map((object: any) => {
                object.date = object.date ? new Date(object.date) : object.date;
                return object;
            });
        return parseArrayData;
    }

    private showModal(data: any[]) {
        const modalRef = this._modalService.open(ManyChartModalComponent, {
            size: 'lg',
        });
        modalRef.componentInstance.title = this.config[0] ? this.config[0].name : '';
        modalRef.componentInstance.data = data;
        modalRef.componentInstance.close.subscribe(() => {
            modalRef.close();
        });
    }

    private setDisabled(name: string, disable: boolean): FieldConfig {
        if (this.form.controls[name]) {
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]({ emitEvent: false });
            return;
        }

        this.config = this.config.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }

    private validationHistoric(event: Event): boolean {
        let isValid: boolean = true;
        let historicWithValidations = this.config.filter((e) => e.validation && e.type === 'historic');
        if (historicWithValidations && historicWithValidations.length > 0) {
            historicWithValidations.forEach((f) => {
                f.validation.forEach((v) => {
                    if (v.name === 'required') {
                        isValid = !this.isStringEmpty(event.currentTarget[f.name].value) && isValid;
                    }
                });
            });
        }
        return isValid;
    }

    private setValueToEmptyHistoricInput(event: Event): any {
        const object = {
            date: '',
            value: '',
        };
        let configHistoric = this.config.filter((e) => e.type === 'historic');

        configHistoric.forEach((element) => {
            if (event.currentTarget[element.name] && this.isStringEmpty(event.currentTarget[element.name].value)) {
                const lastValue = this.value[element.name][this.value[element.name].length - 1];
                if (lastValue) {
                    const { date, value } = lastValue;
                    if (!this.isStringEmpty(date) && !this.isStringEmpty(value)) {
                        this.value[element.name].push(object);
                    }
                }
            }
        });
        return this.value;
    }

    private isStringEmpty(text: string): boolean {
        return !text || text === null || text === undefined || text === '';
    }

    ngOnDestroy() {
        this.formValueChangeSubscription.unsubscribe();
        this.formObserver.unsubscribe();
    }
}
