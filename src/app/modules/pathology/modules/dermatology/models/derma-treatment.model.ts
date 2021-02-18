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
    initDate?: Date | string;
    finalDate?: Date | string;
    endCause?: string;
    reason?: string;
    lines?: any[];
    suspensionDate?: Date | string;

    // ? Los que faltan
    psychologicalImpact: boolean = false;
    datePrescription: Date | string;
    expectedEndDate: Date | string;
    observations: string;
    otherDose: string;
    treatmentContinue: boolean = false;
    visibleInjury: boolean = false;
    pulsatileTreatment: boolean = false;
    other: string;
}
