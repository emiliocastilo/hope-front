import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/core/models/pagination/pagination/pagination.model';
import { DermaTreatmentModel } from '../models/derma-treatment.model';

@Injectable({
    providedIn: 'root',
})
export class DermaTreatmentsService {
    constructor(private _http: HttpClient) { }

    private readonly endPoint = '/patients-treatments';

    // ! API METHODS ! //

    public getAll (patientId: string): Observable<Pagination<any>> {
        const params: HttpParams = new HttpParams().set('patientId', patientId);
        return this._http.get<any>(`${this.endPoint}/find-by-patient`, { params });
    }

    public createTreatment (patientId: string, treatment: any): Observable<void> {
        return this._http.put<void>(`${this.endPoint}/new/${patientId}`, treatment);
    }

    public updateTreatment (patientId: string, treatment: any): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/update/${patientId}`, treatment);
    }

    public suspendTreatment (patientId: string, treatment: any): Observable<void> {
        return this._http.post<void>(`${this.endPoint}/${patientId}/suspend`, treatment);
    }

    public deleteTreatment (patientId: string, treatmentId: string): Observable<void> {
        return this._http.delete<void>(`${this.endPoint}/delete/${patientId}/${treatmentId}`);
    }

    // ! HELPERS ! //

    public form2obj (form: any, indication: string): DermaTreatmentModel {
        return new DermaTreatmentModel({
            active: true,
            dose: form.dose,
            // finalDate: this.parseDate(form.expectedEndDate),
            expectedEndDate: form.expectedEndDate,
            initDate: form.dateStart,
            lines: [],
            masterFormula: form.dosisFormulaMagistral,
            medicine: form.medicine,
            // patientDiagnose: this.currentIndication,
            regimen: form.regimenTreatment,
            type: form.treatmentType,
            psychologicalImpact: form.bigPsicologycalImpact,
            datePrescription: form.datePrescription,
            observations: form.observations,
            otherDose: form.otherDosis,
            treatmentContinue: form.treatmentContinue,
            visibleInjury: form.visibleInjury
        });
    }
}
