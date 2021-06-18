import {createAction, props} from "@ngrx/store";
import {CredentialsDto} from "../../../api";

export const triggerLogin = createAction('[LOGIN] triggerLogin',
  props<{
    credentials: CredentialsDto
  }>());

export const loginSucceeded = createAction('[LOGIN] loginSucceeded',
  props<{
    user: any // TODO: change to some DTO when we have it
  }>());

export const loginFailed = createAction('[LOGIN] loginFailed',
  props<{
    message: string;
  }>());

export const logout = createAction('[LOGIN] logout');
