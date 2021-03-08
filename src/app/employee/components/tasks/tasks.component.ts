import { Component, OnInit } from '@angular/core';
import { GroupedTask } from 'src/app/models/grouped-task';
import { LoginService } from 'src/app/services/login.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskGroups: GroupedTask[];
  constructor(private tasksService: TasksService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((response) => {
      this.taskGroups = response;
    });
  }
  /* Get background color based on task status */
  getTaskGroupBgCssClass(taskStatusName) : string
  {
    var className;
    switch (taskStatusName)
    {
      case "Holding": className = "bg-secondary text-white"; break;
      case "Prioritized": className = "bg-primary text-white"; break;
      case "Started": className = "bg-info text-white"; break;
      case "Finished": className = "bg-success text-white"; break;
      case "Reverted": className = "bg-danger text-white"; break;
    }
    return className;
  }

  /* Get background color based on task priority */
  getTaskPriorityBadgeCssClass(taskPriorityName) : string
  {
    var className;
    switch (taskPriorityName)
    {
      case "Urgent": className = "badge-danger"; break;
      case "Normal": className = "badge-primary"; break;
      case "Below Normal": className = "badge-info"; break;
      case "Low": className = "badge-secondary"; break;
    }
    return className;
  }

  /* Get text color based on task status */
  getTaskGroupTextCssClass(taskStatusName) : string
  {
    var className;
    switch (taskStatusName)
    {
      case "Holding": className = "text-secondary"; break;
      case "Prioritized": className = "text-primary"; break;
      case "Started": className = "text-info"; break;
      case "Finished": className = "text-success"; break;
      case "Reverted": className = "text-danger"; break;
    }
    return className;
  }
}
