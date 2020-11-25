export class HealthOutcomeModel {
  constructor(
    public id?: string,
    public patient?: string,
    public indexType?: string,
    public value?: string,
    public result?: string,
    public date?: string
  ) {}
}
