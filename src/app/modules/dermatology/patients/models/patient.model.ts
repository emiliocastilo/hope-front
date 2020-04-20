export class PatientModel {
    constructor(
        public id: string,
        public name: string,
        public firstName: string,
        public lastSurname: string,
        public nhc: string, 
        public healthCard: string,
        public dni:string,
        public address:string,
        public phone:string,
        public email:string,
        public birthDate:string,
        public hospital:string,
        public genderCore:string,
        public pathologies:string
    ) { }
}