import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NonParmacologicServices {
  constructor(private _http: HttpClient) {}

  getAll(query: string): Observable<any> {
    return this._http.get(`/patients-treatments?${query}`);
  }

  delete(query: string): Observable<any> {
    return this._http.delete(`/patients-treatments?${query}`);
  }

  create(query: string, body: any): Observable<any> {
    return this._http.post(`/patients-treatments?${query}`, body);
  }

  update(query: string, body: any): Observable<any> {
    return this._http.put(`/patients-treatments?${query}`, body);
  }

  getMock(query: string): any {
    const object = {
      content: [
        {
          specialIndication: true,
          bigPsychologicalImpact: false,
          visibleInjury: true,
          other: 'many words text or notes.',
          uvb: true,
          psoralenoPlusUva: false,
          waveLongitude: 2,
          timesAWeek: 3,
          datePrescription: '2020-06-10T00:00:00',
          dateStart: '2020-06-10T00:00:00',
          indication: 'Psoriasis en placas',
          dateEnd: null,
          sessionNumbers: 20,
          expectedEndDate: '2020-06-10T00:00:00',
          principle: 'Adalimuma',
          brand: 'Marca',
          dose: '30',
          type: 'Químico',
          observations: 'Observaciones',
        },
      ],
      pageable: {
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        pageNumber: 0,
        pageSize: 5,
        offset: 0,
        paged: true,
        unpaged: false,
      },
      totalPages: 6,
      totalElements: 27,
      last: false,
      first: true,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      numberOfElements: 5,
      size: 5,
      number: 0,
      empty: false,
    };
    return object;
  }
}
