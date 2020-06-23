import { Component, OnInit, Input } from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import StringUtils from '../../utils/StringUtils';
import FormUtils from '../../utils/FormUtils';
import { NotificationService } from '../../services/notification.service';
import { PatientModel } from 'src/app/modules/pathology/patients/models/patient.model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  public config: FieldConfig[] = [];
  public buttons: string[] = [];
  public filledForm: any;
  @Input() key = 'DATOS_SOCIODEMOGRAFICOS';
  patient: PatientModel;

  constructor(
    private _formsService: FormsService,
    public _translate: TranslateService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getPatientId();
    this.getAndParseForm();
  }

  getPatientId() {
    this.patient = JSON.parse(localStorage.getItem('selectedUser'));
  }

  async getAndParseForm() {
    const retrievedForm: any = await this._formsService.retrieveForm(
      this.key,
      this.patient.id
    );
    if (retrievedForm && retrievedForm.data && retrievedForm.data.length > 0) {
      this.filledForm = retrievedForm.data;
    }
    const data: any = await this._formsService.get(this.key);
    if (data) {
      const form = this._parseStringToJSON(data.form);
      this.config = FormUtils.createFieldConfig(form, this.filledForm);
      const buttons = this._parseStringToJSON(data.buttons);
      this.buttons = FormUtils.createButtons(buttons);
    } else {
      this._notification.showErrorToast('form_not_found');
    }
  }

  submit(value: { [name: string]: any }) {
    if (value) {
      const form = {
        template: this.key,
        data: FormUtils.parseEntriesForm(value),
        patientId: this.patient.id,
      };

      if (this.filledForm) {
        this.updateForm(form);
      } else {
        this.fillForm(form);
      }
    } else {
      this._notification.showErrorToast('error_form');
    }
  }

  fillForm(form: any) {
    this._formsService.fillForm(form).subscribe(
      () => {
        this._notification.showSuccessToast('element_created');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  updateForm(form: any) {
    this._formsService.updateForm(form).subscribe(
      () => {
        this._notification.showSuccessToast('element_updated');
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
}
