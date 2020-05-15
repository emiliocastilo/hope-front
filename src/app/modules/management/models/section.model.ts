export class SectionModel {
  constructor(
    public active?: boolean,
    public children?: SectionModel,
    public description?: string,
    public icon?: string,
    public id?: number,
    public order?: number,
    public principal?: boolean,
    public title?: string,
    public url?: string,
    public fatherSection?: string,
    public roles?: string
  ) {}
}
