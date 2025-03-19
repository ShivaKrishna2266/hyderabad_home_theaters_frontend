import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappWidgetComponent } from './whatsapp-widget.component';

describe('WhatsappWidgetComponent', () => {
  let component: WhatsappWidgetComponent;
  let fixture: ComponentFixture<WhatsappWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatsappWidgetComponent]
    });
    fixture = TestBed.createComponent(WhatsappWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
