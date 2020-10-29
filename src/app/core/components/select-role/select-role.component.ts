import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { RoleService } from '../../services/role/role.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ProfileModel } from '../../models/login/profile.model';
import { NotificationService } from '../../services/notification.service';
import { RolModel } from '../../../modules/management/models/rol.model';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
})
export class SelectRoleComponent implements OnInit {
  selectRoleForm: FormGroup;
  loading = false;
  submitted = false;
  roles: Array<any>;
  selectedRole: RolModel;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    public _translate: TranslateService,
    public _notification: NotificationService,
    public _roleServices: RoleService
  ) {}
  ngOnInit() {
    this.selectRoleForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.roles = JSON.parse(this._roleServices.userRoles);

    if (this.roles.length === 1) {
      this.chooseProfile(this.roles[0]);
    }
  }

  chooseProfile(role: RolModel): void {
    this._loginService.postChooseProfile(role).subscribe(
      (data) => {
        const token = data.headers.get('Authorization');
        this.setCurrentRole(
          new ProfileModel(role, token, JSON.stringify(data.body))
        );
        this._router.navigate(['/']);
      },
      ({ error }) => {
        this.loading = false;
        this._notification.showErrorToast(error.errorCode);
      }
    );
  }

  setCurrentRole(data: ProfileModel): void {
    localStorage.setItem('role', JSON.stringify(data.role));
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user);
  }

  get formControl() {
    return this.selectRoleForm.controls;
  }

  onFormSubmit(selected: RolModel) {
    this.selectedRole = selected;
    if (!this.selectedRole) {
      return;
    }
    this.chooseProfile(this.selectedRole);
  }
}
