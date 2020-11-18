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
    this.setValuesFromObject(obj);
  }

  public setValuesFromObject(obj?: Partial<MedicineModel>) {
    this.dateCreated = obj && obj.dateCreated ? obj.dateCreated : undefined;
    this.dateUpdated = obj && obj.dateUpdated ? obj.dateUpdated : undefined;
    this.id = obj && obj.id ? obj.id : undefined;
    this.actIngredients =
      obj && obj.actIngredients ? obj.actIngredients : undefined;
    this.codeAct = obj && obj.codeAct ? obj.codeAct : undefined;
    this.acronym = obj && obj.acronym ? obj.acronym : undefined;
    this.nationalCode = obj && obj.nationalCode ? obj.nationalCode : undefined;
    this.description = obj && obj.description ? obj.description : undefined;
    this.presentation = obj && obj.presentation ? obj.presentation : undefined;
    this.content = obj && obj.content ? obj.content : undefined;
    this.authorizationDate =
      obj && obj.authorizationDate ? obj.authorizationDate : undefined;
    this.authorized = obj && obj.authorized ? obj.authorized : undefined;
    this.endDateAuthorization =
      obj && obj.endDateAuthorization ? obj.endDateAuthorization : undefined;
    this.commercialization =
      obj && obj.commercialization ? obj.commercialization : undefined;
    this.commercializationDate =
      obj && obj.commercializationDate ? obj.commercializationDate : undefined;
    this.endDateCommercialization =
      obj && obj.endDateCommercialization
        ? obj.endDateCommercialization
        : undefined;
    this.units = obj && obj.units ? obj.units : undefined;
    this.pvl = obj && obj.pvl ? obj.pvl : undefined;
    this.pvlUnitary = obj && obj.pvlUnitary ? obj.pvlUnitary : undefined;
    this.pvp = obj && obj.pvp ? obj.pvp : undefined;
    this.pathology = obj && obj.pathology ? obj.pathology : undefined;
    this.biologic = obj && obj.biologic ? obj.biologic : undefined;
    this.viaAdministration =
      obj && obj.viaAdministration ? obj.viaAdministration : undefined;
    this.family = obj && obj.family ? obj.family : undefined;
    this.brand = obj && obj.brand ? obj.family : undefined;
  }
}
