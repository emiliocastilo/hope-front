import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';

export interface DoseModel {
    id: number;
    codeAtc: string;
    description: string;
    doseIndicated: string;
    recommendation: string;
    name: string;
}

export interface RegimenTreatmentModel {
    name: string;
}

export interface VIHTreatmentModel {
    indication: string;
    family: string;
    atc: string;
    cn: string;
    tract: string;
    medicine: MedicineModel;
    dose: string | DoseModel;
    otherDosis: string;
    regimenTreatment: RegimenTreatmentModel;
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