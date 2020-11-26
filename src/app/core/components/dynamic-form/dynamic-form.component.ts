import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  
  
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import FormUtils from '../../utils/FormUtils';
import { ManyChartModalComponent } from 'src/app/core/components/modals/many-chart-modal/many-chart-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from '../../services/forms/forms.service';
import { NotificationService } from '../../services/notification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input() config: FieldConfig[] = [];
  @Input() buttons: string[] = [];
  @Input() key: string;
  @Input() isModal = false;
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

  constructor(
    private fb: FormBuilder,
    private _modalService: NgbModal,
    private _formsService: FormsService,
    private _notification: NotificationService,
    private _http: HttpClient
  ) {}  


  ngOnInit() {
    this.form = this.createGroup();       
  }


  isNormalType(type: string) {
    const isArray = ['table', 'historic', 'title', 'button'];
    const found = isArray.find((e) => e === type);
    if (found) {
      return false;
    } else {
      return true;
    }
  }

  detectCalculated() {
    this.changes.subscribe((change) => {
      const params = [];
      // Calculated front
      let calculatedFields = this.config.filter((e) => e.calculated_front);
      if (calculatedFields && calculatedFields.length > 0) {
        calculatedFields.forEach((field) => {
          field.params.forEach((e, i) => {
            params[i] = change[e];
          });
          const value = FormUtils[field.formula](params);
          this.form.controls[field.name].setValue(value ? value : '', {
            emitEvent: false,
          });
        });
      }
      this.enabledThen(this.config);
    });
  }

  enabledThen(config) {
    const calculatedFields = config.filter(
      (e) => e.enableWhen && e.enableWhen.length >= 2
    );
    if (calculatedFields && calculatedFields.length > 0) {
      calculatedFields.forEach((field) => {
        if (
          this.form.controls[field.enableWhen[0]].value === field.enableWhen[1]
        ) {
          this.setDisabled(field.name, false);
        } else {
          this.setDisabled(field.name, true);
          this.form.controls[field.name].setValue('', { emitEvent: false });
        }
      });
    }
  }

  detectCalculatedBack() {
    this.changes.subscribe((change) => {
      const params = [];
      // Calculated back
      const calculatedFields = this.config.filter(
        (e) => e.calculated_back && e.event === 'change'
      );
      if (calculatedFields && calculatedFields.length > 0) {
        calculatedFields.forEach((field) => {
          if (this.enabledWhen(field)) {
            this.setDisabled(field.name, false);
          } else {
            this.setDisabled(field.name, true);
            this.form.controls[field.name].setValue('', { emitEvent: false });
          }
          // field.params.forEach((e, i) => {
          //   params[i] = change[e];
          // });
          // const patient = JSON.parse(localStorage.getItem('selectedUser'));
          // let urlEndpoint = field.endpoint;
          // urlEndpoint = urlEndpoint.replace('${patient}', patient.id);
          // for (let f = 0; f < params.length; f++) {
          //   const configParams = this.config.filter(
          //     (e) => e.name === params[f]
          //   );
          //   if (configParams != null && configParams.length > 1) {
          //     urlEndpoint = urlEndpoint.replace(
          //       '${' + f + '}',
          //       configParams[0].value
          //     );
          //   }
          // }
          // const value = this._http.get(urlEndpoint).toPromise();
          // this.form.controls[field.name].setValue(value ? value : '', {
          //   emitEvent: false,
          // });
        });
      }
      setTimeout(() => {
        this.displayElement(this.config);
      }, 20);
    });
  }
  enabledWhen(field: FieldConfig) {
    if (field.enableWhen[1] === 'not_empty') {
      return this.form.controls[field.enableWhen[0]].value !== '';
    } else {
      return (
        this.form.controls[field.enableWhen[0]].value === field.enableWhen[1]
      );
    }
  }
  displayElement(config) {
    const calculatedFields = config.filter(
      (e) => e.hiddenWhen && e.hiddenWhen.length >= 2
    );
    if (calculatedFields && calculatedFields.length > 0) {
      calculatedFields.forEach((field) => {
        if (document.getElementById(field.name)) {
          if (this.hiddenWhen(field)) {
            field.hidden = false;
          } else if (field.type === 'table' || field.type === 'historic') {
            field.hidden = true;
            this.form.controls[field.name].setValue([], { emitEvent: false });
          } else {
            field.hidden = true;
            this.form.controls[field.name].setValue('', { emitEvent: false });
          }
        }
      });
    }
  }
  hiddenWhen(field: FieldConfig) {
    if (field.hiddenWhen[1] === 'not_empty') {
      return this.form.controls[field.hiddenWhen[0]].value !== '';
    } else {
      return (
        this.form.controls[field.hiddenWhen[0]].value === field.hiddenWhen[1]
      );
    }
  }
  ngOnChanges() {
    if (this.form) {      
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);     
      
      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

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
    }        
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach((control) => {
      group.addControl(control.name, this.createControl(control));      
    });
    return group;
  }

  createControl(config: FieldConfig) {
    if (config.calculated_front) {
      const params = [];
      config.params.forEach((e, i) => {
        params[i] = this.form.getRawValue()[e];
      });
      config.value = FormUtils[config.formula](params);      
    }
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  createArray(config: FieldConfig) {
    const group = this.fb.group({});
    config.fields.forEach((field) => {      
      group.addControl(field.name, this.fb.control(''));
    });
    return this.fb.array([group]);
  }

  createHistoric(config: FieldConfig) {
    const { validation } = config;
    const group = this.fb.group({});
    group.addControl('date', this.fb.control('', validation));
    group.addControl('value', this.fb.control('', validation));
    return this.fb.array([group]);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.valid && this.validationHistoric(event)) {
      const form = this.setValueToEmptyHistoricInput(event);
      this.submit.emit(form);     
    } else {
      this.submit.emit(null);
    }
  }

  cleanClick(event: Event) {
    this.form.reset();
  }

  cancelClick() {
    if (this.isModal) {
      this.cancel.emit(true);
    }
  }

  showChartFront(event: Event) {
    const parseData = [];
    this.controls.forEach((control) => {
      if (
        control.type === 'historic' &&
        control.historic &&
        control.name !== 'date'
      ) {
        const object = {
          name: control.label,
          values: this.parseIsoToDate(control.historic),
        };
        parseData.push(object);
      }
    });
    this.showModal(parseData);
  }

  async showChartFromBack() {
    const patient = JSON.parse(localStorage.getItem('selectedUser'));
    const dataGraph: any = await this._formsService.retrieveFormGraph(
      this.key,
      patient.id
    );

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
    modalRef.componentInstance.title = this.config[0]
      ? this.config[0].name
      : '';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  setDisabled(name: string, disable: boolean) {
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

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }

  private validationHistoric(event: Event): boolean {
    let isValid: boolean = true;
    let historicWithValidations = this.config.filter(
      (e) => e.validation && e.type === 'historic'
    );
    if (historicWithValidations && historicWithValidations.length > 0) {
      historicWithValidations.forEach((f) => {
        f.validation.forEach((v) => {
          if (v.name === 'required') {
            isValid =
              !this.isStringEmpty(event.currentTarget[f.name].value) && isValid;
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
      if (
        event.currentTarget[element.name] &&
        this.isStringEmpty(event.currentTarget[element.name].value)
      ) {
        const lastValue = this.value[element.name][
          this.value[element.name].length - 1
        ];
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

}
