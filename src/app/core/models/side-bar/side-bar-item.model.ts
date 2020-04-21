export class SideBarItemModel {
    constructor(
        public id: number,
        public order: string,
        public title: string,
        public icon: string,
        public url: string, 
        public children: Array<SideBarItemModel>
    ) { }
}