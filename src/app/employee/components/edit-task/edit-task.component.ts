import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EditTask } from 'src/app/models/edit-task';
import { Project } from 'src/app/models/project';
import { TaskPriority } from 'src/app/models/task-priorities';
import { LoginService } from 'src/app/services/login.service';
import { ProjectsService } from 'src/app/services/projectservice.service';
import { TaskPrioritiesService } from 'src/app/services/task-priorities.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  //Properties to represent taskstatusdetails
  taskID: number;
  currentTask: EditTask = new EditTask();
  editTaskStatusForm: FormGroup;

  projects: Observable<Project[]>;
  employees: Observable<any>;
  taskPriorities: Observable<TaskPriority[]>;

  constructor(private tasksService: TasksService, private router: Router, private activatedRoute: ActivatedRoute, private projectsService: ProjectsService, private taskPrioritiesService: TaskPrioritiesService, private loginService: LoginService) {
  }

  ngOnInit() {
    //Receive taskid parameter
    this.activatedRoute.params.subscribe((params) => {
      this.taskID = params["taskid"];
      console.log("QueruStringTaskId = " + this.taskID);
    });
    this.projects = this.projectsService.getAllProjects();
    this.employees = this.loginService.getAllEmployes();
    this.taskPriorities = this.taskPrioritiesService.getTaskPriorities();
    //Create reactive form
    this.editTaskStatusForm = new FormGroup({
      TaskID: new FormControl(null),
      TaskName: new FormControl(null, [Validators.required]),
      Description: new FormControl(null),
      ProjectID: new FormControl(null, [Validators.required]),
      AssignedTo: new FormControl(null, [Validators.required]),
      TaskPriorityID: new FormControl(null, [Validators.required]),
      CurrentStatus: new FormControl(null),
    });

    //get task by taskid
    this.tasksService.editTaskByTaskID(this.taskID).subscribe((task: EditTask) => {
      console.log("editTaskByTaskID Ts page on load  = " + task);

      //Load task details into Reactive form
      this.currentTask.TaskID = this.taskID;
      this.currentTask.TaskName = task.TaskName;
      this.currentTask.Description = task.Description;
      this.currentTask.ProjectID = task.ProjectID;
      this.currentTask.AssignedTo = task.AssignedTo;
      this.currentTask.TaskPriorityID=task.TaskPriorityID;
      this.currentTask.CurrentStatus = task.CurrentStatus;
      this.editTaskStatusForm.patchValue(this.currentTask);
    });
  }

  onUpdateTaskStatusClick(event) {
    this.editTaskStatusForm["submitted"] = true;
    if (this.editTaskStatusForm.valid) {
      //send REST-API call to server
      this.tasksService.updateTaskById(this.editTaskStatusForm.value).subscribe((response) => {
        this.router.navigate(["/employee", "tasks"]);
      }, (error) => {
        console.log(error);
      });
    }
    else {
      console.log(this.editTaskStatusForm.errors);
    }
  }
}
