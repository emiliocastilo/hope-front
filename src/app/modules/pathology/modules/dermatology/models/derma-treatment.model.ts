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
    lines?: LineTreatment[];
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

export interface LineTreatment {
    id?: number;
    treatmentId?: number;
    patientTreatment?: number;
    modificationCount?: number;
    type?: string;
    medicine?: MedicineModel;
    dose?: string;
    masterFormula?: string;
    masterFormulaDose?: string;
    regimen?: string;
    reason?: string;
    hadMedicineChange?: boolean;
    active?: boolean;
    suspensionDate?: Date | string;
    deleted?: boolean;
}

export interface SuspendTreatmentModel {
    lineId: number;
    suspensionDate: Date | string;
    reason: string;
}

export interface EditTreatmentModel {
    lineId: number;
    patientTreatment: number;
    hadMedicineChange?: boolean;
    reasonChange?: string;
    type?: string;
    medicine?: MedicineModel;
    dose?: string;
    masterFormula?: string;
    masterFormulaDose?: string;
    regimen?: string;

    datePrescription?: Date | string;
    expectedEndDate?: Date | string;
    initDate?: Date | string;
    observations?: string;
    other?: string;
    otherDose?: string;
    psychologicalImpact?: boolean;
    treatmentContinue?: boolean;
    visibleInjury?: boolean;
    pulsatileTreatment?: boolean;
}
