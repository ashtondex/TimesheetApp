import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { EmployeeSimple } from '../models/employee-simple.model';
import { Constants, Roles } from '../../utilities/Constants';

@Injectable()
export class ActivateRouteGuard implements CanActivate, CanActivateChild {
  user: EmployeeSimple;
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let activate = false;
    this.user = this.userService.getUser();
    if (this.user && this.user.UserId > 0) {
      if (route.url[0]) {
        activate = this.permissionRoleCheck(route.url[0].path);
      }
      if (route.url[0] && route.url[1]) {
        activate = this.permissionRoleCheck(route.url[0].path + '/' + route.url[1].path);
      }
    } else {
      // user is not logged in so bring to login page
      this.router.navigate(['login']);
    }
    return activate;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.user = this.userService.getUser();
    if (this.user && this.user.UserId > 0) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  private permissionRoleCheck(path: string): boolean {
    if (path === 'timesheet' && this.userService.inRole(Roles.User)) {
      return true;
    }
    if (path === 'employee' && this.userService.inRole(Roles.Admin)) {
      return true;
    }
    if (path === 'project' && this.userService.inRole(Roles.Admin)) {
      return true;
    }
    if (path.startsWith('project/') && this.userService.inRole(Roles.Supervisor)) {
      return true;
    }
    return false;
  }
}
