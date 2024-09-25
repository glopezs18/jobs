import { TestBed } from '@angular/core/testing';

import { RestWorkerService } from './rest.worker.service';

describe('RestWorkerService', () => {
  let service: RestWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
