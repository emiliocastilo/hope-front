export class PharmacyModel {
    nhc: string;
    date: Date;
    nationalCode: string;
    presentation: string;
    quantity: number;
    mgDispensed: number;
    unitCost: number;
    totalCost: number;
    testClinical: boolean;
    unitDose: number;

    botCode: string;

    constructor(obj?: Partial<PharmacyModel>) {
        this.setValuesFromObject(obj);
    }

    public setValuesFromObject(obj?: Partial<PharmacyModel>) {
        this.nhc = obj && obj.nhc ? obj.nhc : undefined;
        this.date = obj && obj.date ? obj.date : undefined;
        this.nationalCode = obj && obj.nationalCode ? obj.nationalCode : undefined;
        this.presentation = obj && obj.presentation ? obj.presentation : undefined;
        this.quantity = obj && obj.quantity ? obj.quantity : undefined;
        this.mgDispensed = obj && obj.mgDispensed ? obj.mgDispensed : undefined;
        this.unitCost = obj && obj.unitCost ? obj.unitCost : undefined;
        this.totalCost = obj && obj.totalCost ? obj.totalCost : undefined;
        this.testClinical = obj && obj.testClinical ? obj.testClinical : undefined;
        this.unitDose = obj && obj.unitDose ? obj.unitDose : undefined;

        this.botCode = obj && obj.botCode ? obj.botCode : undefined;
    }
}
