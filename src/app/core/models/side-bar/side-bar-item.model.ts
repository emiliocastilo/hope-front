export class SideBarItemModel {
  constructor(
    public id: number,
    public order: number,
    public title: string,
    public description,
    public icon: string,
    public url: string,
    public active: boolean,
    public principal: boolean,
    public children: Array<SideBarItemModel>,
    public collapsed?: boolean,
    public fatherSection?: SideBarItemModel
  ) {}
}
