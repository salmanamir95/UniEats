import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutWithCashComponent } from './checkout-with-cash.component';

describe('CheckoutWithCashComponent', () => {
  let component: CheckoutWithCashComponent;
  let fixture: ComponentFixture<CheckoutWithCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutWithCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutWithCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
