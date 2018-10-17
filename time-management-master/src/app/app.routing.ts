import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ActivateRouteGuard } from './guards/activate-route.guard';
import { LoginComponent } from './components/login/login.component';
import { MaintainTimesheetComponent } from './components/maintain-timesheet/maintain-timesheet.component';
import { ManageProjectComponent } from './components/manage-project/manage-project.component';
import { MaintainProjectComponent } from './components/maintain-project/maintain-project.component';
import { MaintainEmployeeComponent } from './components/maintain-employee/maintain-employee.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'timesheet',
    component: MaintainTimesheetComponent,
    canActivate: [ActivateRouteGuard]
  },
  {
    path: 'project/:projectId',
    component: ManageProjectComponent,
    canActivate: [ActivateRouteGuard]
  },
  {
    path: 'employee',
    component: MaintainEmployeeComponent,
    canActivate: [ActivateRouteGuard]
  },
  {
    path: 'project',
    component: MaintainProjectComponent,
    canActivate: [ActivateRouteGuard]
  },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, preloadingStrategy: PreloadAllModules } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
