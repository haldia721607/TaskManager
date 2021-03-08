export class EditTask {
    TaskID: number;
    TaskName: string;
    Description: string;
    ProjectID: number;
    AssignedTo: string;
    TaskPriorityID: number;
    CurrentStatus: string;

    constructor() {
        this.TaskID = 0;
        this.TaskName=null;
        this.Description=null;
        this.ProjectID=0;
        this.AssignedTo=null;
        this.TaskPriorityID=null;
        this.CurrentStatus=null;
    }
}
