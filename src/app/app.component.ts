import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterLoggerService } from './services/router-logger.service';
import { LoginService } from './services/login.service';
import { fadeAnimation, slideUpAnimation, zoomUpAnimation ,zoomLeftAnimation,slideLeftOrRightAnimation,keyFrameAnimation} from "./animations/my-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ fadeAnimation ]
})
export class AppComponent {
  constructor(public loginService: LoginService, private routerLoggerService: RouterLoggerService, private router: Router) {
   }

   ngOnInit() {
     this.loginService.detectIfAlreadyLoggedIn();
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     let userName = (this.loginService.currentUserName) ? this.loginService.currentUserName : "anonymous";
    //     let logMsg = new Date().toLocaleDateString() + ": " + userName + " navigates to " + event.url;
    //     console.log(logMsg);
    //     this.routerLoggerService.log(logMsg).subscribe();
    //   }
    // });
  }

  onSearchClick() {
    console.log(this.loginService.currentUserName);
  }
  getState(outlet)
  {
    return outlet.isActivated? outlet.activatedRoute.snapshot.url[0].path && outlet.activatedRouteData["linkIndex"] : "none";
  }
}
