import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  ) { }
  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    console.log(this.roles);

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
    this.submitted = true;
    if (this.selectRoleForm.invalid) {
      return;
    }

    this.loading = true;
    //TODO: Realizar la llamada al back para seleccionar un rol.
  }
}
