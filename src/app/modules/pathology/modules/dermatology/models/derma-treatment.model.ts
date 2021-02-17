import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';
import { PatientDiagnoseModel } from '../../../models/patient-diagnose.model';

export class DermaTreatmentModel {
    id?: number;
    patientDiagnose?: PatientDiagnoseModel;
    active?: boolean = true;
    type?: string;
    medicine?: MedicineModel;
    dose?: string; // ! Debería ser DoseModel
    masterFormula?: string;
    masterFormulaDose?: string;
    regimen?: string;
    initDate?: Date;
    finalDate?: Date;
    endCause?: string;
    reason?: string;
    lines?: any[];

    // ? Los que faltan
    psychologicalImpact: boolean = false;
    datePrescription: Date;
    expectedEndDate: Date;
    observations: string;
    otherDose: string;
    treatmentContinue: boolean = false;
    visibleInjury: boolean = false;
    pulsatileTreatment: boolean = false;
    other: string;
    suspensionDate: Date;
}
