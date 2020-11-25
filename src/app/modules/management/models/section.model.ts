import { RolModel } from './rol.model';

export class SectionModel {
  constructor(
    public id?: number,
    public description?: string,
    public icon?: string,
    public active?: boolean,
    public order?: number,
    public principal?: boolean,
    public title?: string,
    public url?: string,
    public roles?: Array<RolModel>,
    public fatherSection?: SectionModel,
    public children?: Array<SectionModel>
  ) {}
}
