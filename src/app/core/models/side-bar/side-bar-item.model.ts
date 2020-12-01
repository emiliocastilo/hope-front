export class SideBarItemModel {
    constructor(
        public id: number,
        public title: string,
        public url: string,
        public description?: string,
        public icon?: string,
        public active?: boolean,
        public principal?: boolean,
        public order?: number,
        public children?: Array<SideBarItemModel>,
        public collapsed?: boolean,
        public fatherSection?: SideBarItemModel,
        public visible?: boolean,
        public path?: string

    ) { }
}
