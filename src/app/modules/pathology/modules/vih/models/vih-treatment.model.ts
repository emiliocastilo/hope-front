import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';
import { PatientDiagnoseModel } from '../../../models/patient-diagnose.model';

export class VihTreatmentModel {
    treatmentId?: number;
    patientDiagnose?: PatientDiagnoseModel;
    active?: boolean = true;
    medicine?: MedicineModel;
    dose?: string; // ! Debería ser DoseModel
    regimen?: string;
    initDate?: Date | string;
    finalDate?: Date | string;
    endCause?: string;
    reason?: string;
    lines?: VihLineTreatment[];
    suspensionDate?: Date | string;
    gesidaGuideline?: string;
    // ? Los que faltan
    datePrescription: Date | string;
    expectedEndDate: Date | string;
    observations: string;
    otherDose: string;
}

export interface VihLineTreatment {
    otherDose: string;
    datePrescription: Date | string;
    initDate: Date | string;
    expectedEndDate: Date | string;
    observations: string;
    lineId?: number;
    treatmentId?: number;
    patientTreatment?: number;
    modificationCount?: number;
    medicine?: MedicineModel;
    dose?: string;
    regimen?: string;
    reason?: string;
    hadMedicineChange?: boolean;
    active?: boolean;
    suspensionDate?: Date | string;
    deleted?: boolean;
    gesidaGuideline?: string;
}

export interface SuspendTreatmentModel {
    lineId: number;
    suspensionDate: Date | string;
    reason: string;
}

export interface VihEditTreatmentModel {
    lineId: number;
    patientTreatment: number;
    hadMedicineChange?: boolean;
    modificationCount?: number;
    reason?: string;
    medicine?: MedicineModel;
    dose?: string;
    regimen?: string;

    datePrescription?: Date | string;
    expectedEndDate?: Date | string;
    initDate?: Date | string;
    observations?: string;
    otherDose?: string;
    gesidaGuideline?: string;
}

export interface ValueKeyModel {
    id: number | string;
    name: string;
}
export interface VIHDoseModel {
    id: number;
    codeAtc: string;
    description: string;
    doseIndicated: string;
    recommendation: string;
    name: string;
}

export interface VIHTreatmentModel {
    treatmentType: ValueKeyModel | string;
    indication: string;
    family: string;
    atc: string;
    cn: string;
    tract: string;
    medicine: MedicineModel;
    dose: string | VIHDoseModel;
    otherDosis: string;
    pattern: ValueKeyModel;
    datePrescription: Date;
    dateStart: Date;
    expectedEndDate: Date;
    observations: string;
    treatmentContinue: boolean;
    treatmentPulsatil: boolean;
    reasonChangeOrSuspension: string;
    dateSuspension: Date;
    principle: string;
    brand: string;
    type: string;
}
