export class HomeDashboardModule {
    constructor(
        public id: string,
        public order: string,
        public title: string,
        public image: string,
        public alternativeText: string, 
        public link: string
    ) { }
}