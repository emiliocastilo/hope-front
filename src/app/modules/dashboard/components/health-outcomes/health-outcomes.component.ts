import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-health-outcomes',
    templateUrl: './health-outcomes.component.html',
    styleUrls: ['./health-outcomes.component.scss'],
})
export class HeatlhOutcomesComponent implements OnInit {
    entries = [
        { name: 'PASI', url: 'dashboard/health-outcomes/patients-by-pasi' },
        { name: 'BSA', url: 'dashboard/health-outcomes/patients-by-bsa' },
        { name: 'PGA', url: 'dashboard/health-outcomes/patients-by-pga' },
        { name: 'DLQI', url: 'dashboard/health-outcomes/patients-by-dlqi' },
    ];
    config = { defaultConfig: true };

    constructor() {}

    ngOnInit(): void {}
}
