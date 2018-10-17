import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { Roles } from '../../../utilities/Constants';
import { ProjectSimple } from '../../models/project-simple.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: EmployeeSimple;
  showTimesheetMenu: boolean;
  showManageProjectMenu: boolean;
  showMaintainEmployeeMenu: boolean;
  showMaintainProjectMenu: boolean;
  projects: ProjectSimple[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,private userService: UserService, private service: GeneralService) {}

  ngOnInit() {
    
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
      console.log('reload hit');
      this.loadPage();
      }
    });
  }
  loadPage() {
    this.user = this.userService.getUser();
    if (this.userService.inRole(Roles.User)) {
      this.showTimesheetMenu = true;
    }
    if (this.userService.inRole(Roles.Supervisor)) {
      this.showManageProjectMenu = true;
    }
    if (this.userService.inRole(Roles.Admin)) {
      this.showMaintainEmployeeMenu = true;
      this.showMaintainProjectMenu = true;
    }
  }
  loadProjects() {
    console.log(this.user.UserId);
    this.service.getProjects(this.user.UserId).subscribe(data => (this.projects = data), error => console.log(error), () => {});
  }
  logoutClick() {
     this.userService.logout();
     this.router.navigate(['/']);
  }
}
