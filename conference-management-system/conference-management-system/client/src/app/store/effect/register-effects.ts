import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../api";
import {registerFailed, registerSucceeded, triggerRegister} from "../action/register-actions";
import {RoutingConstants} from "../../util/routing-constants";

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  triggerRegister$ = createEffect(() => this.actions$.pipe(
    ofType(triggerRegister),
    switchMap(action => this.authService.register(action.userDto).pipe(
      map(user => registerSucceeded({user})),
      catchError(error => of(registerFailed({message: error.message})))
    ))
  ));

  registerSucceeded$ = createEffect(() => this.actions$.pipe(
    ofType(registerSucceeded),
    tap(() => this.router.navigate([RoutingConstants.LOGIN]))
  ), {dispatch: false});
}
