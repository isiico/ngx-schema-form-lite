import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSchemaFormLiteComponent } from './ngx-schema-form-lite.component';

describe('NgxSchemaFormLiteComponent', () => {
  let component: NgxSchemaFormLiteComponent;
  let fixture: ComponentFixture<NgxSchemaFormLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSchemaFormLiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSchemaFormLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
