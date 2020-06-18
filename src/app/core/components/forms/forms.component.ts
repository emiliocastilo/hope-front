import { Component, OnInit, Input } from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import StringUtils from '../../utils/StringUtils';
import FormUtils from '../../utils/FormUtils';
import { NotificationService } from '../../services/notification.service';
import { constants } from '../../../../constants/constants';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  public config: FieldConfig[] = [];
  public filledForm: any;
  @Input() key: string = 'TEST';
  patient = 1;

  constructor(
    private _formsService: FormsService,
    public _translate: TranslateService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.keyForms();
    this.getAndParseForm();
  }

  async getAndParseForm() {
    const retrievedForm: any = await this._formsService.retrieveForm(
      this.key,
      this.patient
    );
    if (retrievedForm && retrievedForm.data.length > 0) {
      this.filledForm = retrievedForm.data;
    }
    const data: any = await this._formsService.get(this.key);
    const form = this._parseStringToJSON(data.form);
    this.config = FormUtils.createFieldConfig(form, this.filledForm);
  }
  keyForms() {
    const url = window.location.pathname;
    switch (url) {
      case constants.URL_SOCIODEMOGRAPHIC:
        this.key = constants.KEY_SOCIODEMOGRAPHIC;
        break;
      case constants.URL_GENERALPATIENTDATA:
        this.key = constants.KEY_GENERALPATIENTDATA;
        break;
      case constants.URL_DIAGNOSIS:
        this.key = constants.KEY_DIAGNOSIS;
        break;
      case constants.URL_TRACING:
        this.key = constants.KEY_TRACING;
        break;
      case constants.URL_COMPLEMENTARYIMAGINGGSCANS:
        this.key = constants.KEY_COMPLEMENTARYIMAGINGGSCANS;
        break;
      case constants.URL_ADHERENCETOTREATMENT:
        this.key = constants.KEY_ADHERENCETOTREATMENT;
        break;
      case constants.URL_CONSENT:
        this.key = constants.KEY_CONSENT;
        break;
      default:
        this.key = 'TEST';
        break;
    }
  }
  submit(value: { [name: string]: any }) {
    const form = {
      template: this.key,
      data: FormUtils.parseEntriesForm(value),
      patientId: this.patient,
    };

    this.fillForm(form);
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

  private _parseStringToJSON(form: string): JSON {
    return JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(form));
  }
}
