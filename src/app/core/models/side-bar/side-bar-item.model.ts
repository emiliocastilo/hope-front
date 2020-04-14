export class SideBarItemModel {
    constructor(
        public id: string,
        public order: string,
        public title: string,
        public icon: string,
        public url: string, 
        public children: Array<SideBarItemModel>
    ) { }
}