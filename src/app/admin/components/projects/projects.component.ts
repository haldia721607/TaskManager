import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ProjectsService } from "../../../services/projectservice.service";
import { Project } from '../../../models/project';
import { ClientLocation } from '../../../models/client-location';
import { ClientLocationService } from '../../../services/client-location.service';
import { NgForm } from '@angular/forms';
import * as $ from "jquery";
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  clientLocations: Observable<ClientLocation[]>;
  // clientLocations: ClientLocation[]=[];
  showLoading: boolean = true;

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: number = null;
  deleteProject: Project = new Project();
  deleteIndex: number = null;
  searchBy: string = "ProjectName";
  searchText: string = null;

  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 3;

  @ViewChild("newForm") newForm: NgForm;
  @ViewChild("editForm") editForm: NgForm;
  //for single data pass to pairent controler
  // @ViewChild("prj") prj:ProjectComponent;
  // @ViewChildren("prj") prj: QueryList<ProjectComponent>;

  constructor(private projectsService: ProjectsService, private ClientLocationsService: ClientLocationService) {
  }

  ngOnInit() {
    this.getAllProjects();
    //Agr hame koi data ke sath koi logica apply karna hai toh subscribe method use  karenge jo commented hai | Example calculateNoOfPages()  wala method jo hai
    // this.ClientLocationsService.getClientLocations().subscribe(
    //   (response) => {
    //     this.clientLocations = response;
    //   }
    // );

    //Agr hame koi data ke sath koi logica apply nahi karna hai toh nahi use karenge for example simple dropdown bind karna ho
    //or *ngFor jissehe laga waha ( | async ) pipe use karenge or age pahle wala method kana ho toh nahi karenge
    this.clientLocations = this.ClientLocationsService.getClientLocations();
  }
  getAllProjects() {
    this.projectsService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );
  }
  onPageIndexClicked(pageIndex: number) {
    this.currentPageIndex = pageIndex;
  }
  calculateNoOfPages() {
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(this.projects, this.searchBy, this.searchText);
    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }
  onSearchTextKeyup(event) {
    this.calculateNoOfPages();
  }

  //when we open new project model for create new project and want to focus on id then we use ElementRef
  //Set a variable on input controle like as(#prjID) and access in  ts page using @viewChild 
  @ViewChild("prjID") prjID: ElementRef;
  onNewClick($event) {
    this.newForm.resetForm();
    setTimeout(() => {
      this.prjID.nativeElement.focus();
    }, 100);
  }
  onSaveClick() {
    if (this.newForm.valid) {
      this.newProject.ClientLocation.ClientLocationID = 0;
      this.projectsService.insertProject(this.newProject).subscribe((response) => {
        //Add Project to Grid
        var p: Project = new Project();
        p.ProjectID = response.ProjectID;
        p.ProjectName = response.ProjectName;
        p.DateOfStart = response.DateOfStart;
        p.TeamSize = response.TeamSize;
        p.ClientLocation = response.ClientLocation;
        p.Active = response.Active;
        p.ClientLocationID = response.ClientLocationID;
        p.Status = response.Status;
        this.projects.push(p);

        //Clear New Project Dialog - TextBoxes
        this.newProject.ProjectID = null;
        this.newProject.ProjectName = null;
        this.newProject.DateOfStart = null;
        this.newProject.TeamSize = null;
        this.newProject.Active = false;
        this.newProject.ClientLocationID = null;
        this.newProject.Status = null;
        this.getAllProjects();
        this.calculateNoOfPages();
        $("#newFormCancel").trigger("click");
      }, (error) => {
        console.log(error);
      });
    }
  }

  onEditClick(event, index: number) {
    this.editForm.resetForm();
    setTimeout(() => {
      this.editProject.ProjectID = this.projects[index].ProjectID;
      this.editProject.ProjectName = this.projects[index].ProjectName;
      this.editProject.DateOfStart = this.projects[index].DateOfStart.split("-").reverse().join("-");
      this.editProject.TeamSize = this.projects[index].TeamSize;
      this.editProject.Active = this.projects[index].Active;
      this.editProject.ClientLocationID = this.projects[index].ClientLocationID;
      this.editProject.ClientLocation = this.projects[index].ClientLocation;
      this.editProject.Status = this.projects[index].Status;
      this.editIndex = index;
    }, 100);
  }

  onUpdateClick() {
    if (this.editForm.valid) {
      this.projectsService.updateProject(this.editProject).subscribe(
        (response: Project) => {
          var p: Project = new Project();
          p.ProjectID = response.ProjectID;
          p.ProjectName = response.ProjectName;
          p.DateOfStart = response.DateOfStart;
          p.TeamSize = response.TeamSize;
          p.ClientLocation = response.ClientLocation;
          p.Active = response.Active;
          p.ClientLocationID = response.ClientLocationID;
          p.Status = response.Status;
          this.projects[this.editIndex] = p;

          //Reset form
          this.editProject.ProjectID = null;
          this.editProject.ProjectName = null;
          this.editProject.DateOfStart = null;
          this.editProject.TeamSize = null;
          this.newProject.Active = false;
          this.newProject.ClientLocationID = null;
          this.newProject.Status = null;
          $("#editFormCancel").trigger("click");
        },
        (error) => {
          console.log(error);
        });
    }
  }

  onDeleteClick(event, index: number) {
    this.deleteIndex = index;
    this.deleteProject.ProjectID = this.projects[index].ProjectID;
    this.deleteProject.ProjectName = this.projects[index].ProjectName;
    this.deleteProject.DateOfStart = this.projects[index].DateOfStart;
    this.deleteProject.TeamSize = this.projects[index].TeamSize;
  }

  onDeleteConfirmClick() {
    this.projectsService.deleteProject(this.deleteProject.ProjectID).subscribe(
      (response) => {
        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject.ProjectID = null;
        this.deleteProject.ProjectName = null;
        this.deleteProject.TeamSize = null;
        this.deleteProject.DateOfStart = null;

        this.calculateNoOfPages();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSearchClick() {
    if (this.searchText == null || this.searchText == "") {
      this.searchText = null;
    }
    this.projectsService.SearchProjects(this.searchBy, this.searchText).subscribe(
      (response) => {
        this.projects = response;
      }
    )
  }

  onHideShowDetails(event) {
    this.projectsService.toggleDetails();
  }

  isAllChecked: boolean = false;

  @ViewChildren("prj") projs: QueryList<ProjectComponent>;

  isAllCheckedChange(event) {
    let proj = this.projs.toArray();
    for (let i = 0; i < proj.length; i++) {
      proj[i].isAllCheckedChange(this.isAllChecked);
    }
  }


}
