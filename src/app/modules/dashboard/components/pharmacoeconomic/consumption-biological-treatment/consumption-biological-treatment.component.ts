import { Component } from '@angular/core';

@Component({
    selector: 'app-consumption-biological-treatment',
    templateUrl: './consumption-biological-treatment.component.html',
    styleUrls: ['./consumption-biological-treatment.component.scss'],
})
export class ConsumptionBiologicalTreatmentComponent {
    options = [
        {
            name: 'annual',
            url: 'dashboard/pharmacoeconomic/consumption-biological-treatment/monthly-consuption-euros',
        },
        {
            name: 'average',
            url: 'dashboard/pharmacoeconomic/consumption-biological-treatment/avg-mon-con-eu',
        },
    ];
    config = {
        showToggle: true,
    };

    constructor() {}
}
