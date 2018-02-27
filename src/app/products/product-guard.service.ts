import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";

@Injectable()
export class ProductGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      //route to error page here, not alert
      alert("invalid product number...");
      this.router.navigate(['/products']);
      return false;
    };
    return true;
  }

}
