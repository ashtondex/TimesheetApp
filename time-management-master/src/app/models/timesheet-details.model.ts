export class TimesheetDetails {
  TimesheetId: number;
  ProjectId: number;
  ProjectName: string;
  UserId: any;

  CreatedOn: Date;
  DateFromHours: number;
  DateToHours: number;

  TotalHours: number; // calculated field
  Description: string;
}
