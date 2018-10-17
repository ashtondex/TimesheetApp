import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainTimesheetDialogComponent } from './maintain-timesheet-dialog.component';

describe('MaintainTimesheetDialogComponent', () => {
  let component: MaintainTimesheetDialogComponent;
  let fixture: ComponentFixture<MaintainTimesheetDialogComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MaintainTimesheetDialogComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainTimesheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
