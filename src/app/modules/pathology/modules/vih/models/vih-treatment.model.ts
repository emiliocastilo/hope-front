import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';

export interface VIHTreatmentModel {
    indication: string;
    family: string;
    atc: string;
    cn: string;
    tract: string;
    medicine: MedicineModel;
    dose: string;
    otherDosis: string;
    regimenTreatment: string;
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