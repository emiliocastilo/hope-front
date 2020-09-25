import { ServiceModel } from '../../../core/models/service/service.model';
import { HospitalModel } from '../../../core/models/hospital/hospital.model';
import { UserModel } from '../../../core/models/user/user.model';

export class RolModel {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public username?: string,
    public surname?: string,
    public phone?: string,
    public collegeNumber?: string,
    public dni?: string,
    public traduction?: string,
    public userDTO?: UserModel,
    public serviceDTO?: ServiceModel[],
    public hospital?: HospitalModel[]
  ) {}
  public setValuesFromDinamicForm(form: any) {
    const service: ServiceModel = form.serviceDTO ? form.serviceDTO[0] : null;
    const hospital: HospitalModel = form.hospital ? form.hospital[0] : null;

    const user: UserModel = {
      id: form.userDTO ? form.userDTO.id : null,
      username: form.username,
      password: form.password,
      email: form.email,
      // los roles los coge de la patologia TODO en el futuro
      roles: [5],
      hospitalId: hospital ? hospital.id : null,
    };

    this.name = form.name;
    this.surname = form.surname;
    this.phone = form.phone;
    this.dni = form.dni;
    this.collegeNumber = form.collegeNumber;
    this.userDTO = user;
    this.serviceDTO = service as any;
  }

  public setValuesFromObject(object: RolModel, hospitals: HospitalModel[]) {
    const services: ServiceModel[] = object.serviceDTO;

    const user: UserModel = object.userDTO;

    const hospital: HospitalModel[] = this.setHospital(
      user.hospitalId,
      hospitals
    );

    this.id = object.id;
    this.username = user.username;
    this.name = object.name;
    this.surname = object.surname;
    this.phone = object.phone;
    this.dni = object.dni;
    this.collegeNumber = object.collegeNumber;
    this.userDTO = user;
    this.serviceDTO = services;
    this.hospital = hospital;
  }

  private setHospital(id: number, hospitals: HospitalModel[]): HospitalModel[] {
    return hospitals.filter((value: HospitalModel) => value.id === id);
  }
}
