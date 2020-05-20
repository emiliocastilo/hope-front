import { Component, OnInit } from '@angular/core';
import { SideBarItemModel } from 'src/app/core/models/side-bar/side-bar-item.model';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cie9',
  templateUrl: './cie9.component.html',
  styleUrls: ['./cie9.component.scss'],
})
export class Cie9Component implements OnInit {
  public menu: SideBarItemModel[] = [];
  public menuSelected: SideBarItemModel;
  public showingDetail: boolean = false;
  public data = [
    { name: 'PARAPSORIASIS', value: 2 },
    { name: 'CARCINOMA IN SITU DE LARINGE', value: 6 },
    { name: 'PSORIASIS Y ALTERACIONES SIMILARES', value: 3 },
  ];
  public columHeaders = ['cie9Diagnostic', 'patients'];
  public listHeaders = ['name', 'surname'];
  public listData = [
    { name: 'Pacient', surname: 'testing' },
    { name: 'pacient', surname: 'one' },
  ];
  public array = [
    { cie9Diagnostic: 'PARAPSORIASIS', patients: 2 },
    { cie9Diagnostic: 'CARCINOMA IN SITU DE LARINGE', patients: 6 },
    { cie9Diagnostic: 'PSORIASIS Y ALTERACIONES SIMILARES', patients: 3 },
  ];

  constructor(
    private _translate: TranslateService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.menu = JSON.parse(localStorage.getItem('menu')).filter((item) =>
      item.url.endsWith('/dashboard')
    );
    this.menuSelected = this.menu[0].children.find((item) =>
      item.url.endsWith('/dashboard/diagnostic')
    );
  }

  onIconButtonClick(event: any) {
    if (event && event.type === 'detail') {
      this.showingDetail = !this.showingDetail;
    }
  }
}
