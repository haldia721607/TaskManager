import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskStatus } from 'src/app/models/task-status';
import { TaskStatusDetail } from 'src/app/models/task-status-detail';
import { TaskStatusesService } from 'src/app/services/task-statuses.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  //Properties to represent taskstatusdetails
  taskID: number;
  currentTask: Task = new Task();
  currentTaskStatusDetail: TaskStatusDetail = new TaskStatusDetail();
  editTaskStatusForm: FormGroup;
  taskStatuses: Observable<TaskStatus[]>;

  constructor(private tasksService: TasksService, private router: Router, private taskStatuesService: TaskStatusesService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    //Receive taskid parameter
    this.activatedRoute.params.subscribe((params) => {
      this.taskID = params["taskid"];
    });

    //Create reactive form
    this.editTaskStatusForm = new FormGroup({
      thisStatusDetailID: new FormControl(0),
      taskID: new FormControl(null),
      taskStatusID: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    });

    //get taskstatuses from db for dropdownlist
    this.taskStatuses = this.taskStatuesService.getTaskStatus();
    //get task by taskid
    this.tasksService.getTaskByTaskID(this.taskID).subscribe((task: Task) => {
      this.currentTask = task;

      //Load task details into Reactive form
      this.currentTaskStatusDetail.TaskID = this.taskID;
      this.currentTaskStatusDetail.Description = null;
      this.currentTaskStatusDetail.TaskStatusID = task.CurrentTaskStatusID;
      this.currentTaskStatusDetail.TaskStatusDetailID = 0;
      this.editTaskStatusForm.patchValue(this.currentTaskStatusDetail);
    });
  }

  onUpdateTaskStatusClick(event) {
    this.editTaskStatusForm["submitted"] = true;

    if (this.editTaskStatusForm.valid) {
      //send REST-API call to server
      this.tasksService.updateTaskStatus(this.editTaskStatusForm.value).subscribe((response) => {
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
