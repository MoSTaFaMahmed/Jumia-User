import { TestBed } from '@angular/core/testing';

import { LangDirService } from './lang-dir.service';

describe('LangDirService', () => {
  let service: LangDirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangDirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
