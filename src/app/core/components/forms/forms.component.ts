import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import StringUtils from '../../utils/StringUtils';
import FormUtils from '../../utils/FormUtils';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  public config: FieldConfig[] = [];
  public filledForm: any;
  key = 'TESTING';
  patient = 1;

  constructor(
    private _formsService: FormsService,
    public _translate: TranslateService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
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

  submit(value: { [name: string]: any }) {
    const form = {
      template: this.key,
      data: FormUtils.parseEntriesForm(value),
      patientId: this.patient,
    };

    console.log(form);
    // this.fillForm(form);
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
