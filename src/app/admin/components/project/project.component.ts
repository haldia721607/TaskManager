import { Component, OnInit, Input, EventEmitter, Output, ContentChild, ContentChildren, QueryList, SimpleChanges, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectsService } from '../../../services/projectservice.service';

import { Subscription } from 'rxjs';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject") project: Project;
  @Input("recordIndex") i: number;

  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  hideDetails: boolean = false;
  MySubscription: Subscription;
  constructor(public projectService: ProjectsService) {
  }

  ngOnInit() {
    //Ye example Observable unicast ka hai ./ 
    //ishme ek Observable pass karta hai value Observer ko woo bhi individually
    // or ishme hum optional bhi hai ki hum kuch Observer ko value nahi pass karna / ya skip karna hai . 
    //toh hum ishme kar sakte hai
    // this.projectService.MyObservable.subscribe((hide) => {
    //   this.hideDetails = hide;
    // });

    //Ye example (subject class multicast)  ka hai ./ 
    //But jab hame sare Observer ko ek sath value pass karna ho to hum (subject class multicast) use karte hai
    //ishme hum ek saath sare Observer ko value pass kar sakte hai / But agr hume koi bhi Observer 
    //skip karna ho / ya na pass karno ho value toh hum ishme nahi kar skate 
    this.MySubscription = this.projectService.MySubject.subscribe((hide) => {
      this.hideDetails = hide;
    });
  }

  onEditClick(event, i) {
    this.editClick.emit({ event, i });
  }

  onDeleteClick(event, i) {
    this.deleteClick.emit({ event, i });
  }
  //ye ngOnDestroy() execute  tab hota hai jab current page ko chor ke kisi or page pe navigate karte hai
  //ye ngOnDestroy() just opposite hota hai ngOnInit() ka , ye autometic fire hota hai jab kisi 
  //or page pe navigate karte hai .. Ishme hum manulay multicast observer ko unsubscribe() kar rahe hai
  ngOnDestroy() {
    this.MySubscription.unsubscribe();
  }

  //This is multiple grand example we access all references
  //This is single grand example we access all references
  // @ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent;
  @ContentChildren("selectionBox") selectionBoxes: QueryList<CheckBoxPrinterComponent>;
  isAllCheckedChange(b: boolean) {
    let selectionBox = this.selectionBoxes.toArray();
    if (b) {
      for (let i = 0; i < selectionBox.length; i++) {
        selectionBox[i].check();
      }
    }
    else {
      for (let i = 0; i < selectionBox.length; i++) {
        selectionBox[i].unCheck();
      }
    }
  }
}
