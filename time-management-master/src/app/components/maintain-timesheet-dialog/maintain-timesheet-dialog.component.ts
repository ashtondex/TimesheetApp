import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimesheetDetails } from '../../models/timesheet-details.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants, Roles } from '../../../utilities/Constants';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { ProjectSimple } from '../../models/project-simple.model';

@Component({
  selector: 'app-maintain-timesheet-dialog',
  templateUrl: './maintain-timesheet-dialog.component.html',
  styleUrls: ['./maintain-timesheet-dialog.component.css']
})
export class MaintainTimesheetDialogComponent {
  user: EmployeeSimple;
  editTsForm: FormGroup;
  maxCharacters = 2000;
  charactersLeft = 2000;
  timesList: any[];
  projects: ProjectSimple[];

  // tslint:disable-next-line:max-line-length
  constructor(
    private fb: FormBuilder,
    private service: GeneralService,
    private userService: UserService,
    public dialogRef: MatDialogRef<MaintainTimesheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!data.actionButtonColor) {
      data.actionButtonColor = 'submit';
    }
    if (!data.cancelAction) {
      data.cancelAction = 'Cancel';
    }
    if (data.timesheet) {
      // edit timesheet
      this.setForm(data.timesheet);
    } else {
      // create timesheet
      this.setForm(null);
    }
    this.timesList = Constants.HOURS;

    this.user = this.userService.getUser();
    this.service.getProjects(this.user.UserId).subscribe(projData => (this.projects = projData), error => console.log(error), () => {});
  }

  setForm(ts: any) {
    this.editTsForm = this.fb.group({
      TimesheetId: ts !== null ? ts.TimesheetId : null,
      DateFromHours: [ts !== null ? ts.DateFromHours : null, Validators.required],
      DateToHours: [ts !== null ? ts.DateToHours : null, Validators.required],
      ProjectId: [ts !== null ? ts.ProjectId : null, Validators.required],
      Description: [ts !== null ? ts.Description : null, Validators.required]
    });
    if (ts !== null) {
      this.charactersLeft = this.charactersLeft - ts.Description.length;
    }
  }

  descriptionOnKeyUp(event) {
    this.charactersLeft = this.maxCharacters - event.target.value.length;
  }

  closeDialog() {
    if (!this.editTsForm.valid) {
      return;
    }
    this.dialogRef.close(this.editTsForm.value);
  }
}
