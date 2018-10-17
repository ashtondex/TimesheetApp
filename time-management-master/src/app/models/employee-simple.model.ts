import { Roles } from '../../utilities/Constants';

export class EmployeeSimple {
  UserId: number;
  UserName: string; // login name
  Password: string;
  Roles: Roles[];

  FullName: string;
  Address: string;
  EmailAddress: string;
  JobTitle: string;
}
