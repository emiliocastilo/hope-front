import { MedicineModel } from '../../management/models/medicines/medicines.model';
import { PatientDiagnoseModel } from './patient-diagnose.model';

export class PatientTreatmentModel {
    id: number;
    patientDiagnose: PatientDiagnoseModel;
    active: boolean;
    type: string;
    medicine: MedicineModel;
    dose: string;
    masterFormula: string;
    masterFormulaDose: string;
    regimen: string;
    initDate: Date;
    finalDate: Date;
    endCause: string;
    reason: string;
}
