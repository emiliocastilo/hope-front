import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from 'src/app/core/interfaces/dynamic-forms/field-config.interface';
import FormUtils from 'src/app/core/utils/FormUtils';
import StringUtils from 'src/app/core/utils/StringUtils';
import { FormsService } from 'src/app/core/services/forms/forms.service';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
})
export class DynamicModalComponent implements OnInit {
  public config: FieldConfig[] = [];
  public buttons: string[] = [];
  @Input() key: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private _formsService: FormsService) {}

  ngOnInit() {
    this.getAndParseForm();
  }

  async getAndParseForm() {
    const data: any = await this._formsService.get(this.key);
    if (data) {
      const emptyForm = this._parseStringToJSON(data.form);
      this.config = FormUtils.createFieldConfig(emptyForm);
      const buttons = this._parseStringToJSON(data.buttons);
      this.buttons = FormUtils.createButtons(buttons);
    }
  }

  submit(value: { [name: string]: any }) {
    console.log('value modal form', value);
  }

  cancel(closeModal: boolean) {
    if (closeModal) {
      this.close.emit(null);
    }
  }

  private _parseStringToJSON(form: string): JSON {
    return JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(form));
  }
}
