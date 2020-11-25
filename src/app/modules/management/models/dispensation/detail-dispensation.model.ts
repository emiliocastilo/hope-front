export class DetailDispensationModel {
  constructor(
    public id: number,
    public date: string,
    public nhc: string,
    public code: string,
    public nationalCode: number,
    public description: string,
    public quantity: string,
    public amount: number,
    public daysDispensation: number
  ) {}
}
