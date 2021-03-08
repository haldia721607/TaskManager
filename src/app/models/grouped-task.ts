import { Task } from './task';

export class GroupedTask {
    TaskStatusName: number;
    Tasks: Task[];

    constructor()
    {
        this.TaskStatusName = null;
        this.Tasks = null;
    }
}
