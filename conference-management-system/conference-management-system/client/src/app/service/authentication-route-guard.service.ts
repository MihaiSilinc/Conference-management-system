import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {UserDto} from "../../api";
import {getLoggedInUser} from "../store/selector/login-selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRouteGuardService implements CanActivate {
  private user: UserDto;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.store.select(getLoggedInUser).subscribe(
      user => this.user = user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!!this.user)
      return true;

    this.router.navigate(['login']);
    return false;
  }
}
