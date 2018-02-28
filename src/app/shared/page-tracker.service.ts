import { Injectable } from '@angular/core';
//import { HttpClient } from "@angular/http";
import { Router, RoutesRecognized } from "@angular/router";

@Injectable()
export class PageTrackerService {

  referringLink: string = "";

  constructor(private router: Router) { }

trackPage(): string {

  let referrer = this.referringLink;

  this.router.events.filter((e: any) => e instanceof RoutesRecognized)
    .pairwise()
    .subscribe((e: any) => {
      referrer = e[0].url;
      this.referringLink = e[0].url;
      } )

  
return;

}


}
