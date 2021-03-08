import { NgModule } from '@angular/core';
import { TasksComponent } from '../employee/components/tasks/tasks.component';
import { EmployeeRoutingModule } from '../employee/employee-routing/employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
  ],
  exports:[
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskComponent
  ]
})
export class EmployeeModule { }
