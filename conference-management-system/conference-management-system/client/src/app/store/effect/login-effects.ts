import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginFailed, loginSucceeded, logout, triggerLogin} from "../action/login-actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../api";
import {RoutingConstants} from "../../util/routing-constants";
import {LogoutService} from "../../service/logout.service";

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private logoutService: LogoutService
  ) {
  }

  triggerLogin$ = createEffect(() => this.actions$.pipe(
    ofType(triggerLogin),
    switchMap(action => this.authService.login(action.credentials).pipe(
        map(user => loginSucceeded({user})),
        catchError(error => of(loginFailed({message: error.message})))
      ))
  ));

  loginSucceeded$ = createEffect(() => this.actions$.pipe(
    ofType(loginSucceeded),
    tap(() => this.router.navigate([RoutingConstants.HOME]))
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      debugger;
      this.router.navigate([RoutingConstants.LOGIN]);
      this.logoutService.logout().subscribe();
    })
  ), {dispatch: false});
}
