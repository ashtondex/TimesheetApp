// Third party modules.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatAccordion,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatOptionModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatButtonModule,
  MatChipsModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatStepperModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { UserService } from './services/user.service';
import { ActivateRouteGuard } from './guards/activate-route.guard';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MaintainTimesheetComponent } from './components/maintain-timesheet/maintain-timesheet.component';
import { MaintainProjectComponent } from './components/maintain-project/maintain-project.component';
import { MaintainEmployeeComponent } from './components/maintain-employee/maintain-employee.component';
import { ManageProjectComponent } from './components/manage-project/manage-project.component';
import { GeneralService } from './services/general.service';
import { MaintainTimesheetDialogComponent } from './components/maintain-timesheet-dialog/maintain-timesheet-dialog.component';
import { MaintainEmployeeDialogComponent } from './components/maintain-employee-dialog/maintain-employee-dialog.component';
import { CustomTimePipe } from './pipes/custom-time.pipe';
import { MaintainProjectDialogComponent } from './components/maintain-project-dialog/maintain-project-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    MaintainTimesheetComponent,
    MaintainProjectComponent,
    MaintainEmployeeComponent,
    ManageProjectComponent,
    MaintainTimesheetDialogComponent,
    MaintainEmployeeDialogComponent,
    MaintainProjectDialogComponent,
    CustomTimePipe
  ],
  imports: [
    // third -party modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatOptionModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [
    UserService,
    GeneralService,
    ActivateRouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [MaintainTimesheetDialogComponent, MaintainEmployeeDialogComponent, MaintainProjectDialogComponent]
})
export class AppModule {}
