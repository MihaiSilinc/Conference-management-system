import {createAction, props} from "@ngrx/store";
import {UserDto} from "../../../api";

export const triggerRegister = createAction('[REGISTER] triggerRegister',
  props<{
    userDto: UserDto
  }>());

export const registerSucceeded = createAction('[REGISTER] registerSucceeded',
  props<{
    user: UserDto
  }>());

export const registerFailed = createAction('[REGISTER] registerFailed',
  props<{
    message: string;
  }>());

