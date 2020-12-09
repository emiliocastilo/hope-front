import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyChartModalComponent } from './many-chart-modal.component';

describe('ManyChartModalComponent', () => {
    let component: ManyChartModalComponent;
    let fixture: ComponentFixture<ManyChartModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManyChartModalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManyChartModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
