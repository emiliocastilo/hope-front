import { Component } from '@angular/core';

@Component({
    selector: 'app-total-expenses-biological-treatment',
    templateUrl: './total-expenses-biological-treatment.component.html',
    styleUrls: ['./total-expenses-biological-treatment.component.scss'],
})
export class TotalExpensesBiologicalTreatmentComponent {
    options = [
        {
            name: 'total',
            url: 'dashboard/pharmacoeconomic/total-expenses-biological-treatment/total-expenses',
        },
        {
            name: 'average',
            url: 'dashboard/pharmacoeconomic/total-expenses-biological-treatment/avg-expenses',
        },
    ];
    config = {
        showToggleExpenses: true,
    };

    constructor() {}
}
