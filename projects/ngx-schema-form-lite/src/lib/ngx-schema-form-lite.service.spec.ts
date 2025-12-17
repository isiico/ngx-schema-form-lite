import { TestBed } from '@angular/core/testing';

import { NgxSchemaFormLiteService } from './ngx-schema-form-lite.service';

describe('NgxSchemaFormLiteService', () => {
  let service: NgxSchemaFormLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSchemaFormLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
