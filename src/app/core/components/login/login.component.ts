import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
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
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get formControl() { return this.loginForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const login = new LoginModel(this.formControl.username.value, this.formControl.password.value);
    this.loading = true;
    this._loginService.login(login)
      .subscribe(
        data => {

          if (data.url != null && data.url.includes("choose_profile")) {
            this._router.navigate(['dermatology']);
          } else {
            this._router.navigate(['select-role']);
          }

        },
        error => {
          this.loading = false;
          console.log(<any>error);
          this._toastr.error(error.status + " " + error.statusText);
        });
  }
}
