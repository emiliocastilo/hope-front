import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsService } from 'src/app/core/services/forms/forms.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UsersModel } from 'src/app/modules/management/models/user/user.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public currentUser: UsersModel;
  public form: FormGroup;
  public formKeys: string[];
  public showRequiredLegend: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private _formService: FormsService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.form = this._formBuilder.group({
      email: [
        this.currentUser.email,
        [
          Validators.required,
          Validators.pattern(
            '^(\\s?[^\\s,]+@[^\\s,]+\\.[^\\s,]+\\s?,)*(\\s?[^\\s,]+@[^\\s,]+\\.[^\\s,]+)$'
          ),
        ],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.formKeys = Object.keys(this.form.controls);
    this.checkAnyRequired(this.formKeys);
  }

  getInvalidLabel(formKey: string): string {
    const errors = this.form ? this.form.get(formKey).errors : undefined;
    const label = errors
      ? Object.keys(errors).filter((key: string) => errors[key])
      : undefined;
    return label ? `form.validate.${label[0]}` : 'form.validate.required';
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

  public send(): void {
    const form = {
      email: this.form.controls.email.value,
      subject: this.form.controls.subject.value,
      body: this.form.controls.message.value,
    };
    this._formService.support(form).subscribe(
      () => {
        this._notification.showSuccessToast('sent');
      },
      ({ error }) => {
        this._notification.showErrorToast(error.error);
      }
    );
  }
}
