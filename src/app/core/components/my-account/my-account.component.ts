import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolModel } from 'src/app/modules/management/models/rol.model';
import { UserModel } from 'src/app/modules/management/models/user/user.model';
import { CurrentRoleListenerService } from '../../services/current-role-listener/current-role-listener.service';
import { ChangePasswordModalComponent } from '../modals/change-password-modal/change-password-modal.component';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    public currentUser: UserModel;
    public currentRole: RolModel;
    public userRoles: Array<RolModel>;
    public userDataForm: FormGroup;
    public formKeys: string[];

    constructor(
        private _roleListener: CurrentRoleListenerService, 
        private _formBuilder: FormBuilder, 
        private _router: Router, 
        private _modalService: NgbModal) {}

    ngOnInit(): void {
        this.getCurrentuser();
    }

    private getCurrentuser() {
        this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        this.userRoles = JSON.parse(localStorage.getItem('roles') || '{}');

        if (this.currentUser && this.currentUser.rolSelected) this.currentRole = this.currentUser.rolSelected;
        else this._router.navigate(['/login']);

        this.userDataForm = this._formBuilder.group({
            username: [this.currentUser.username],
            email: [this.currentUser.email],
            role: this.currentRole.name,
        });

        this.formKeys = Object.keys(this.userDataForm.controls);
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

    onSelectRole(selectedRole: RolModel) {
        this.currentRole = selectedRole;
        this._roleListener.setCurrentRole(this.currentRole);
    }
}
