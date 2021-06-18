import {LoginState} from "./login-state";
import {RegisterState} from "./register-state";
import {CreateConferenceComponent} from "../../components/pcmember/create-conference/create-conference.component";
import {ConferenceState} from "./conference-state";

export interface AppState {
  loginState: LoginState,
  registerState: RegisterState,
  conferenceState: ConferenceState
}
