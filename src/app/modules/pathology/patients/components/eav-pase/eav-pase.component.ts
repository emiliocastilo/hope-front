import { Component, OnInit } from '@angular/core';
import { constants } from '../../../../../../constants/constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionnaireAnalysisArtritisPsoriasicaComponent } from 'src/app/core/components/questionnaire-analysis-artritis-psoriasica/questionnaire-analysis-artritis-psoriasica.component';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ManyChartModalComponent } from 'src/app/core/components/modals/many-chart-modal/many-chart-modal.component';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import FormUtils from 'src/app/core/utils/FormUtils';

@Component({
  selector: 'app-eav-pase',
  templateUrl: './eav-pase.component.html',
  styleUrls: ['./eav-pase.component.scss'],
})
export class EavPaseComponent implements OnInit {
  key = constants.eavPase;
  public form: FormGroup;
  public maxDate: string = new Date().toISOString().split('T')[0];
  public formKeys: Array<string> = [];
  public showRequiredLegend: boolean = false;
  public arraysRadioButton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  patient: PatientModel;
  public retrievedForm;
  public retrievedFormFormat = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private _formsService: FormsService,
    private _notification: NotificationService,
    public _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
    this.getForm();
    this.form = this._formBuilder.group({
      dateEvaluation: [moment(new Date()).format('YYYY-MM-DD')],
      evaluationPrurito: [''],
      evaluationGlobalPatient: [''],
      evaluationGlobalMedic: [''],
      dateEvaluation2: [moment(new Date()).format('YYYY-MM-DD')],
      paseScoreTotal: [''],
      valuationSymptoms: [''],
      valuationFunctional: [''],
    });

    if (this.form) {
      this.formKeys = Object.keys(this.form.controls);
      this.checkAnyRequired(this.formKeys);
    }
  }

  async getForm() {
    this.retrievedForm = await this._formsService.retrieveForm(
      this.key,
      this.patient.id
    );

    if (this.retrievedForm && this.retrievedForm.data.length > 0) {
      for (const element of this.retrievedForm.data) {
        this.retrievedFormFormat[element.name] = element.value;
      }
    }
  }

  public checkIfRequired(key: string) {
    let isRequired: boolean = false;

    const field = this.form.get(key);

    if (field.validator) {
      if (field.validator({} as any)) {
        isRequired = field.validator({} as any).required;
      }
    }

    return isRequired;
  }

  public getType(formKey: string): string {
    let type = 'text';
    const key = formKey.toLowerCase();

    if (key.includes('date') || key.includes('period')) {
      type = 'date';
    }

    if (key.includes('phone') || key.includes('order')) {
      type = 'number';
    }

    if (key.includes('password')) {
      type = 'password';
    }
    return type;
  }

  getInvalidLabel(formKey: string): string {
    const errors = this.form ? this.form.get(formKey).errors : undefined;
    const label = errors
      ? Object.keys(errors).filter((key: string) => errors[key])
      : undefined;
    return label ? `form.validate.${label[0]}` : 'form.validate.required';
  }

  public checkAnyRequired(keys: Array<string>) {
    keys.forEach((key) => {
      const field = this.form.get(key);

      if (field.validator) {
        if (field.validator({} as any)) {
          if (field.validator({} as any).required) {
            this.showRequiredLegend = true;
          }
        }
      }
    });
  }

  public isActiveRadioButton(key, value) {
    const valueForm = parseInt(this.form.controls[key].value);
    if (valueForm === value) {
      return true;
    }
    return false;
  }

  public showModal() {
    event.preventDefault();
    const modalRef = this._modalService.open(
      QuestionnaireAnalysisArtritisPsoriasicaComponent,
      {
        size: 'xl',
      }
    );

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    modalRef.componentInstance.save.subscribe((event) => {
      this.form.controls['valuationSymptoms'].setValue(event.symptoms);

      this.form.controls['valuationFunctional'].setValue(event.functional);

      this.form.controls['paseScoreTotal'].setValue(event.pasetotal);
      modalRef.close();
    });
  }

  public resetForm() {
    this.form.reset({
      dateEvaluation: moment(new Date()).format('YYYY-MM-DD'),
      evaluationPrurito: '',
      evaluationGlobalPatient: '',
      evaluationGlobalMedic: '',
      dateEvaluation2: moment(new Date()).format('YYYY-MM-DD'),
      paseScoreTotal: '',
      valuationSymptoms: '',
      valuationFunctional: '',
    });
  }

  public isValidForm() {
    if (
      !this.form.controls['dateEvaluation'].value &&
      (this.form.controls['evaluationPrurito'].value ||
        this.form.controls['evaluationPrurito'].value ||
        this.form.controls['evaluationPrurito'].value)
    ) {
      this._notification.showErrorToast('missDate');
      return false;
    }

    if (
      !this.form.controls['dateEvaluation2'].value &&
      (this.form.controls['paseScoreTotal'].value ||
        this.form.controls['valuationSymptoms'].value ||
        this.form.controls['valuationFunctional'].value)
    ) {
      this._notification.showErrorToast('missDate');
      return false;
    }

    return true;
  }

  public save(rr) {
    if (!this.isValidForm()) {
      return;
    }
    const form = {
      patientId: this.patient.id,
      template: this.key,
      data: [],
    };
    let dateValue = '';
    for (let i = 0; i < this.formKeys.length; i++) {
      let object;
      if (i <= 3) {
        dateValue = this.form.controls['dateEvaluation'].value;
      } else {
        dateValue = this.form.controls['dateEvaluation2'].value;
      }

      object = {
        name: this.formKeys[i],
        type: 'historic',
        value: this.getValueForm(this.formKeys[i], dateValue),
      };

      form.data.push(object);
    }

    if (this.retrievedForm === null) {
      this._formsService.fillForm(form).subscribe(
        () => {
          this._notification.showSuccessToast('elementCreated');
          this.getForm();
          this.resetForm();
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    } else {
      this._formsService.updateForm(form).subscribe(
        (data: any) => {
          this._notification.showSuccessToast('elementUpdated');
          this.getForm();
          this.resetForm();
        },
        ({ error }) => {
          this._notification.showErrorToast(error.errorCode);
        }
      );
    }
  }

  getValueForm(key, date) {
    let currentValue = this.form.controls[key].value;
    if (currentValue && key.includes('date')) {
      currentValue = new Date(date).toLocaleDateString();
    }

    if (this.retrievedForm === null) {
      if (currentValue) {
        return [
          {
            date: date ? new Date(date).toISOString() : '',
            value: currentValue,
          },
        ];
      } else {
        return [];
      }
    } else {
      const value = this.retrievedFormFormat[key];
      if (currentValue) {
        value.push({
          date: date ? new Date(date).toISOString() : '',
          value: currentValue,
        });
      }
      return value;
    }
  }

  showChartFront() {
    event.preventDefault();

    const parseData = FormUtils.formatDataMultiGraph(
      this._translate,
      this.formKeys,
      'eavpase',
      this.retrievedFormFormat
    );

    this.showModalGraph(parseData);
  }

  private showModalGraph(data: any[]) {
    const modalRef = this._modalService.open(ManyChartModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.title = this._translate.instant('eavPase');
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  private parseIsoToDate(array: any[]): any[] {
    if (!array) {
      return [];
    }
    const parseArrayData = array.map((object: any) => {
      if (object.value) {
        object.date = object.date ? new Date(object.date) : object.date;
        return object;
      }
    });
    return parseArrayData;
  }
}
