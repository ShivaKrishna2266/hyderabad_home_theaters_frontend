import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitOurWarehouseComponent } from './visit-our-warehouse.component';

describe('VisitOurWarehouseComponent', () => {
  let component: VisitOurWarehouseComponent;
  let fixture: ComponentFixture<VisitOurWarehouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitOurWarehouseComponent]
    });
    fixture = TestBed.createComponent(VisitOurWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
