import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';

export default class SectionActionBuilder {
  constructor() {}

  static findSection(type: string, array: Array<any>, key: any) {
    let result: any;
    switch (type) {
      case 'id':
        array.some(
          (o) =>
            (result =
              o.id === key ? o : this.findSection('id', o.children || [], key))
        );
        return result;
      case 'url':
        array.some(
          (o) =>
            (result = o.url.includes(key)
              ? o
              : this.findSection('url', o.children || [], key))
        );
        return result;
      default:
        break;
    }
  }

  static getCrumbs(section: SideBarItemModel): SideBarItemModel[] {
    return this.pushCrumbs(section, []).reverse();
  }

  static pushCrumbs(
    section: SideBarItemModel,
    arraySections: SideBarItemModel[]
  ): SideBarItemModel[] {
    arraySections.push(section);

    if (section.fatherSection) {
      this.pushCrumbs(section.fatherSection, arraySections);
    }
    return arraySections;
  }
}
