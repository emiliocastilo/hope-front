import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasiBsaPgaComponent } from './pasi-bsa-pga.component';

describe('PasiBsaPgaComponent', () => {
    let component: PasiBsaPgaComponent;
    let fixture: ComponentFixture<PasiBsaPgaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasiBsaPgaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasiBsaPgaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
