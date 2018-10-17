import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeDetails } from '../../models/employee-details.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants, Roles } from '../../../utilities/Constants';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { ProjectSimple } from '../../models/project-simple.model';

@Component({
  selector: 'app-maintain-employee-dialog',
  templateUrl: './maintain-employee-dialog.component.html',
  styleUrls: ['./maintain-employee-dialog.component.css']
})
export class MaintainEmployeeDialogComponent {
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
    public dialogRef: MatDialogRef<MaintainEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!data.actionButtonColor) {
      data.actionButtonColor = 'submit';
    }
    if (!data.cancelAction) {
      data.cancelAction = 'Cancel';
    }
    if (data.employee) {
      // edit employee
      this.setForm(data.employee);
    } else {
      // create employee
      this.setForm(null);
    }
    this.timesList = Constants.HOURS;

    this.user = this.userService.getUser();
    this.service.getProjects(this.user.UserId).subscribe(projData => (this.projects = projData), error => console.log(error), () => {});
  }

  setForm(ts: any) {
    this.editTsForm = this.fb.group({
      UserId: ts !== null ? ts.UserId : null,
      UserName: ts !== null ? ts.UserName : null,
      Password: [ts !== null ? ts.Password : null, Validators.required],
      FullName: [ts !== null ? ts.FullName : null, Validators.required],
      Address: [ts !== null ? ts.Address : null, Validators.required],
      EmailAddress: [ts !== null ? ts.EmailAddress : null, Validators.required],
      JobTitle: [ts !== null ? ts.JobTitle : null, Validators.required],
      Salary: [ts !== null ? ts.Salary : null, Validators.required]
      
    });

    // formfieldnames in html need to match names above // check now ? 


  }

  // descriptionOnKeyUp(event) {
  //   this.charactersLeft = this.maxCharacters - event.target.value.length;
  // }

  closeDialog() {
    if (!this.editTsForm.valid) {
      return;
    }
    this.dialogRef.close(this.editTsForm.value);
  }
}
