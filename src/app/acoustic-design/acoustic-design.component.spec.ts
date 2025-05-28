import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcousticDesignComponent } from './acoustic-design.component';

describe('AcousticDesignComponent', () => {
  let component: AcousticDesignComponent;
  let fixture: ComponentFixture<AcousticDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcousticDesignComponent]
    });
    fixture = TestBed.createComponent(AcousticDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
