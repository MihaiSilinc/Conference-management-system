import {Action, createReducer, on} from "@ngrx/store";
import { registerFailed } from "../action/register-actions";
import {RegisterState} from "../state/register-state";

const initialRegisterState: RegisterState = {
  errorMessage: ''
}

export const registerReducer = createReducer(
  initialRegisterState,
  on(registerFailed, (state, {message}) => ({...state, errorMessage: message}))
)

export function reducer(state: RegisterState | undefined, action: Action) {
  return registerReducer(state, action);
}
