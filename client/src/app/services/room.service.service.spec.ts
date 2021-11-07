import { TestBed } from '@angular/core/testing';

import { Room.ServiceService } from './room.service.service';

describe('Room.ServiceService', () => {
  let service: Room.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Room.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
