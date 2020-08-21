import { Component, OnInit } from '@angular/core';
import { HomeDashboardModule } from '../../models/home-dashboard/home-dashboard-module.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modules: Array<HomeDashboardModule>;

  constructor() {}

  ngOnInit(): void {
    this.modules = JSON.parse(localStorage.getItem('menu'));
  }
}
