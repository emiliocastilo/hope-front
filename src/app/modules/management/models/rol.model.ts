import { ServiceModel } from '../../../core/models/service/service.model';
import { HospitalModel } from '../../../core/models/hospital/hospital.model';
import { PathologyModel } from './patients/pathology.model';
import { UserModel } from './user/user.model';

export class RolModel {
    constructor(public id?: any, public name?: string, public description?: string, public service?: ServiceModel, public hospital?: HospitalModel, public pathology?: PathologyModel, public code?: string) {}
    public setValuesFromDinamicForm(form: any) {
        const service: ServiceModel = form.serviceDTO && form.serviceDTO.length > 0 ? form.serviceDTO[0] : form.serviceDTO ? form.serviceDTO : null;
        const hospital: HospitalModel = form.hospital && form.hospital.length > 0 ? form.hospital[0] : form.hospital ? form.hospital : null;
        const pathologyId = form.pathology && form.pathology.length > 0 ? form.pathology[0] : form.pathology ? form.pathology : null;

        this.pathology = pathologyId;
        this.name = form.name;
        this.service = service as any;
        this.hospital = hospital;
    }

    public setValuesFromObject(object: any) {
        const service: ServiceModel = object.service;
        const pathology: PathologyModel = object.pathology;
        const hospital: HospitalModel = object.hospital;

        this.id = object.id;
        this.name = object.name;
        this.description = object.description;
        this.code = object.code;
        this.hospital = hospital;
        this.pathology = pathology;
        this.service = service;
    }
}
