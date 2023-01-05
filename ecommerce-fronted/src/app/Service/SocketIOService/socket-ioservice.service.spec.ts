import { TestBed } from '@angular/core/testing';

import { SocketIOServiceService } from './socket-ioservice.service';

describe('SocketIOServiceService', () => {
  let service: SocketIOServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketIOServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
