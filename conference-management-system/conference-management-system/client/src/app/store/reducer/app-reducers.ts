import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {AppState} from "../state/app-state";
import * as fromLogin from "../reducer/login-reducer";
import * as fromRegister from "../reducer/register-reducer";
import * as fromConferenceState from "./conference-reducer";
import {loginMetaReducer} from "../reducer/login-reducer";

export const reducers: ActionReducerMap<AppState> = {
  loginState: fromLogin.reducer,
  registerState: fromRegister.reducer,
  conferenceState: fromConferenceState.reducer
};

export const metaReducers: MetaReducer[] = [
  loginMetaReducer
]
