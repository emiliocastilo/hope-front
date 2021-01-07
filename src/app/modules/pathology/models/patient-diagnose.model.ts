import { IndicationModel } from '../../management/models/indication/indication.model';
import { PatientModel } from '../patients/models/patient.model';
import { PatientTreatmentModel } from './patient-treatment.model';

export class PatientDiagnoseModel {
    id: number;
    patient: PatientModel;
    indication: IndicationModel;
    cieCode: string;
    cieDescription: string;
    othersIndications: string;
    initDate: Date;
    symptomsDate: Date;
    derivationDate: Date;
    treatments: Array<PatientTreatmentModel>;
}