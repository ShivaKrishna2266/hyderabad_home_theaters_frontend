import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBrandsComponent } from './view-brands.component';

describe('ViewBrandsComponent', () => {
  let component: ViewBrandsComponent;
  let fixture: ComponentFixture<ViewBrandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBrandsComponent]
    });
    fixture = TestBed.createComponent(ViewBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
