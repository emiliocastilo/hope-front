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

  public setValuesFromDinamicForm(form: any, selectedRoles: Array<RolModel>) {
    const parsedRoles = [];
    selectedRoles.forEach((r: RolModel) => parsedRoles.push(r.id));
    this.name = form.name;
    this.surname = form.surname;
    this.phone = form.phone;
    this.dni = form.dni;
    this.collegeNumber = form.collegeNumber;
    this.roles = parsedRoles;
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
