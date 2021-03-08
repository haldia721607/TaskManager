import { Project } from './project';

export class Task {
    TaskID: number;
    TaskName: string;
    Description: string;
    CreatedOn: string;
    ProjectID: number;
    CreatedBy: string;
    AssignedTo: string;
    TaskPriorityID: number;
    LastUpdatedOn: number;
    CurrentStatus: number;
    CurrentTaskStatusID: number;
    CreatedOnString: string;
    LastUpdatedOnString: string;

    Project: Project;
    CreatedByUser: any;
    AssignedToUser: any;
    TaskStatusDetails: any;

    constructor() {
        this.TaskID = null;
        this.TaskName = null;
        this.Description = null;
        this.CreatedOn = null;
        this.ProjectID = null;
        this.CreatedBy = null;
        this.AssignedTo = null;
        this.TaskPriorityID = null;
        this.LastUpdatedOn = null;
        this.CurrentStatus = null;
        this.CreatedOnString = null;
        this.LastUpdatedOnString = null;

        this.Project = null;
        this.CreatedByUser = null;
        this.AssignedToUser = null;
        this.TaskStatusDetails = null;
        this.TaskStatusDetails = null;
        this.CurrentTaskStatusID = null;
    }
}
