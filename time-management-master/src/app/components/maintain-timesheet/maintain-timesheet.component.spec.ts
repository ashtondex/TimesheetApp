import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainTimesheetComponent } from './maintain-timesheet.component';

describe('MaintainTimesheetComponent', () => {
  let component: MaintainTimesheetComponent;
  let fixture: ComponentFixture<MaintainTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
