import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants, Roles } from '../../utilities/Constants';
import { EmployeeSimple } from '../models/employee-simple.model';

@Injectable()
export class UserService {
  private user: EmployeeSimple = null;

  constructor(private http: Http) {}

  public getUser(): EmployeeSimple {
    return this.user;
  }

  public inRole(role: Roles): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.Roles.includes(role);
  }

  public inRoles(roles: Roles[]): boolean {
    if (!this.user) {
      return false;
    }
    let found = false;
    roles.forEach(role => {
      if (this.user.Roles.includes(role)) {
        found = true;
      }
    });
    return found;
  }

  login(username: string, pw: string) {
    //this.user = new EmployeeSimple();
    // this.user.Roles = [Roles.User, Roles.Supervisor, Roles.Admin];
    // this.user.FullName = 'Test User';
    // this.user.UserId = 1;

    return new Promise((resolve, reject) => {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers, withCredentials: true });
      this.http
        .post(Constants.SERVICE_URL + `api/Employee/Login`, { userName: username, password: pw }, options)
        .map(data => data.json())
        .subscribe(
          response => {
            this.user = response;
            resolve(true);
          },
          err => console.log(err)
        );

      // this.http
      //   .get(Constants.SERVICE_URL + 'api/SystemUser/getuser', { withCredentials: true })
      //   .map(res => res.json())
      //   .subscribe(
      //     response => {
      //       this.user = response;
      //       resolve(true);
      //     },
      //     err => console.log(err)
      //   );
    });

  }

  logout() {
    this.user = null;
  }
}
