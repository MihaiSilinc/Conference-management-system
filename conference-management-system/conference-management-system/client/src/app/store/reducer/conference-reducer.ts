import {Action, createReducer, on} from "@ngrx/store";
import {
  createAssignmentFailed,
  createConferenceFailed,
  createEvaluationFailed,
  getConferencesFailed,
  getConferencesSuccessful,
  getPCMembersFailed,
  getPCMembersSuccessful,
  getProposalsFailed,
  getProposalsSuccessful,
  getProposalsToReviewFailed,
  getProposalsToReviewSuccessful,
  getReviewersFailed,
  getReviewersSuccessful,
  getReviewsSuccessful,
  updateEvaluationFailed
} from "../action/conference-actions";
import {ConferenceState} from "../state/conference-state";

const initialConferenceState: ConferenceState = {
  errorMessage: '',
  conferences: [],
  members: [],
  proposals: [],
  reviewers: [],
  proposalsToReview: [],
  reviews: []
}

export const conferenceReducer = createReducer(
  initialConferenceState,
  on(createConferenceFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(getConferencesSuccessful, (state, {conferences}) => ({...state, conferences: conferences})),
  on(getConferencesFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(getPCMembersSuccessful, (state, {members}) => ({...state, members: members})),
  on(getPCMembersFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(createAssignmentFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(getProposalsSuccessful, (state, {proposals}) => ({...state, proposals: proposals})),
  on(getProposalsFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(getReviewersSuccessful, (state, {reviewers}) => ({...state, reviewers: reviewers})),
  on(getReviewersFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(getProposalsToReviewSuccessful, (state, {proposals}) => ({...state, proposalsToReview: proposals})),
  on(getProposalsToReviewFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(createEvaluationFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(updateEvaluationFailed, (state, {message}) => ({...state, errorMessage: message})),
  on(getReviewsSuccessful, (state, {reviews}) => ({...state, reviews: reviews})),
  on(getReviewersFailed, (state, {message}) => ({...state, errorMessage: message})),
)

export function reducer(state: ConferenceState | undefined, action: Action) {
  return conferenceReducer(state, action);
}
