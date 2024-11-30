import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutWithCardComponent } from './checkout-with-card.component';

describe('CheckoutWithCardComponent', () => {
  let component: CheckoutWithCardComponent;
  let fixture: ComponentFixture<CheckoutWithCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutWithCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutWithCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
