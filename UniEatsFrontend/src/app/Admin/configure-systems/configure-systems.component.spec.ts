import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSystemsComponent } from './configure-systems.component';

describe('ConfigureSystemsComponent', () => {
  let component: ConfigureSystemsComponent;
  let fixture: ComponentFixture<ConfigureSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureSystemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
