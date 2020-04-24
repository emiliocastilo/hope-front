export class HomeDashboardModule {
  constructor(
    public id: string,
    public order: string,
    public title: string,
    public icon: string | null,
    public url: string,
    public children: HomeDashboardModule[]
  ) {}
}
