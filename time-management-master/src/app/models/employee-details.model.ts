import { Roles } from '../../utilities/Constants';
import { TimesheetDetails } from './timesheet-details.model';

export class EmployeeDetails {
  UserId: number;

  // only show load username, password, and roles if admin?
  UserName: string; // login name
  Password: string;
  Roles: Roles[];

  FullName: string;
  Address: string;
  EmailAddress: string;
  JobTitle: string;
  Salary: number;

  Timesheets: TimesheetDetails[]; // null unless used in ProjectDetails
  TimesheetTotalHours: number; // null unless used in ProjectDetails, calculated field

  Expanded: boolean; // ignore, internal use
}
