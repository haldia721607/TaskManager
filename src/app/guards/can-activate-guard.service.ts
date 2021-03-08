import { Injectable } from '@angular/core';
import { LoginService } from './../services/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).Token : null;
    if (this.loginService.isAuthenticated() && this.jwtHelperService.decodeToken(token).role == route.data.expectedRole) {
      return true;
    }
    else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
