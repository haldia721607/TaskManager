import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditTask } from '../models/edit-task';
import { GroupedTask } from '../models/grouped-task';
import { Task } from '../models/task';
import { TaskStatusDetail } from '../models/task-status-detail';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) {
  }
  getTasks(): Observable<GroupedTask[]> {
    return this.httpClient.get<GroupedTask[]>("/api/tasks", { responseType: "json" });
  }
  insertTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>("/api/createtask", newTask, { responseType: "json" });
  }
  updateTaskById(editTask: EditTask): Observable<EditTask> {
    return this.httpClient.post<EditTask>("/api/updatetaskbyid", editTask, { responseType: "json" });
  }
  getTaskByTaskID(TaskID: number): Observable<Task> {
    return this.httpClient.get<Task>("/api/tasks/searchbytaskid/" + TaskID, { responseType: "json" });
  }
  editTaskByTaskID(TaskID: number): Observable<EditTask> {
    return this.httpClient.get<EditTask>("/api/tasks/editTaskByID/" + TaskID, { responseType: "json" });
  }
  updateTaskStatus(taskStatusDetail: TaskStatusDetail): Observable<TaskStatusDetail> {
    return this.httpClient.put<TaskStatusDetail>("/api/updatetaskstatus", taskStatusDetail, { responseType: "json" });
  }
}
