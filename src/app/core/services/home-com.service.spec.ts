import { TestBed } from '@angular/core/testing';

import { HomeComService } from './home-com.service';

describe('HomeComService', () => {
  let service: HomeComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
