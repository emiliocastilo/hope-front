import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';
import StringUtils from '../../utils/StringUtils';
import FormUtils from '../../utils/FormUtils';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  config: FieldConfig[] = [];

  constructor(
    private _formsService: FormsService,
    public _translate: TranslateService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._formsService.get().subscribe(
      (data) => {
        const form = this._parseStringToJSON(data.form);
        console.log(form);
        this.config = FormUtils.createFieldConfig(form);
      },
      (error) => {
        console.log(error as any);
        this._toastr.error(`${error.status} ${error.statusText}`);
      }
    );
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

  private _parseStringToJSON(form: string): JSON {
    return JSON.parse(StringUtils.replaceAllSimpleToDoubleQuotes(form));
  }
}
