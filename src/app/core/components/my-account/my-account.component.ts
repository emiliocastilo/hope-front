import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersModel } from 'src/app/modules/management/models/user/user.model';
import { ChangePasswordModalComponent } from '../modals/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  public currentUser: UsersModel;
  public userDataForm: FormGroup;
  public formKeys: string[];

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCurrentuser();
  }

  public showChangePasswordModal(): void {
    const modalRef = this._modalService.open(ChangePasswordModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.title = 'changePassword';
    modalRef.componentInstance.user = this.currentUser;
    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });
  }

  private getCurrentuser() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userDataForm = this._formBuilder.group({
      username: [this.currentUser.username],
      email: [this.currentUser.email],
      role: [this.currentUser.rolSelected.name],
    });

    this.formKeys = Object.keys(this.userDataForm.controls);
  }
}
