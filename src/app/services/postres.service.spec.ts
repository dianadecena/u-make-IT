import { TestBed } from '@angular/core/testing';

import { PostresService } from './postres.service';

describe('PostresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostresService = TestBed.get(PostresService);
    expect(service).toBeTruthy();
  });
});
