import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTheatreComponent } from './home-theatre.component';

describe('HomeTheatreComponent', () => {
  let component: HomeTheatreComponent;
  let fixture: ComponentFixture<HomeTheatreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTheatreComponent]
    });
    fixture = TestBed.createComponent(HomeTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
