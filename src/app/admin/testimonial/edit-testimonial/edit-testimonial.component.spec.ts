import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestimonialComponent } from './edit-testimonial.component';

describe('EditTestimonialComponent', () => {
  let component: EditTestimonialComponent;
  let fixture: ComponentFixture<EditTestimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTestimonialComponent]
    });
    fixture = TestBed.createComponent(EditTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
