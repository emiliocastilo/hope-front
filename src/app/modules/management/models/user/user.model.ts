import { ServiceModel } from '../../../../core/models/service/service.model';
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
    public username?: string,
    public email?: string,
    public roles?: Array<RolModel>,
    public rolSelected?: Array<RolModel>
  ) {}

  public setValuesFromDinamicForm(form: any) {
    const roles = form.roles ? form.roles[0] : null;

    /*const user: UsersModel = {
      id: form.userDTO ? form.userDTO.id : null,
      username: form.username,
      email: form.email,
      // los roles los coge de la patologia TODO en el futuro
      roles: roles ? roles : null,
    };*/

    this.name = form.name;
    this.surname = form.surname;
    this.phone = form.phone;
    this.dni = form.dni;
    this.collegeNumber = form.collegeNumber;
  }

  public setValuesFromObject(
    object: UsersModel,
    hospitals: HospitalModel[],
    hospitalId: number
  ) {
    const user: UsersModel = object;

    const hospital: HospitalModel[] = this.setHospital(hospitalId, hospitals);

    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.phone = user.phone;
    this.dni = user.dni;
    this.collegeNumber = user.collegeNumber;
    this.roles = user.roles;
    this.rolSelected = user.rolSelected;
  }

  private setHospital(id: number, hospitals: HospitalModel[]): HospitalModel[] {
    return hospitals.filter((value: HospitalModel) => value.id === id);
  }
}
