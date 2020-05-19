import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _notification: NotificationService
  ) {}
  ngOnInit() {
    this.resetPasswordForm = this._formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get formControl() {
    return this.resetPasswordForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this._loginService.resetPassword(this.formControl.email.value).subscribe(
      (data) => {
        this._router.navigate(['/']);
      },
      ({ error }) => {
        this.loading = false;
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }
}
