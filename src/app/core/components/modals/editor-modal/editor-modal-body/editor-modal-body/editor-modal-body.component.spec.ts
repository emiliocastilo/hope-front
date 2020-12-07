import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorModalBodyComponent } from './editor-modal-body.component';

describe('EditorModalBodyComponent', () => {
    let component: EditorModalBodyComponent;
    let fixture: ComponentFixture<EditorModalBodyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditorModalBodyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditorModalBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
