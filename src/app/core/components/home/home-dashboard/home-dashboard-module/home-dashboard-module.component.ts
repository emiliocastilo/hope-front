import { Component, OnInit, Input } from '@angular/core';
import { HomeDashboardModule} from 'src/app/core/models/home-dashboard/home-dashboard-module.model';

@Component({
  selector: 'home-dashboard-module',
  templateUrl: './home-dashboard-module.component.html',
  styleUrls: ['./home-dashboard-module.component.sass']
})
export class HomeDashboardModuleComponent implements OnInit {
  @Input() module:HomeDashboardModule

  constructor() { }

  ngOnInit(): void {
  }

}
