import { TaskStatus } from './task-status';

export class TaskStatusDetail {
    TaskStatusDetailID: number;
    TaskID: number;
    TaskStatusID: number;
    UserID: string;
    Description: string;
    Taskstatus: TaskStatus;
    User: any;
    StatsUpdationDateTimeString: string;

    constructor()
    {
        this.TaskStatusDetailID = null;
        this.TaskID = null;
        this.TaskStatusID = null;
        this.Description = null;
        this.UserID = null;
        this.Taskstatus = null;
        this.User = null;
        this.StatsUpdationDateTimeString = null;
    }
}
