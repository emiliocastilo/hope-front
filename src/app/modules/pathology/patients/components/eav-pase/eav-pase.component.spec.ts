import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EavPaseComponent } from './eav-pase.component';

describe('EavPaseComponent', () => {
    let component: EavPaseComponent;
    let fixture: ComponentFixture<EavPaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EavPaseComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EavPaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
