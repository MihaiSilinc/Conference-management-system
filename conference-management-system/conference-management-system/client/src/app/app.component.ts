import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {logout} from "./store/action/login-actions";
import {Observable} from "rxjs";
import {getLoggedInUser, isUserLoggedIn} from "./store/selector/login-selectors";
import {MatSidenav} from "@angular/material/sidenav";
import {UserDto} from "../api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav: MatSidenav;
  isUserLoggedIn$: Observable<boolean>;
  loggedInUser$: Observable<UserDto>;

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn$ = this.store.select(isUserLoggedIn);
    this.loggedInUser$ = this.store.select(getLoggedInUser);
  }

  public logout() {
    this.store.dispatch(logout());
  }

  ngAfterViewInit() {
    this.sidenav.mode = 'over';
    this.sidenav.close();
  }
}
