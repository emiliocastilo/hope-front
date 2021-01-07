import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FormsService {
    constructor(private _http: HttpClient) {}

    private savedForm = true;
    private mustBeSaved = false;

    public async get(key: string) {
        return this._http.get(`/templates?key=${key}`).toPromise();
    }

    public fillForm(form: any) {
        return this._http.post('/forms', form);
    }

    public updateForm(form: any) {
        return this._http.put('/forms', form);
    }

    public async retrieveForm(template: string, patientId: any) {
        return this._http.get(`/forms?template=${template}&patientId=${patientId}`).toPromise();
    }

    public async retrieveFormGraph(template: string, patientId: any) {
        return this._http.get(`/forms/graphs?template=${template}&patientId=${patientId}`).toPromise();
    }

    public callEndpoint(endpoint: string): Observable<any> {
        return this._http.get(endpoint);
    }

    public postEndpoint(endpoint: string, data: any): Observable<any> {
        return this._http.post(endpoint, data);
    }

    public getFormsDatas(query: string) {
        return this._http.get(`/forms/datas?${query}`, {
            responseType: 'text',
        });
    }

    public support(form: any) {
        return this._http.post('/support', form);
    }

    public getSavedForm(): boolean {
        return this.savedForm;
    }

    public setSavedForm(saved: boolean) {
        this.savedForm = saved;
    }

    public getMustBeSaved(): boolean {
        return this.mustBeSaved;
    }

    public setMustBeSaved(mustBeSaved: boolean) {
        this.mustBeSaved = mustBeSaved;
    }
}
