import { MedicineModel } from 'src/app/modules/management/models/medicines/medicines.model';
import { PatientDiagnoseModel } from '../../../models/patient-diagnose.model';

export class DermaTreatmentModel {
    id?: number;
    patientDiagnose?: PatientDiagnoseModel;
    active?: boolean = true;
    type?: string;
    medicine?: MedicineModel;
    dose?: string; // ! Debería ser DoseModel
    masterFormula?: string;
    masterFormulaDose?: string;
    regimen?: string;
    initDate?: Date;
    finalDate?: Date;
    endCause?: string;
    reason?: string;
    lines?: any[];

    // ? Los que faltan
    psychologicalImpact: boolean = false;
    datePrescription: Date;
    expectedEndDate: Date;
    observations: string;
    otherDose: string;
    treatmentContinue: boolean = false;
    visibleInjury: boolean = false;
    pulsatileTreatment: boolean = false;
    other: string;
    suspensionDate: Date;

    constructor(obj?: Partial<DermaTreatmentModel>) {
        this.setValuesFromObject(obj);
    }

    public setValuesFromObject (obj?: Partial<DermaTreatmentModel>) {
        this.id = obj && obj.id ? obj.id : undefined;
        this.patientDiagnose = obj && obj.patientDiagnose ? obj.patientDiagnose : undefined;
        this.active = obj && obj.active ? obj.active : undefined;
        this.type = obj && obj.type ? obj.type : undefined;
        this.medicine = obj && obj.medicine ? obj.medicine : undefined;
        this.dose = obj && obj.dose ? obj.dose : undefined;
        this.masterFormula = obj && obj.masterFormula ? obj.masterFormula : undefined;
        this.regimen = obj && obj.regimen ? obj.regimen : undefined;
        this.initDate = obj && obj.initDate ? obj.initDate : undefined;
        this.finalDate = obj && obj.finalDate ? obj.finalDate : undefined;
        this.endCause = obj && obj.endCause ? obj.endCause : undefined;
        this.reason = obj && obj.reason ? obj.reason : undefined;
        this.lines = obj && obj.lines ? obj.lines : undefined;

        // ? Los que faltan
        this.psychologicalImpact = obj && obj.psychologicalImpact ? obj.psychologicalImpact : undefined;
        this.datePrescription = obj && obj.datePrescription ? obj.datePrescription : undefined;
        this.expectedEndDate = obj && obj.expectedEndDate ? obj.expectedEndDate : undefined;
        this.observations = obj && obj.observations ? obj.observations : undefined;
        this.otherDose = obj && obj.otherDose ? obj.otherDose : undefined;
        this.treatmentContinue = obj && obj.treatmentContinue ? obj.treatmentContinue : undefined;
        this.visibleInjury = obj && obj.visibleInjury ? obj.visibleInjury : undefined;
        this.suspensionDate = obj && obj.suspensionDate ? obj.suspensionDate : undefined;
    }
}
