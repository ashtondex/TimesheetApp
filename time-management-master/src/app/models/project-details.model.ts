import { EmployeeDetails } from './employee-details.model';

export class ProjectDetails {
  ProjectId: number;
  Title: string;
  Budget: number;
  Customer: string;
  SupervisorId: number; // employeeid
  SupervisorName: string;
  Employees: EmployeeDetails[];
  TotalHours: number; // calculated field
  CreatedOn: Date;
}
