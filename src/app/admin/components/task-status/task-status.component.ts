import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from 'src/app/models/task-status';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TaskStatusesService } from 'src/app/services/task-statuses.service';
import * as $ from "jquery";

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {
  //Objects for Holding Model Data
  taskStatus: TaskStatus[] = [];
  showLoading: boolean = true;

  //Objects for Delete
  deleteTaskStatus: TaskStatus = new TaskStatus();
  editIndex: number = null;
  deleteIndex: number = null;

  //Properties for Searching
  searchBy: string = "TaskStatusName";
  searchText: string = "";

  //Properties for Paging
  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 7;

  //Properties for Sorting
  sortBy: string = "TaskStatusName";
  sortOrder: string = "ASC";

  //Reactive Forms
  newForm: FormGroup;
  editForm: FormGroup;

  //Autofocus TextBoxes
  @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef;
  @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef;

  constructor(private taskStatusService: TaskStatusesService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //Get data from database
    this.taskStatusService.getTaskStatus().subscribe(
      (response: TaskStatus[]) => {
        this.taskStatus = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    //Create newForm
    this.newForm = this.formBuilder.group({
      TaskStatusID: this.formBuilder.control(null),
      TaskStatusName: this.formBuilder.control(null, [Validators.required])
    });

    //Create editForm
    this.editForm = this.formBuilder.group({
      TaskStatusID: this.formBuilder.control(null),
      TaskStatusName: this.formBuilder.control(null, [Validators.required])
    });
  }
  calculateNoOfPages() {
    //Get no. of Pages
    let filterPipe = new FilterPipe();
    var noOfPages = Math.ceil(filterPipe.transform(this.taskStatus, this.searchBy, this.searchText).length / this.pageSize);
    this.pages = [];

    //Generate pages
    for (let i = 0; i < noOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }
  onPageIndexClicked(ind)
  {
    //Set currentPageIndex
    if (ind >= 0 && ind < this.pages.length)
    {
      this.currentPageIndex = ind;
    }
  }

  onNewClick(event)
  {
    //reset the newForm
    this.newForm.reset({ taskStatusID: 0 });
    setTimeout(() =>
    {
      //Focus the TaskPriority textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick()
  {
    if (this.newForm.valid)
    {
      //Invoke the REST-API call
      this.taskStatusService.insertTaskStatus(this.newForm.value).subscribe((response) =>
      {
        //Add Response to Grid
        var p: TaskStatus = new TaskStatus();
        p.TaskStatusID = response.TaskStatusID;
        p.TaskStatusName = response.TaskStatusName;
        this.taskStatus.push(p);

        //Reset the newForm
        this.newForm.reset();
        $("#newTaskStatusFormCancel").trigger("click");
        this.calculateNoOfPages();

        this.calculateNoOfPages();
      }, (error) =>
        {
          console.log(error);
        });
    }
  }

  onEditClick(event, taskStatus: TaskStatus)
  {
    //Reset the editForm
    this.editForm.reset();
    setTimeout(() =>
    {
      //Set data into editForm
      this.editForm.patchValue(taskStatus);
      this.editIndex = this.taskStatus.indexOf(taskStatus);

      //Focus the TaskPriority textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick()
  {
    if (this.editForm.valid)
    {
      //Invoke the REST-API call
      this.taskStatusService.updatTaskStatus(this.editForm.value).subscribe((response: TaskStatus) =>
      {
        //Update the response in Grid
        this.taskStatus[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
        $("#editTaskStatusFormCancel").trigger("click");
      },
        (error) =>
        {
          console.log(error);
        });
    }
  }

  onDeleteClick(event, taskStatus: TaskStatus)
  {
    //Set data into deleteTaskPriority
    this.deleteTaskStatus.TaskStatusID = taskStatus.TaskStatusID;
    this.deleteTaskStatus.TaskStatusName = taskStatus.TaskStatusName;
    this.deleteIndex = this.taskStatus.indexOf(taskStatus);
  }

  onDeleteConfirmClick()
  {
    //Invoke the REST-API call
    this.taskStatusService.deleteTaskStatus(this.deleteTaskStatus.TaskStatusID).subscribe(
      (response) =>
      {
        //Delete object in Grid
        this.taskStatus.splice(this.deleteIndex, 1);

        //Clear deleteCountry
        this.deleteTaskStatus.TaskStatusID = null;
        this.deleteTaskStatus.TaskStatusName = null;

        //Recall the calculateNoOfPages
        this.calculateNoOfPages();
      },
      (error) =>
      {
        console.log(error);
      });
  }

  onSearchTextChange(event)
  {
    this.calculateNoOfPages();
  }
}