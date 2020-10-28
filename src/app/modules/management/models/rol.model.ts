import { ServiceModel } from '../../../core/models/service/service.model';
import { HospitalModel } from '../../../core/models/hospital/hospital.model';
import { PathologyModel } from './patients/pathology.model';
import { UsersModel } from './user/user.model';

export class RolModel {
  constructor(
    public id?: any,
    public name?: string,
    public description?: string,
    public userDTO?: UsersModel,
    public serviceDTO?: ServiceModel[],
    public hospital?: HospitalModel[],
    public pathology?: Array<PathologyModel>
  ) {}
  public setValuesFromDinamicForm(form: any) {
    const service: ServiceModel = form.serviceDTO ? form.serviceDTO[0] : null;
    const hospital: HospitalModel = form.hospital ? form.hospital[0] : null;
    const pathologyId = form.pathology ? form.pathology[0] : null;
    /*const user: UsersModel = {
      id: form.userDTO ? form.userDTO.id : null,
      roles: [null],
      //hospitalId: hospital ? hospital.id : null,
    };*/

    this.pathology = pathologyId;
    this.name = form.name;
    this.serviceDTO = service as any;
    //this.userDTO = user;
  }

  public setValuesFromObject(object: UsersModel, hospitals: HospitalModel[]) {
    //  const user: UserModel = object;

    // const hospital: HospitalModel[] = this.setHospital(
    //   user.hospitalId,
    //   hospitals
    // );

    this.id = object.id;
    this.name = object.name;
    //   this.userDTO = user;
  }
  private setHospital(id: number, hospitals: HospitalModel[]): HospitalModel[] {
    return hospitals.filter((value: HospitalModel) => value.id === id);
  }
}
