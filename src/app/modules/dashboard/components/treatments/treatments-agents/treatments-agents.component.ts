import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatments-agents',
  templateUrl: './treatments-agents.component.html',
  styleUrls: ['./treatments-agents.component.scss'],
})
export class TreatmentsAgentsComponent implements OnInit {
  options = [
    {
      name: 'Quimico',
      url: 'dashboard/treatments/treatments-agents/chemical-agents',
    },
    {
      name: 'Biologico',
      url: 'dashboard/treatments/treatments-agents/biological-agents',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleChange(event) {
    const url = event.target.value;
    this.router.navigate([url]);
  }
}
