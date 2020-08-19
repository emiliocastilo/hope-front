import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treatments-agents',
  templateUrl: './treatments-agents.component.html',
  styleUrls: ['./treatments-agents.component.scss'],
})
export class TreatmentsAgentsComponent implements OnInit {
  entries = [
    {
      name: 'chemical',
      url: 'dashboard/treatments/treatments-agents/chemical-agents',
    },
    {
      name: 'biological',
      url: 'dashboard/treatments/treatments-agents/biological-agents',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
