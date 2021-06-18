import {AppState} from "../state/app-state";
import {createSelector} from "@ngrx/store";
import {RegisterState} from "../state/register-state";
import {ConferenceState} from "../state/conference-state";

const getConferenceState = (state: AppState) => state.conferenceState;

export const getConferenceErrorMessage = createSelector(
  getConferenceState,
  (state: ConferenceState) => state.errorMessage
);

export const getConferences = createSelector(
  getConferenceState,
  (state: ConferenceState) => state.conferences
);

export const getPCMembers = createSelector(
  getConferenceState,
  (state: ConferenceState) => state.members
);

export const getProposals = createSelector(
  getConferenceState,
  (state: ConferenceState) => state.proposals
);

export const getReviewers = createSelector(
  getConferenceState,
  (state: ConferenceState) => state.reviewers
);

export const getProposalsToReview = createSelector(
  getConferenceState,
  (state: ConferenceState) => state.proposalsToReview
);

export const getReviews = createSelector(
  getConferenceState,
  (state: ConferenceState) => state.reviews
);
