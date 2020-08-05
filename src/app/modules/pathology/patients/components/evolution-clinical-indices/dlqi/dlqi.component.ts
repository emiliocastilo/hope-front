import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from '../../../../../../core/services/forms/forms.service';
import { NotificationService } from '../../../../../../core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { constants } from '../../../../../../../constants/constants';

@Component({
  selector: 'app-dlqi',
  templateUrl: './dlqi.component.html',
  styleUrls: ['./dlqi.component.scss'],
})
export class DlqiComponent implements OnInit {
  key = constants.keyDlqi;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private _formsService: FormsService,
    private _notification: NotificationService,
    public _translate: TranslateService
  ) {}

  ngOnInit(): void {}
}
