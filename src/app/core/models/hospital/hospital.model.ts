import { ServiceModel } from 'src/app/core/models/service/service.model';

export class HospitalModel {
  constructor(
    public id: number,
    public name: string,
    public serviceDTO: ServiceModel[]
  ) {}
}
