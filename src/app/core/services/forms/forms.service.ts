import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import FormUtils from '../../utils/FormUtils';
import { FieldConfig } from '../../interfaces/dynamic-forms/field-config.interface';

export interface FormServiceConfig {
    key: string;
    config: FieldConfig[];
}

@Injectable({
    providedIn: 'root',
})
export class FormsService {
    constructor(private _http: HttpClient) { }

    private savedForm = true;
    private mustBeSaved = false;
    public editing = true;
    public currentConfig: FormServiceConfig;
    public currentForm: any;

    public async get (key: string) {
        return this._http.get(`/templates?key=${key}`).toPromise();
    }

    public fillForm (form: any) {
        return this._http.post('/forms', form);
    }

    public updateForm (form: any) {
        return this._http.put('/forms', form);
    }

    public async retrieveForm (template: string, patientId: any) {
        return this._http.get(`/forms?template=${template}&patientId=${patientId}`).toPromise();
    }

    public async retrieveFormGraph (template: string, patientId: any) {
        return this._http.get(`/forms/graphs?template=${template}&patientId=${patientId}`).toPromise();
    }

    public callEndpoint (endpoint: string): Observable<any> {
        return this._http.get(endpoint);
    }

    public getFormData (query: string) {
        return this._http.get(`/forms?${query}`);
    }

    public postEndpoint (endpoint: string, data: any): Observable<any> {
        return this._http.post(endpoint, data);
    }

    public getFormsDatas (query: string) {
        return this._http.get(`/forms/datas?${query}`, {
            responseType: 'text',
        });
    }

    public support (form: any) {
        return this._http.post('/support', form);
    }

    public getSavedForm (): boolean {
        return this.savedForm;
    }

    public setSavedStatusForm (saved: boolean) {
        this.savedForm = saved;
    }

    public getMustBeSaved (): boolean {
        return this.mustBeSaved;
    }

    public setMustBeSaved (mustBeSaved: boolean) {
        this.mustBeSaved = mustBeSaved;
    }

    public updateTemplateObject (form: FormGroup) {
        console.log(new Date().getTime(), 'updateTemplateObject', form);
        const formControls = this.currentConfig.config.filter(({ type }) => type !== 'button' || 'title');
        const configControls = formControls.map((item) => item.name);
        const parsedData = [];

        this.currentConfig.config.forEach((conf) => {
            if (form.controls[conf.name]) {
                parsedData.push({ name: conf.name, type: conf.type, value: form.controls[conf.name].value });
                if (conf.type === 'accordion') {
                    const accordionValue = [];
                    conf.accordion.panels.forEach((panel) => {
                        const panelContent = [];
                        panel.content.forEach((item) =>
                            panelContent.push({
                                type: item.type,
                                name: item.name,
                                value: form.controls[item.name] && form.controls[item.name].value ? form.controls[item.name].value : [],
                            })
                        );
                        accordionValue.push(panelContent);
                    });
                    parsedData[parsedData.length - 1].value = accordionValue;
                }
            }
        });

        this.savedForm = false;

        const form2save = {
            template: this.currentConfig.key,
            data: parsedData,
            patientId: JSON.parse(localStorage.getItem('selectedPatient')).id,
        };

        this.currentForm = form2save;
    }
}
