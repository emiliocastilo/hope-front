import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import CustomValidators from 'src/app/core/services/forms/custom-validations';
import { LoginService } from 'src/app/core/services/login/login.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() data: any[];

  public userDataForm: FormGroup;

  public formKeys: string[];

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    public _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.userDataForm = this._formBuilder.group(
      {
        password: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            CustomValidators.patternValidator(/[!@#\$%\^\&*\)\(+=?¿¡._-]/, {
              hasSpecialCharacters: true,
            }),
            Validators.minLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: CustomValidators.passwordMatchValidator }
    );
    this.formKeys = Object.keys(this.userDataForm.controls);
  }

  public onClose() {
    this.close.emit(null);
  }

  public onSave() {
    if (!this.userDataForm.invalid) {
      const passwordObject = {
        password: this.userDataForm.get('password').value,
        newPassword: this.userDataForm.get('newPassword').value,
      };
      this._loginService.updatePassword(passwordObject).subscribe(
        (data: any) => {
          this._notification.showSuccessToast('passwordChangedSuccessfully');
          this.onClose();
        },
        ({ error }) => {
          this._notification.showErrorToast('passwordChangeFailed');
        }
      );
    }
  }

  public isFormValid() {
    return this.userDataForm.invalid;
  }

  public getInvalidLabel(formKey: string): string {
    const errors = this.userDataForm
      ? this.userDataForm.get(formKey).errors
      : undefined;
    const label = errors
      ? Object.keys(errors).filter((key: string) => errors[key])
      : undefined;
    return label ? `form.validate.${label[0]}` : 'form.validate.required';
  }
}
