export interface VIHTreatmentModel {
    indication: string;
    family: string;
    atc: string;
    cn: string;
    tract: string;
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