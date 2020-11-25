export class DispensationModel {
  constructor(
    public id?: number,
    public date?: string,
    public startPeriod?: string,
    public endPeriod?: string,
    public numRecords?: number,
    public fileDispensation?: File
  ) {}
}
