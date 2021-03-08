import { ClientLocation } from '../models/client-location';

export class Project
{
    ProjectID: number;
    ProjectName: string;
    DateOfStart: string;
    TeamSize: number;
    Active: boolean;
    Status: string;
    ClientLocationID: number;
    ClientLocation: ClientLocation;

    constructor()
    {
        this.ProjectID = null;
        this.ProjectName = null;
        this.DateOfStart = null;
        this.TeamSize = null;
        this.Active = true;
        this.Status = null;
        this.ClientLocationID = null;
        this.ClientLocation = new ClientLocation();
    }
}