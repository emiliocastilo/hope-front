import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideBarItemModel } from '../../models/side-bar/side-bar-item.model';
import { Router, NavigationEnd } from '@angular/router';
import { SideBarService } from '../../services/side-bar/side-bar.service';
import SectionActionBuilder from '../../utils/SectionActionsBuilder';
import { SectionsService } from 'src/app/modules/management/services/sections/sections.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
    private currentSectionSubscription: Subscription;
    public homeUrl = '/hopes';
    selectedSection: SideBarItemModel;
    crumbs: SideBarItemModel[];
    menu: Array<SideBarItemModel>;

    constructor(
        private _router: Router,
        private _sidebar: SideBarService,
        private _sectionsService: SectionsService
    ) { }

    ngOnInit () {
        this.menu = [JSON.parse(localStorage.getItem('completeMenu'))];

        this.currentSectionSubscription = this._sidebar
            .getCurrentSection().subscribe(
                (currentSection: SideBarItemModel) => {
                    this.selectedSection = currentSection;
                    this.crumbs = SectionActionBuilder.getCrumbs(currentSection);
                });

        // this.listenRouter();
        // if (this.menu[0] == null) {
        //     this._sectionsService.getSections().subscribe((res) => this.getSectionById(res.id));
        // } else {
        //     this.selectedSection = this.findSection(this.menu);
        //     if (this.selectedSection) {
        //         this.getSectionById(this.selectedSection.id);
        //     }
        // }
    }

    findSection (menu: any) {
        return SectionActionBuilder.findSection('url', menu, this._router.url);
    }

    //   listenRouter() {
    //     this._router.events.subscribe((events: any) => {
    //       if (events instanceof NavigationEnd) {
    //         if (this.selectedSection) {
    //           this.getSectionById(this.selectedSection.id);
    //         }
    //       }
    //     });
    //   }

    navigate (section: any) {
        event.preventDefault();
        const url =
            section.url === this.homeUrl
                ? this.homeUrl
                : section.url.split('hopes')[1];
        this._router.navigate([url]);
        this._sidebar.setCurrentSection(section);
    }

    //   private getSectionById(id: number): void {
    //     this._sectionsService.getSectionById(id).subscribe((response) => {
    //       localStorage.setItem('section', JSON.stringify(response));
    //       this._sidebar.event.next(response);
    //       this.crumbs = SectionActionBuilder.getCrumbs(response);
    //     });
    //   }

    ngOnDestroy () {
        this.currentSectionSubscription.unsubscribe();
    }
}
