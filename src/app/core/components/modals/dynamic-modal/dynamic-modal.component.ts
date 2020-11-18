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
  public title = 'this is a test';
  @Input() key: string;
  @Input() fields: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private _formsService: FormsService) {}

  ngOnInit() {
    this.getAndParseForm();
  }

  onClose() {
    this.close.emit(null);
  }

  async getAndParseForm() {
    if (this.key) {
      const data: any = await this._formsService.get(this.key);
      if (data) {
        const emptyForm = this._parseStringToJSON(data.form);
        this.config = FormUtils.createFieldConfig(emptyForm);
        const buttons = this._parseStringToJSON(data.buttons);
        this.buttons = FormUtils.createButtons(buttons);
      }
    } else if (this.fields) {
      this.config = FormUtils.createFieldConfig(this.fields);
      this.buttons = FormUtils.createButtons(['save', 'cancel']);
    }
  }

  submit(value: { [name: string]: any }) {
    this.save.emit(value);
  }

  closeModal(cancel: boolean) {
    if (cancel) {
      this.close.emit(null);
    }
  }

  private _parseStringToJSON(form: string): JSON {
    return JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(form));
  }
}
