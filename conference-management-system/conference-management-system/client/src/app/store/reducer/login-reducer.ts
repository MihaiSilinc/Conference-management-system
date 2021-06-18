import {Action, ActionReducer, createReducer, INIT, on} from "@ngrx/store";
import {LoginState} from "../state/login-state";
import {loginFailed, loginSucceeded, logout} from "../action/login-actions";

const initialLoginState: LoginState = {
  loggedInUser: undefined,
  wasSuccessful: undefined,
  errorMessage: ''
}

export const loginReducer = createReducer(
  initialLoginState,
  on(loginSucceeded, (state, {user}) => ({...state, loggedInUser: user, wasSuccessful: true})),
  on(loginFailed, (state, {message}) => ({...state, wasSuccessful: false, errorMessage: message})),
  on(logout, (state) => ({...state, wasSuccessful: undefined, loggedInUser: undefined}))
)

export const loginMetaReducer = (reducer: ActionReducer<LoginState>): ActionReducer<LoginState> => {
  return (state, action) => {
    if (action.type === INIT) {
      const loginState = localStorage.getItem("loginState");
      if (!!loginState) {
        try {
          return JSON.parse(loginState)
        } catch {
          localStorage.removeItem("loginState");
        }
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem("loginState", JSON.stringify(nextState));
    return nextState;
  }
}

export function reducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
