import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';

export interface ValueKeyModel {
    id: number | string;
    name: string;
}
export interface DoseModel {
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
    dose: string | DoseModel;
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
