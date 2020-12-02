export class MenuItemModel {
    constructor(
        public id: number,
        public title: string,
        public url: string,
        public description?: string,
        public icon?: string,
        public active?: boolean,
        public principal?: boolean,
        public order?: number,
        public children?: Array<MenuItemModel>,
        public collapsed?: boolean,
        public parent?: MenuItemModel,
        public visible?: boolean,
        public path?: string
    ) { }
}
