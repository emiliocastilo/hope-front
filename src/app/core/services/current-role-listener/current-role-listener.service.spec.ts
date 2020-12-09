import { TestBed } from '@angular/core/testing';

import { CurrentRoleListenerService } from './current-role-listener.service';

describe('CurrentRoleListenerService', () => {
    let service: CurrentRoleListenerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CurrentRoleListenerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
