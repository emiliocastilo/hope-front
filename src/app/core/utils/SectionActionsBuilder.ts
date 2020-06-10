import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { SectionsService } from 'src/app/modules/management/services/sections/sections.service';

export default class SectionActionBuilder {
  constructor(private sectionsService?: SectionsService) {
    this.sectionsService = sectionsService;
  }

  public findSection(type: string, array: Array<any>, key: any) {
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

  // private selected: SideBarItemModel;

  // public getSelectedByUrl(url: string): SideBarItemModel {
  //   this.selectedByUrl(url, this.menu);

  //   return this.selected;
  // }

  // private selectedByUrl(
  //   url: string,
  //   menu: SideBarItemModel[]
  // ): SideBarItemModel {
  //   let selectedArray = menu.filter((item: SideBarItemModel) =>
  //     item.url.includes(url)
  //   );

  //   selectedArray = selectedArray.length
  //     ? selectedArray
  //     : menu.map((item: SideBarItemModel) =>
  //         this.selectedByUrl(url, item.children)
  //       );

  //   this.selected = url === '/' ? null : selectedArray[0];
  //   return this.selected;
  // }

  public getCrumbs(section: SideBarItemModel): SideBarItemModel[] {
    return this.pushCrumbs(section, []).reverse();
  }

  private pushCrumbs(
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
