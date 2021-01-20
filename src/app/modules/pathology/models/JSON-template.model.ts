export class TemplateElement {
    name: string;
    type: string;
    value: Array<any>;
}

export class JSONTemplateModel {
    data: Array<TemplateElement>;
    dateTime: Date;
    job: boolean;
    patientId: number;
    template: string;
}
