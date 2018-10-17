import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Constants, Roles } from '../../../utilities/Constants';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { EmployeeDetails } from '../../models/employee-details.model';
import { MaintainEmployeeDialogComponent } from '../maintain-employee-dialog/maintain-employee-dialog.component';


@Component({
  selector: 'app-maintain-employee',
  templateUrl: './maintain-employee.component.html',
  styleUrls: ['./maintain-employee.component.css']
})
export class MaintainEmployeeComponent implements OnInit {
  user: EmployeeSimple;
  //employees: EmployeeDetails[];
  employees: EmployeeSimple[];
  employee: EmployeeDetails;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: GeneralService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.setForm();
  }

  setForm() {
    // default employee date to today?
    //this.tsForm = this.fb.group({
    //  Date: [new Date(), Validators.required]
   // });
    this.service.getAllEmployees().subscribe(
      data => {
        this.employees = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  /*submitDate() {
    console.log('submitDate enterd');
    if (!this.tsForm.valid) {
      return;
    }
    console.log('submitDate hit');
    this.service.getEmployeeDetails(this.user.UserId).subscribe(
      data => {
        this.employee = data;
      },
      err => {
        console.log(err);
      }
    );
  }*/

  createEmployee() {
    const dialogRef = this.dialog.open(MaintainEmployeeDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { employee: null, action: 'Submit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ts = result as EmployeeDetails;
        ts.UserId = this.user.UserId;
        //ts.CreatedOn = this.tsForm.get('Date').value;
        this.service.createEmployee(ts).subscribe(
          success => {
            if (success === true) {
              this.service.getAllEmployees().subscribe(
                data => {
                  this.employees = data;
                },
                err => {
                  console.log(err);
                }
              );
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  editEmployee(ts: EmployeeDetails) {
    const dialogRef = this.dialog.open(MaintainEmployeeDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { employee: ts, action: 'Submit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateEmployee(result as EmployeeDetails).subscribe(
          success => {
            if (success === true) {
              this.service.getAllEmployees().subscribe(
                data => {
                  this.employees = data;
                },
                err => {
                  console.log(err);
                }
              );
            }
          },
          err => {
            console.log(err); 
          }
        );
      }
    });
  }

  deleteEmployee(ts: EmployeeDetails) {
    //this.service.deleteEmployee(ts.EmployeeId).subscribe(
    this.service.deleteEmployee(ts.UserId).subscribe(
    success => {
        if (success === true) {
          this.service.getAllEmployees().subscribe(
            data => {
              this.employees = data;
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
