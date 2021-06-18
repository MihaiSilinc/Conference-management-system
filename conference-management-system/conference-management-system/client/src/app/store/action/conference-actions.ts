import {createAction, props} from "@ngrx/store";
import {
  AssignmentDto,
  ConferenceDto,
  ConferenceWithChairDto,
  EvaluationDto,
  EvaluationWithInfoDto,
  ProposalDto,
  UserDto
} from "../../../api";


export const triggerCreateConference = createAction('[CONFERENCE] triggerCreateConference',
  props<{
    userId: string,
    conferenceDto: ConferenceDto
  }>());

export const createConferenceSucceeded = createAction('[CONFERENCE] createConferenceSucceeded',
  props<{
    conferenceDto: ConferenceDto
  }>());

export const createConferenceFailed = createAction('[CONFERENCE] createConferenceFailed',
  props<{
    message: string;
  }>());

export const triggerGetConferences = createAction('[CONFERENCE] triggerGetConferences');

export const getConferencesSuccessful = createAction('[CONFERENCE] getConferencesSuccessful',
  props<{
    conferences: ConferenceWithChairDto[];
  }>());

export const getConferencesFailed = createAction('[CONFERENCE] createConferenceFailed',
  props<{
    message: string;
  }>());

export const triggerGetPCMembers = createAction('[CONFERENCE] triggerGetPCMembers',
  props<{
    conferenceDto: ConferenceDto;
  }>());

export const getPCMembersSuccessful = createAction('[CONFERENCE] getPCMembersSuccessful',
  props<{
    members: UserDto[];
  }>());

export const getPCMembersFailed = createAction('[CONFERENCE] getPCMembersFailed',
  props<{
    message: string;
  }>());

export const triggerCreateAssignment = createAction('[CONFERENCE] triggerCreateAssignment',
  props<{
    assignmentDto: AssignmentDto
  }>());

export const createAssignmentSucceeded = createAction('[CONFERENCE] CreateAssignmentSucceeded',
  props<{
    assignmentDto: AssignmentDto
  }>());

export const createAssignmentFailed = createAction('[CONFERENCE] CreateAssignmentFailed',
  props<{
    message: string;
  }>());


export const triggerGetProposals = createAction('[CONFERENCE] triggerGetProposals',
  props<{
    conferenceId: string;
  }>());

export const getProposalsSuccessful = createAction('[CONFERENCE] getProposalsSuccessful',
  props<{
    proposals: ProposalDto[];
  }>());

export const getProposalsFailed = createAction('[CONFERENCE] getProposalsFailed',
  props<{
    message: string;
  }>());

export const triggerGetReviewers = createAction('[CONFERENCE] triggerGetReviewers',
  props<{
    conferenceId: string;
  }>());

export const getReviewersSuccessful = createAction('[CONFERENCE] getReviewersSuccessful',
  props<{
    reviewers: UserDto[];
  }>());

export const getReviewersFailed = createAction('[CONFERENCE] getReviewersFailed',
  props<{
    message: string;
  }>());

export const triggerGetProposalsToReview = createAction('[CONFERENCE] triggerGetProposalsToReview',
  props<{
    reviewerId: string;
  }>());

export const getProposalsToReviewSuccessful = createAction('[CONFERENCE] getProposalsToReviewSuccessful',
  props<{
    proposals: ProposalDto[];
  }>());

export const getProposalsToReviewFailed = createAction('[CONFERENCE] getProposalsToReviewFailed',
  props<{
    message: string;
  }>());

export const triggerCreateEvaluation = createAction('[CONFERENCE] triggerCreateEvaluation',
  props<{
    evaluationDto: EvaluationDto
  }>());

export const triggerUpdateEvaluation = createAction('[CONFERENCE] triggerUpdateEvaluation',
  props<{
    evaluationDto: EvaluationDto
  }>());

export const createEvaluationSucceeded = createAction('[CONFERENCE] createEvaluationSucceeded',
  props<{
    evaluationDto: EvaluationDto
  }>());

export const createEvaluationFailed = createAction('[CONFERENCE] createEvaluationFailed',
  props<{
    message: string;
  }>());

export const updateEvaluationSucceeded = createAction('[CONFERENCE] updateEvaluationSucceeded',
  props<{
    evaluationDto: EvaluationDto
  }>());

export const updateEvaluationFailed = createAction('[CONFERENCE] updateEvaluationFailed',
  props<{
    message: string;
  }>());

export const triggerGetReviews = createAction('[CONFERENCE] triggerGetReviews',
  props<{
    authorId: string;
  }>());

export const getReviewsSuccessful = createAction('[CONFERENCE] getReviewsSuccessful',
  props<{
    reviews: EvaluationWithInfoDto[];
  }>());

export const getReviewsFailed = createAction('[CONFERENCE] getReviewsFailed',
  props<{
    message: string;
  }>());
