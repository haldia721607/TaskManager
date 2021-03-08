import { NgModule } from '@angular/core';
import { DashboardComponent } from "../admin/components/dashboard/dashboard.component";
import { MyProfileComponent } from "../admin/components/my-profile/my-profile.component";
import { DashboardServiceService } from "../services/dashboardservice.service";
import { ProjectsComponent } from "../admin/components/projects/projects.component";
import { ProjectComponent } from '../admin/components/project/project.component';
import { CheckBoxPrinterComponent } from '../admin/components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from '../admin/components/project-details/project-details.component';
import { AdminRoutingModule } from '../admin/admin-routing/admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CountriesComponent } from '../admin/components/countries/countries.component';
import { ClientLocationsComponent } from '../admin/components/client-locations/client-locations.component';
import { TaskPrioritiesComponent } from '../admin/components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from '../admin/components/task-status/task-status.component';
import { MastersComponent } from '../admin/components/masters/masters.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
    ClientLocationsComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    MastersComponent,
  ],
  imports: [SharedModule,AdminRoutingModule],
  exports: [DashboardComponent, MyProfileComponent, ProjectsComponent, ProjectDetailsComponent],
  providers: [DashboardServiceService],
  entryComponents: [ CountriesComponent, ClientLocationsComponent, TaskPrioritiesComponent, TaskStatusComponent]
})
export class AdminModule {
}

