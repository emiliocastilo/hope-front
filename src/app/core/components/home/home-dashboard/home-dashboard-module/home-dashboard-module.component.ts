import { Component, OnInit, Input } from '@angular/core';
import { HomeDashboardModule } from 'src/app/core/models/home-dashboard/home-dashboard-module.model';
import { Router } from '@angular/router';

@Component({
  selector: 'home-dashboard-module',
  templateUrl: './home-dashboard-module.component.html',
  styleUrls: ['./home-dashboard-module.component.scss'],
})
export class HomeDashboardModuleComponent implements OnInit {
  @Input() module: HomeDashboardModule;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  goToUrl(link: string) {
    event.preventDefault();
    const url = link.split('hopes')[1];
    this._router.navigate([url]);
  }
}
