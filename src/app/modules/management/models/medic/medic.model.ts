import { ServiceModel } from '../../../../core/models/service/service.model';
import { UserModel } from '../../../../core/models/user/user.model';
import { HospitalModel } from '../../../../core/models/hospital/hospital.model';

export class MedicModel {
  constructor(
    public id?: number,
    public user?: UserModel,
    public name?: string,
    public surname?: string,
    public phone?: string,
    public dni?: string,
    public collegeNumber?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public service?: ServiceModel[],
    public hospital?: HospitalModel[],
    public services?: ServiceModel[]
  ) {}

  public setValuesFromDinamicForm(form: any) {
    const service: ServiceModel = form.service ? form.service[0] : null;
    const hospital: HospitalModel = form.hospital ? form.hospital[0] : null;

    const user: UserModel = {
      id: form.user ? form.user.id : null,
      username: form.username,
      password: form.password,
      email: form.email,
      roles: [2],
      hospitalId: hospital ? hospital.id : null,
    };

    this.name = form.name;
    this.surname = form.surname;
    this.phone = form.phone;
    this.dni = form.dni;
    this.collegeNumber = form.collegeNumber;
    this.user = user;
    this.service = service as any;
  }

  public setValuesFromObject(object: MedicModel, hospitals: HospitalModel[]) {
    const services: ServiceModel[] = object.service;

    const user: UserModel = object.user;

    const hospital: HospitalModel[] = this.setHospital(
      user.hospitalId,
      hospitals
    );

    this.id = object.id;
    this.username = user.username;
    this.email = user.email;
    this.name = object.name;
    this.surname = object.surname;
    this.phone = object.phone;
    this.dni = object.dni;
    this.collegeNumber = object.collegeNumber;
    this.user = user;
    this.service = services;
    this.hospital = hospital;
  }

  private setHospital(id: number, hospitals: HospitalModel[]): HospitalModel[] {
    return hospitals.filter((value: HospitalModel) => value.id === id);
  }
}
