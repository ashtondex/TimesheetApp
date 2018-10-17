import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Constants, Roles} from '../../../utilities/Constants';
import {Observable} from 'rxjs/Observable';
import {GeneralService} from '../../services/general.service';
import {UserService} from '../../services/user.service';
import {EmployeeSimple} from '../../models/employee-simple.model';
import {ProjectDetails} from '../../models/project-details.model';
import {MaintainProjectDialogComponent} from '../maintain-project-dialog/maintain-project-dialog.component';
import {ProjectSimple} from '../../models/project-simple.model';

@Component({
  selector: 'app-maintain-project',
  templateUrl: './maintain-project.component.html',
  styleUrls: ['./maintain-project.component.css']
})
export class MaintainProjectComponent implements OnInit {
  user: EmployeeSimple;
  tsForm: FormGroup;
  projects: ProjectSimple[];
  project: ProjectDetails;

  constructor(
    private fb: FormBuilder,
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
    // default project date to today?
    this.tsForm = this.fb.group({
      Date: [new Date(), Validators.required]
    });
    // Get the URL:
    this.service.getProjects(this.user.UserId).subscribe(
      data => {
        // Store the data as projects:
        this.projects = data;
      },
      err => {
        // Print the error message to console if errors occur:
        console.log(err);
      }
    );
  }

  submitDate() {
    console.log('submitDate enterd');
    if (!this.tsForm.valid) {
      return;
    }
    console.log('submitDate hit');
    this.service.getProjects(this.user.UserId).subscribe(
      data => {
        this.projects = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  createProject() {
    const dialogRef = this.dialog.open(MaintainProjectDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {project: null, action: 'Submit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ts = result as ProjectDetails;
        //const ts = result as ProjectSimple;
        //ts.UserId = this.user.UserId;
        ts.SupervisorId = this.user.UserId;
        //ts.CreatedOn = this.tsForm.get('Date').value;
        ts.CreatedOn = this.tsForm.get('Date').value;
        this.service.createProject(ts).subscribe(
          success => {
            if (success === true) {
              this.service.getProjects(this.user.UserId).subscribe(
                data => {
                  this.projects = data;
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

  editProject(ts: ProjectDetails) {
    const dialogRef = this.dialog.open(MaintainProjectDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {project: ts, action: 'Submit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateProject(result as ProjectDetails).subscribe(
          success => {
            if (success === true) {
              this.service.getProjects(this.user.UserId).subscribe(
                data => {
                  this.projects = data;
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

  deleteProject(ts: ProjectDetails) {
    this.service.deleteProject(ts.ProjectId).subscribe(
      success => {
        if (success === true) {
          this.service.getProjects(this.user.UserId).subscribe(
            data => {
              this.projects = data;
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
