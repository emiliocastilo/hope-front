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
    const data = {
      template: 'farmacologies-treatments',
      data: [
        {
          type: 'table',
          name: 'principal-treatment',
          value: [
            {
              indication: 'PALMOPLANTAR',
              specialIndication: false,
              bigPsychologicalImpact: false,
              visibleInjury: false,
              others: '',
              medicine: {
                dateCreated: null,
                dateUpdated: null,
                id: 2,
                actIngredients: 'abacavir, lamivudina, zidovudina',
                codeAct: 'J05AR04',
                acronym: 'ABC/3TC/AZT',
                nationalCode: '704508',
                description:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg EFG',
                presentation:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg COMPRIMIDOS RECUBIERTOS CON PELÍCULA EFG, 60 comprimidos ( blíster PVC/Aclar/Aluminio)',
                commercialization: false,
                biologic: false,
                viaAdministration: 'oral',
                family: 'family2',
                name:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg EFG',
              },
              family: 'family2',
              atc: 'J05AR04',
              cn: '704508',
              tract: 'oral',
              dose: { name: 'Otra' },
              otherDosis: 'esta es',
              regimenTreatment: { name: 'Intensificada' },
              datePrescription: '2020-07-17T00:00:00.000Z',
              dateStart: '2020-07-18T00:00:00.000Z',
              expectedEndDate: '2020-07-10T00:00:00.000Z',
              observations: '',
              treatmentContinue: false,
              treatmentPulsatil: false,
              reasonChangeOrSuspension: null,
              dateSuspension: '2020-07-18T00:00:00.000Z',
              principle: 'abacavir, lamivudina, zidovudina',
              brand:
                'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg COMPRIMIDOS RECUBIERTOS CON PELÍCULA EFG, 60 comprimidos ( blíster PVC/Aclar/Aluminio)',
              type: 'family2',
            },
            {
              indication: 'PALMOPLANTAR',
              specialIndication: false,
              bigPsychologicalImpact: false,
              visibleInjury: false,
              others: '',
              medicine: {
                dateCreated: null,
                dateUpdated: null,
                id: 1,
                actIngredients: 'abacavir, lamivudina, zidovudina',
                codeAct: 'J05AR04',
                acronym: 'ABC/3TC/AZT',
                nationalCode: '701314',
                description:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA TEVA 300 mg/150 mg/300 mg EFG',
                presentation:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA TEVA 300 mg/150 mg/300 mg COMPRIMIDOS RECUBIERTOS CON PELÍCULA EFG, 60 comprimidos',
                commercialization: true,
                biologic: false,
                viaAdministration: 'oral',
                family: 'family1',
                name:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA TEVA 300 mg/150 mg/300 mg EFG',
              },
              family: 'family1',
              atc: 'J05AR04',
              cn: '701314',
              tract: 'oral',
              dose: {
                id: 27,
                codeAtc: 'J05AR04',
                description: 'description_2',
                doseIndicated: '5mg',
                recommendation: 'estandar',
                name: 'description_2',
              },
              otherDosis: '',
              regimenTreatment: { name: 'estandar' },
              datePrescription: '2020-07-11T00:00:00.000Z',
              dateStart: '2020-07-31T00:00:00.000Z',
              expectedEndDate: '',
              observations: '',
              treatmentContinue: false,
              treatmentPulsatil: false,
              reasonChangeOrSuspension: null,
              dateSuspension: null,
              principle: 'abacavir, lamivudina, zidovudina',
              brand:
                'ABACAVIR/LAMIVUDINA/ZIDOVUDINA TEVA 300 mg/150 mg/300 mg COMPRIMIDOS RECUBIERTOS CON PELÍCULA EFG, 60 comprimidos',
              type: 'family1',
            },
            {
              indication: 'PALMOPLANTAR',
              specialIndication: false,
              bigPsychologicalImpact: false,
              visibleInjury: false,
              others: '',
              medicine: {
                dateCreated: null,
                dateUpdated: null,
                id: 2,
                actIngredients: 'abacavir, lamivudina, zidovudina',
                codeAct: 'J05AR04',
                acronym: 'ABC/3TC/AZT',
                nationalCode: '704508',
                description:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg EFG',
                presentation:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg COMPRIMIDOS RECUBIERTOS CON PELÍCULA EFG, 60 comprimidos ( blíster PVC/Aclar/Aluminio)',
                commercialization: false,
                biologic: false,
                viaAdministration: 'oral',
                family: 'family2',
                name:
                  'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg EFG',
              },
              family: 'family2',
              atc: 'J05AR04',
              cn: '704508',
              tract: 'oral',
              dose: {
                id: 28,
                codeAtc: 'J05AR04',
                description: 'description_3',
                doseIndicated: '9mg',
                recommendation: 'reducida',
                name: 'description_3',
              },
              otherDosis: '',
              regimenTreatment: { name: 'reducida' },
              datePrescription: '2020-07-17T00:00:00.000Z',
              dateStart: '2020-06-11T00:00:00.000Z',
              expectedEndDate: '',
              observations: '',
              treatmentContinue: false,
              treatmentPulsatil: false,
              reasonChangeOrSuspension: null,
              dateSuspension: null,
              principle: 'abacavir, lamivudina, zidovudina',
              brand:
                'ABACAVIR/LAMIVUDINA/ZIDOVUDINA MYLAN 300 mg/150 mg/300 mg COMPRIMIDOS RECUBIERTOS CON PELÍCULA EFG, 60 comprimidos ( blíster PVC/Aclar/Aluminio)',
              type: 'family2',
            },
          ],
        },
      ],
      patientId: 5,
    };
    // for(let i = 0; i <= 100; i++) {
    //   data.data[0].value.push(data.data[0].value[0]);
    // }

    return data;
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
