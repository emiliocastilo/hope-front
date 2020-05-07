import { ServiceModel } from '../../../../core/models/service/service.model';
import { UserModel } from '../../../../core/models/user/user.model';
import { HospitalModel } from '../../../../core/models/hospital/hospital.model';

export class MedicModel {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public phone?: string,
    public dni?: string,
    public collegeNumber?: string,
    public user?: UserModel,
    public username?: string,
    public password?: string,
    public email?: string,
    public service?: ServiceModel,
    public hospital?: HospitalModel
  ) {}

  public setValuesFromDinamicForm(form: any) {
    const service: ServiceModel = form.service ? form.service[0] : null;

    const user: UserModel = {
      username: form.username,
      password: form.password,
      email: form.email,
      roles: [2],
      hospitalId: form.hospitals ? form.hospitals[0].id : null,
    };

    this.name = form.name;
    this.surname = form.surname;
    this.phone = form.phone;
    this.dni = form.dni;
    this.collegeNumber = form.collegeNumber;
    this.user = user;
    this.service = service;
  }

  public setValuesFromObject(object: MedicModel) {
    const service: ServiceModel = object.service;

    const user: UserModel = object.user;

    this.id = object.id;
    this.username = user.username;
    this.email = user.email;
    this.name = object.name;
    this.surname = object.surname;
    this.phone = object.phone;
    this.dni = object.dni;
    this.collegeNumber = object.collegeNumber;
    this.user = user;
    this.service = service;
  }
}
