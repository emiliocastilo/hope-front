import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(
    private _formsService: FormsService,
    public _translate: TranslateService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._formsService.get().subscribe(
      (response) => {
        debugger;
      },
      (error) => {
        this._toastr.error(error.message);
      }
    );
  }
}
