import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { Project } from '../models/project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  //Ye example Observable unicast ka hai ./ 
  //ishme ek Observable pass karta hai value Observer ko woo bhi individually
  // or ishme hum optional bhi hai ki hum kuch Observer ko value nahi pass karna / ya skip karna hai . 
  //toh hum ishme kar sakte hai
  // public MyObservable: Observable<boolean>;
  // public MyObservers: Observer<boolean>[] = [];

  //Ye example (subject class multicast)  ka hai ./ 
  //But jab hame sare Observer ko ek sath value pass karna ho to hum (subject class multicast) use karte hai
  //ishme hum ek saath sare Observer ko value pass kar sakte hai / But agr hume koi bhi Observer 
  //skip karna ho / ya na pass karno ho value toh hum ishme nahi kar skate 
  // public MySubject: Subject<boolean>;

  //Ye example (BehavierSubject) ka hai ./ 
  //Ager last multicast brodcast ke value ke stae hamesh mainten kar ke rakhna hai toh hum BehavierSubject ka
  //use kare hai ye state ko mainten karta hai 
  public MySubject: BehaviorSubject<boolean>;
  hideDetails: boolean = false;

  constructor(private httpClient: HttpClient) {
    //Ye example Observable unicast ka hai ./ 
    //ishme ek Observable pass karta hai value Observer ko woo bhi individually
    // or ishme hum optional bhi hai ki hum kuch Observer ko value nahi pass karna / ya skip karna hai . 
    //toh hum ishme kar sakte hai
    // this.MyObservable = Observable.create((observer: Observer<boolean>) => {
    //   this.MyObservers.push(observer);
    // });

    //Ye example (subject class multicast)  ka hai ./ 
    //But jab hame sare Observer ko ek sath value pass karna ho to hum (subject class multicast) use karte hai
    //ishme hum ek saath sare Observer ko value pass kar sakte hai / But agr hume koi bhi Observer 
    //skip karna ho / ya na pass karno ho value toh hum ishme nahi kar skate 
    // this.MySubject = new Subject<boolean>();

    //Ye example (BehavierSubject) ka hai ./ 
    //Ager last multicast brodcast ke value ke stae hamesh mainten kar ke rakhna hai toh hum BehavierSubject ka
    //use kare hai ye state ko mainten karta hai 
    //Or ishme hame seperate property Jo hideDetails ki jarurat nahi hai ,Because hum ishme default already assing karte hai
    this.MySubject = new BehaviorSubject<boolean>(false);
  }

  toggleDetails() {
    //Ye example Observable unicast ka hai ./ 
    //ishme ek Observable pass karta hai value Observer ko woo bhi individually
    // or ishme hum optional bhi hai ki hum kuch Observer ko value nahi pass karna / ya skip karna hai . 
    //toh hum ishme kar sakte hai
    // this.hideDetails = !this.hideDetails;
    // for (let i = 0; i < this.MyObservers.length; i++) {
    //   console.log("MyObservers -" + this.MyObservers.length);
    //   this.MyObservers[i].next(this.hideDetails);
    // }

    //Ye example (subject class multicast)  ka hai ./ 
    //But jab hame sare Observer ko ek sath value pass karna ho to hum (subject class multicast) use karte hai
    //ishme hum ek saath sare Observer ko value pass kar sakte hai / But agr hume koi bhi Observer 
    //skip karna ho / ya na pass karno ho value toh hum ishme nahi kar skate 
    // this.hideDetails = !this.hideDetails;
    // this.MySubject.next(this.hideDetails);

    //Ye example (BehavierSubject) ka hai ./ 
    //Ager last multicast brodcast ke value ke stae hamesh mainten kar ke rakhna hai toh hum BehavierSubject ka
    //use kare hai ye state ko mainten karta hai 
    //Or ishme hame seperate property Jo hideDetails ki jarurat nahi hai ,Because hum ishme default already assing karte hai
    this.MySubject.next(!this.MySubject.value);

  }

  getAllProjects(): Observable<Project[]> {

    //This is code for attach JWT token in headers manually || 
    //Now this code is comment becase this Jwt token add autometically by injecting 
    //JwtInterceptor service you can see JwtInterceptor service code on that ts page
    //...........................................
    // var currentUser = { Token: "" };
    // var headers = new HttpHeaders();
    // headers = headers.set("Authorization", "Bearer ");
    // if (sessionStorage.currentUser != null) {
    //   currentUser = JSON.parse(sessionStorage.currentUser);
    //   headers = headers.set("Authorization", "Bearer " + currentUser.Token);
    // }
    // return this.httpClient.get<Project[]>("/api/projects", { headers: headers, responseType: "json" })

    return this.httpClient.get<Project[]>("/api/projects", { responseType: "json" })
      .pipe(map(
        (data: Project[]) => {
          for (let i = 0; i < data.length; i++) {
            //data[i].TeamSize = data[i].TeamSize * 100;
          }
          return data;
        }
      ));
  }
  getProjectByProjectID(ProjectID: number): Observable<Project> {
    return this.httpClient.get<Project>("/api/projects/searchbyprojectid/" + ProjectID, { responseType: "json" })
  }
  insertProject(newProject: Project): Observable<Project> {
    return this.httpClient.post<Project>("/api/projects", newProject, { responseType: "json" });
  }

  updateProject(existingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>("/api/projects", existingProject, { responseType: "json" });
  }

  deleteProject(ProjectID: number): Observable<string> {
    return this.httpClient.delete<string>("/api/projects?ProjectID=" + ProjectID, { responseType: "json" });
  }

  SearchProjects(searchBy: string, searchText: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>("/api/projects/search/" + searchBy + "/" + searchText, { responseType: "json" });
  }
}



