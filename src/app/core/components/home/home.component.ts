import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeDashboardModule } from '../../models/home-dashboard/home-dashboard-module.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  modules: Array<HomeDashboardModule>;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(
      response => {
        this.modules = response.homeDashboard;
      }
    );
  }

}
