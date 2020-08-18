import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-outcomes',
  templateUrl: './health-outcomes.component.html',
  styleUrls: ['./health-outcomes.component.scss'],
})
export class HeatlhOutcomesComponent implements OnInit {
  options = [
    { name: 'PASI', url: 'dashboard/health-outcomes/patients-by-pasi' },
    { name: 'BSA', url: 'dashboard/health-outcomes/patients-by-bsa' },
    { name: 'PGA', url: 'dashboard/health-outcomes/patients-by-pga' },
    { name: 'DLQI', url: 'dashboard/health-outcomes/patients-by-dlqi' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleChange(event) {
    const url = event.target.value;
    this.router.navigate([url]);
  }
}
