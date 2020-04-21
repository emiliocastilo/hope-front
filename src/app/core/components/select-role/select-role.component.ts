import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { RoleService } from '../../services/role/role.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
  selectedRole: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    public _translate: TranslateService,
    private _toastr: ToastrService,
    public _roleServices: RoleService
  ) { }
  ngOnInit() {
    
    this.selectRoleForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.roles = JSON.parse(this._roleServices.userRoles);

    if (this.roles.length === 1) {
     this.chooseProfile(this.roles[0]);
    }
  }

  checkVarValue(value: any) {
    const pass = (value !== "undefined" && value !== "" && value !== null &&  value !== "null");
    return pass;
  }

  onSelect(selected: string): void {
    this.selectedRole = selected;
  }

  chooseProfile(role: string): void {
    this._loginService.postChooseProfile(role)
    .subscribe(
      data => {
        const token = data.headers.get('Authorization');
        this.setCurrentRole(role, token);
        this._router.navigate(['/']);
      },
      error => {
        this.loading = false;
        console.log(<any>error);
        this._toastr.error(error.status + " " + error.statusText);
      });
  }

  setCurrentRole(role: string, token: string): void {
    localStorage.setItem("role", role);
    localStorage.setItem('token', token);
  }

  get formControl() { return this.selectRoleForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (!this.selectedRole) {
      return;
    }
    this.loading = true;
    this.chooseProfile(this.selectedRole);
  }
}
