import {createSelector} from "@ngrx/store";
import {AppState} from "../state/app-state";
import {LoginState} from "../state/login-state";
import {RegisterState} from "../state/register-state";

const getRegisterState = (state: AppState) => state.registerState;

export const getRegisterErrorMessage = createSelector(
  getRegisterState,
  (state: RegisterState) => state.errorMessage
);
