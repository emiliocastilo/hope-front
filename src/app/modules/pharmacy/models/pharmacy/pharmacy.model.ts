export class PharmacyModel {
    patientId: number;
    dispensationPickDate: Date;
    nationalCode: string;
    botCode: string;
    presentationDesc: string;
    quantity: number;
    dispensedMg: number;
    unitaryCost: number;
    totalCost: number;
    clinicalTrial: boolean;

    constructor(obj?: Partial<PharmacyModel>) {
        this.setValuesFromObject(obj);
    }

    public setValuesFromObject (obj?: Partial<PharmacyModel>) {
        this.patientId = obj && obj.patientId ? obj.patientId : undefined;
        this.dispensationPickDate = obj && obj.dispensationPickDate ? obj.dispensationPickDate : undefined;
        this.nationalCode = obj && obj.nationalCode ? obj.nationalCode : undefined;
        this.botCode = obj && obj.botCode ? obj.botCode : undefined;
        this.presentationDesc = obj && obj.presentationDesc ? obj.presentationDesc : undefined;
        this.quantity = obj && obj.quantity ? obj.quantity : undefined;
        this.dispensedMg = obj && obj.dispensedMg ? obj.dispensedMg : undefined;
        this.unitaryCost = obj && obj.unitaryCost ? obj.unitaryCost : undefined;
        this.totalCost = obj && obj.totalCost ? obj.totalCost : undefined;
        this.clinicalTrial = obj && obj.clinicalTrial ? obj.clinicalTrial : undefined;
    }
}
