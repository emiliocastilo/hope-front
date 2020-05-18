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
    public roles?: string,
    public fatherSection?: string,
    public children?: SectionModel
  ) {}
}
