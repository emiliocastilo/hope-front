import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-treatments-agents',
    templateUrl: './treatments-agents.component.html',
    styleUrls: ['./treatments-agents.component.scss'],
})
export class TreatmentsAgentsComponent implements OnInit {
    entries = [
        {
            name: 'biological',
            url: 'dashboard/treatments/treatments-agents/biological-agents',
        },
        {
            name: 'chemical',
            url: 'dashboard/treatments/treatments-agents/chemical-agents',
        },
    ];
    config = {
        defaultConfig: true,
    };

    constructor() {}

    ngOnInit(): void {}
}
