import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DlqiComponent } from './dlqi.component';

describe('DashboardPatientsComponent', () => {
    let component: DlqiComponent;
    let fixture: ComponentFixture<DlqiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DlqiComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DlqiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
