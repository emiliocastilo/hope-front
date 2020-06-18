// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_API: 'http://192.168.110.45:8080/v1',
  //URL_API: ' http://localhost:8080/v1',
  URL_SOCIODEMOGRAPHIC: '/hopes/pathology/patients/sociodemographic-data',
  URL_GENERALPATIENTDATA: '/hopes/pathology/patients/general-patient-data',
  URL_DIAGNOSIS: '/hopes/pathology/patients/diagnosis',
  URL_TRACING: '/hopes/pathology/patients/tracing',
  URL_COMPLEMENTARYIMAGINGGSCANS:
    '/hopes/pathology/patients/complementary-imaging-scans',
  URL_ADHERENCETOTREATMENT: '/hopes/pathology/patients/adherence-to-treatment',
  URL_CONSENT: '/hopes/pathology/patients/consent',
  KEY_SOCIODEMOGRAPHIC: 'DATOS_SOCIODEMOGRAFICOS',
  KEY_GENERALPATIENTDATA: 'DATOS_GENERALES',
  KEY_DIAGNOSIS: 'DIAGNOSTICOS',
  KEY_TRACING: 'SEGUIMIENTO',
  KEY_COMPLEMENTARYIMAGINGGSCANS: 'EXPLORACION_COMPLEMENTARIA',
  KEY_ADHERENCETOTREATMENT: 'ADHERENCIA_AL_TRATEMIENTO',
  KEY_CONSENT: 'CONSENTIMIENTO',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
