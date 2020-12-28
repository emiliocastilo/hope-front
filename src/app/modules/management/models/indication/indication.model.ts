export class IndicationModel {
    id?: number;
    code?: string;
    description?: string;

    constructor(obj?: Partial<IndicationModel>) {
        this.setValuesFromObject(obj);
    }

    public setValuesFromObject(obj?: Partial<IndicationModel>) {
        this.id = obj && obj.id ? obj.id : undefined;
        this.code = obj && obj.code ? obj.code : undefined;
        this.description = obj && obj.description ? obj.description : undefined;
    }
}
