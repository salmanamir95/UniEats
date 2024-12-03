import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemOrderComponent } from './menu-item-order.component';

describe('MenuItemOrderComponent', () => {
  let component: MenuItemOrderComponent;
  let fixture: ComponentFixture<MenuItemOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
