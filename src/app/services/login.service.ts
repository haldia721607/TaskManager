import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from './../models/login-view-model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SignUpViewModel } from './../models/sign-up-view-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient
  constructor(private httpBackend: HttpBackend, private router: Router, private jwtHelperService: JwtHelperService) {

  }

  currentUserName: string = null;
  currentUserRole: string = null;

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("/authenticate", loginViewModel, { responseType: "json" })
      .pipe(map(user => {
        if (user) {
          this.currentUserName = user.UserName;
          this.currentUserRole = user.Role;
          sessionStorage.currentUser = JSON.stringify(user);
        }
        return user;
      }));
  }
  public detectIfAlreadyLoggedIn() {
    if (this.jwtHelperService.isTokenExpired() == false) {
      var currentUser = JSON.parse(sessionStorage.currentUser);
      this.currentUserName=currentUser.UserName;
      this.currentUserRole=currentUser.Role;
    }
  }
  // public Register(signUpViewModel: SignUpViewModel): Observable<any>
  // {
  //   this.httpClient = new HttpClient(this.httpBackend);
  //   return this.httpClient.post<any>("/register", signUpViewModel, { responseType: "json", observe: "response" })
  //   .pipe(map(response => {
  //     if (response)
  //     {
  //       this.currentUserName = response.body.userName;
  //       sessionStorage.currentUser = JSON.stringify(response.body);
  //       sessionStorage.XSRFRequestToken = response.headers.get("XSRF-REQUEST-TOKEN");
  //     }
  //     return response.body;
  //   }));
  // }
  public Register(signUpViewModel: SignUpViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post<any>("/register", signUpViewModel, { responseType: "json" })
      .pipe(map(user => {
        if (user) {
          this.currentUserName = user.UserName;
          this.currentUserRole=user.Role;
          sessionStorage.currentUser = JSON.stringify(user);
        }
        return user;
      }));
  }

  getUserByEmail(Email: string): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("/api/getUserByEmail/" + Email, { responseType: "json" })
  }


  public Logout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUserRole");
    this.currentUserName = null;
    this.currentUserRole = null;
    this.router.navigateByUrl("/login");
  }

  public isAuthenticated(): boolean {
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).Token : null;
    if (this.jwtHelperService.isTokenExpired(token = token)) {
      return false;//token is not valid
    }
    else {
      return true;//token is valid
    }
  }

  public getAllEmployes(): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("/api/getallemployees", { responseType: "json" });
  }
}
