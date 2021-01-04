import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndicationModel } from '../../models/indication/indication.model';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class IndicationService {
    public indications: Array<IndicationModel>;

    constructor(private _http: HttpClient, private _translate: TranslateService) {}

    getList(): Observable<Array<IndicationModel>> {
        return this._http.get<Array<IndicationModel>>('/indications').pipe(
            map((response) => {
                response.forEach((element) => (element.description = this._translate.instant(element.description)));
                this.indications = response;
                return response;
            })
        );
    }
}
