import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private _translate: TranslateService, private _toastr: ToastrService) {}

    showErrorToast(key: string) {
        this._translate.get(`notifications.${key}`).subscribe((value) => this._toastr.error(value));
    }

    showWarningToast(key: string) {
        this._translate.get(`notifications.${key}`).subscribe((value) => this._toastr.warning(value));
    }

    showSuccessToast(key: string) {
        this._translate.get(`notifications.${key}`).subscribe((value) => this._toastr.success(value));
    }
}
