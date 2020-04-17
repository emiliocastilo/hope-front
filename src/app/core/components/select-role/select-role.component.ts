import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.sass']
})
export class SelectRoleComponent implements OnInit {

  selectRoleForm: FormGroup;
  loading = false;
  submitted = false;
  roles: Array<string>;
  selectedRole: String;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    public _translate: TranslateService,
    private _toastr: ToastrService
  ) { }
  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    console.log("ngOnInit: ", this.roles);

    if (this.roles.length <= 1) {
      this._loginService.postChooseProfile(this.roles[0])
        .subscribe(
          data => {
            //TODO que hacer?
            this._router.navigate(['/']);
          },
          error => {
            this.loading = false;
            console.log(<any>error);
            this._toastr.error(error.status + " " + error.statusText);
          });
    }

    this.selectRoleForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSelect(selected: String): void {
    this.selectedRole = selected;
  }

  get formControl() { return this.selectRoleForm.controls; }

  onFormSubmit() {
    console.log("onFormSubmit: ", this.selectRoleForm);
    this.submitted = true;
    if (this.selectRoleForm.invalid) {
      return;
    }

    this.loading = true;
    //TODO: Realizar la llamada al back para seleccionar un rol.
  }
}
