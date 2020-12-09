import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-diagnosis-reasons',
    templateUrl: './diagnosis-reasons.component.html',
    styleUrls: ['./diagnosis-reasons.component.scss'],
})
export class DiagnosisReasonsComponent implements OnInit {
    entries = [
        {
            name: 'change',
            url: 'dashboard/diagnosis/reasons/reason-last-change-biological-treatment',
        },
        {
            name: 'suspension',
            url: 'dashboard/diagnosis/reasons/reason-stop-bioligical-treatment',
        },
    ];
    config = { showYears: true };

    constructor() {}

    ngOnInit(): void {}
}
