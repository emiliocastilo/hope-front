import { ServiceModel } from '../../../../core/models/service/service.model';
import { UserModel } from '../../../../core/models/user/user.model';
import { HospitalModel } from '../../../../core/models/hospital/hospital.model';
import { RolModel } from '../rol.model';

export class UsersModel {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public phone?: string,
    public dni?: string,
    public collegeNumber?: string,
    public userDTO?: UserModel,
    public username?: string,
    public email?: string,
    public roles?: Array<RolModel>
  ) {}

  public setValuesFromDinamicForm(form: any) {
    const roles: RolModel = form.roles ? form.roles[0] : null;

    const user: UserModel = {
      id: form.userDTO ? form.userDTO.id : null,
      username: form.username,
      email: form.email,
      // los roles los coge de la patologia TODO en el futuro
      roles: roles ? roles.description : null,
    };

    this.name = form.name;
    this.surname = form.surname;
    this.phone = form.phone;
    this.dni = form.dni;
    this.collegeNumber = form.collegeNumber;
    this.userDTO = user;
  }

  public setValuesFromObject(object: UsersModel, hospitals: HospitalModel[]) {
    const user: UserModel = object.userDTO;

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
    this.userDTO = user;
    this.roles = object.roles;
  }

  private setHospital(id: number, hospitals: HospitalModel[]): HospitalModel[] {
    return hospitals.filter((value: HospitalModel) => value.id === id);
  }
}
