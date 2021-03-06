import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login/login.model';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public _translate: TranslateService,
    public _notification: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const login = new LoginModel(
      this.formControl.username.value,
      this.formControl.password.value
    );
    this.loading = true;

    this._loginService.login(login).subscribe(
      (data) => {
        data.body.error
          ? this._notification.showErrorToast('errorUserLogin')
          : this._router.navigate(['select-role']);
        this.loading = false;
      },
      ({ error }) => {
        this.loading = false;
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }
}
