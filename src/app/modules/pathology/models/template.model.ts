import { JSONTemplateModel } from './JSON-template.model';

export class TemplateModel {
    dateTime: Date;
    job: boolean;
    tempate: string;
    data: Array<JSONTemplateModel>;
    patientId?: number;
}
