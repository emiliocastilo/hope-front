export class HomeDashboardModule {
  constructor(
    public id: number,
    public order: string,
    public title: string,
    public icon: string | null,
    public url: string,
    public children: HomeDashboardModule[],
    public description: string,
    public principal: boolean,
    public active?: boolean
  ) {}
}
