import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';

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
      (data) => console.log('success', JSON.stringify(data)),
      (error) => this._toastr.error(error.message)
    );
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }
}
