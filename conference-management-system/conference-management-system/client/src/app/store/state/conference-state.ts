// @ts-ignore
import {ConferenceWithChairDto, EvaluationWithInfoDto, ProposalDto, UserDto} from "../../../api";

export interface ConferenceState {
  errorMessage: string;
  conferences: ConferenceWithChairDto[]
  members: UserDto[],
  proposals: ProposalDto[],
  reviewers: UserDto[],
  proposalsToReview: ProposalDto[],
  reviews: EvaluationWithInfoDto[]
}
