import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSystemLogsComponent } from './view-system-logs.component';

describe('ViewSystemLogsComponent', () => {
  let component: ViewSystemLogsComponent;
  let fixture: ComponentFixture<ViewSystemLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSystemLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSystemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
