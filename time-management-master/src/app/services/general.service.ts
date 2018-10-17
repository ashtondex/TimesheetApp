import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Constants, Roles } from '../../utilities/Constants';
import { ProjectSimple } from '../models/project-simple.model';
import { ProjectDetails } from '../models/project-details.model';
import { EmployeeSimple } from '../models/employee-simple.model';
import { TimesheetDetails } from '../models/timesheet-details.model';
import { EmployeeDetails } from '../models/employee-details.model';

@Injectable()
export class GeneralService {
  constructor(private http: Http) {}

  getProjects(userId: number) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Project/LoadByUser/' + userId;
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as ProjectSimple[]);
  }

  getProjectDetails(projectId: number, dateFrom: Date, dateTo: Date) {
    // tslint:disable-next-line:max-line-length
    const restUrl: string = Constants.SERVICE_URL + 'api/Project/LoadDetails/' + projectId + '/' + dateFrom.toDateString() + '/' + dateTo.toDateString();
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as ProjectDetails);
  }

  createProject(project: any) {
    const bodyString = JSON.stringify(project);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(Constants.SERVICE_URL + `api/Project/Create`, bodyString, options).map(data => data.json() as boolean);
  }

  updateProject(project: any) {
    const bodyString = JSON.stringify(project);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(Constants.SERVICE_URL + `api/Project/Update`, bodyString, options).map(data => data.json() as boolean);
  }

  deleteProject(ProjectId: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(Constants.SERVICE_URL + 'api/Project/Delete/' + ProjectId, options).map(data => data.json() as boolean);
  }

  getEmployeesAssignedToProject(projectId: number) { 
    const restUrl: string = Constants.SERVICE_URL + 'api/Employee/LoadByProject/' + projectId;
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as EmployeeSimple[]);
  }

  getEmployeesNotAssignedToProject(projectId: number) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Employee/LoadNotByProject/' + projectId;
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as EmployeeSimple[]);
  }

  getEmployees() {
    const restUrl: string = Constants.SERVICE_URL + 'api/Employee/LoadSimple/';
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as EmployeeSimple[]);
  }
  
  getAllEmployees() {
    // tslint:disable-next-line:max-line-length
    const restUrl: string = Constants.SERVICE_URL + 'api/Employee/LoadSimple';
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as EmployeeSimple[]);
  }
  createEmployee(employee: any) {
    const bodyString = JSON.stringify(employee);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(Constants.SERVICE_URL + `api/Employee/Create`, bodyString, options).map(data => data.json() as boolean);
  }

  updateEmployee(employee: any) {
    const bodyString = JSON.stringify(employee);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(Constants.SERVICE_URL + `api/Employee/Update`, bodyString, options).map(data => data.json() as boolean);
  }

  deleteEmployee(employee: any) {
    const bodyString = JSON.stringify(employee);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(Constants.SERVICE_URL + `api/Employee/Delete`, bodyString, options).map(data => data.json() as boolean);
  }

  getTimesheetDetails(userId: number, date: Date) {
    const restUrl: string = Constants.SERVICE_URL + 'api/Timesheet/LoadDetails/' + userId + '/' + date.toDateString();
    return this.http.get(restUrl, { withCredentials: true }).map((res: Response) => res.json() as TimesheetDetails[]);
  }

  createTimesheet(timesheet: any) {
    const bodyString = JSON.stringify(timesheet);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(Constants.SERVICE_URL + `api/Timesheet/Create`, bodyString, options).map(data => data.json() as boolean);
  }

  updateTimesheet(timesheet: any) {
    const bodyString = JSON.stringify(timesheet);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(Constants.SERVICE_URL + `api/Timesheet/Update`, bodyString, options).map(data => data.json() as boolean);
  }

  deleteTimesheet(timesheetId: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(Constants.SERVICE_URL + 'api/Timesheet/Delete/' + timesheetId, options).map(data => data.json() as boolean);
  }

  assignEmployeeToProject(userId: number, projectId: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .post(Constants.SERVICE_URL + `api/Project/AssignEmployeeToProject/` + userId + '/' + projectId, null, options)
      .map(data => data.json() as boolean);
  }

  removeEmployeeFromProject(userId: number, projectId: number) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http
      .delete(Constants.SERVICE_URL + 'api/Project/RemoveEmployeeFromProject/' + userId + '/' + projectId, options)
      .map(data => data.json() as boolean);
  }

  checkCred(username : string, password : string) {
    /*const bodyString = JSON.stringify(use);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });*/
    return this.http.post(Constants.SERVICE_URL + `api/Employee/Login`, username, password).map(data => data.json() as boolean);
  }
}
