export class MedicineModel {
    dateCreated?: Date;
    dateUpdated?: Date;
    id?: number;
    actIngredients?: string;
    codeAct?: string;
    acronym?: string;
    nationalCode?: number;
    description?: string;
    presentation?: string;
    content?: string;
    authorizationDate?: Date;
    authorized?: boolean | string;
    endDateAuthorization?: Date;
    commercialization?: boolean | string;
    commercializationDate?: Date;
    endDateCommercialization?: Date;
    units?: string;
    pvl?: string;
    pvlUnitary?: string;
    pvp?: string;
    pathology?: string;
    biologic?: boolean;
    viaAdministration?: string;
    family?: string;
    subfamily?: string;
    brand?: string;

    constructor(obj?: Partial<MedicineModel>) {
        this.dateCreated = obj && obj.dateCreated ? obj.dateCreated : undefined;
        this.dateUpdated = obj && obj.dateUpdated ? obj.dateUpdated : undefined;
        this.id = obj && obj.id ? obj.id : undefined;
        this.actIngredients = obj && obj.actIngredients ? obj.actIngredients : undefined;
        this.codeAct = obj && obj.codeAct ? obj.codeAct : undefined;
        this.acronym = obj && obj.acronym ? obj.acronym : undefined;
        this.nationalCode = obj && obj.nationalCode ? obj.nationalCode : undefined;
        this.description = obj && obj.description ? obj.description : undefined;
        this.presentation = obj && obj.presentation ? obj.presentation : undefined;
        this.commercialization = obj && obj.commercialization ? obj.commercialization : undefined;
        this.biologic = obj && obj.biologic ? obj.biologic : undefined;
        this.viaAdministration = obj && obj.viaAdministration ? obj.viaAdministration : undefined;
        this.family = obj && obj.family ? obj.family : undefined;
        this.brand = obj && obj.brand ? obj.brand : undefined;
    }

    public setValuesFromObject (object: any) {
        // const service: ServiceModel = object.service;
        // const pathology: PathologyModel = object.pathology;
        // const hospital: HospitalModel = object.hospital;
        // this.id = object.id;
        // this.name = object.name;
        // this.description = object.description;
        // this.code = object.code;
        // this.hospital = hospital;
        // this.pathology = pathology;
        // this.service = service;
    }
}
