import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBannersComponent } from './view-banners.component';

describe('ViewBannersComponent', () => {
  let component: ViewBannersComponent;
  let fixture: ComponentFixture<ViewBannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBannersComponent]
    });
    fixture = TestBed.createComponent(ViewBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
