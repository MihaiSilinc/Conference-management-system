import {createSelector} from "@ngrx/store";
import {AppState} from "../state/app-state";
import {LoginState} from "../state/login-state";

const getLoginState = (state: AppState) => state.loginState;

export const getLoggedInUser = createSelector(
  getLoginState,
  (state: LoginState) => state.loggedInUser
);

export const isUserLoggedIn = createSelector(
  getLoginState,
  (state: LoginState) => !!state?.loggedInUser
)
