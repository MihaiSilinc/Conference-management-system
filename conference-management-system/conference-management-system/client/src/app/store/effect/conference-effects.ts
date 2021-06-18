import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {
  AssignmentService,
  ConferenceResourceService,
  EvaluationService,
  PaperResourceService,
  UserResourceService
} from "../../../api";
import {Router} from "@angular/router";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {RoutingConstants} from "../../util/routing-constants";
import {
  createAssignmentFailed,
  createAssignmentSucceeded,
  createConferenceFailed,
  createConferenceSucceeded,
  createEvaluationFailed,
  createEvaluationSucceeded,
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
  getReviewsFailed,
  getReviewsSuccessful,
  triggerCreateAssignment,
  triggerCreateConference,
  triggerCreateEvaluation,
  triggerGetConferences,
  triggerGetPCMembers,
  triggerGetProposals,
  triggerGetProposalsToReview,
  triggerGetReviewers,
  triggerGetReviews, triggerUpdateEvaluation, updateEvaluationFailed, updateEvaluationSucceeded
} from "../action/conference-actions";
import {Store} from "@ngrx/store";
import {getProposals} from "../selector/conference-selectors";

@Injectable()
export class ConferenceEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private conferenceService: ConferenceResourceService,
    private assignmentService: AssignmentService,
    private userService: UserResourceService,
    private paperService: PaperResourceService,
    private evaluationService: EvaluationService,
    private router: Router
  ) {
  }

  triggerCreateConference$ = createEffect(() => this.actions$.pipe(
    ofType(triggerCreateConference),
    switchMap(action => this.conferenceService.createConference(action.userId, action.conferenceDto).pipe(
      map(conferenceDto => createConferenceSucceeded({conferenceDto})),
      catchError(error => of(createConferenceFailed({message: error.message})))
    ))
  ));

  createConferenceSucceeded$ = createEffect(() => this.actions$.pipe(
    ofType(createConferenceSucceeded),
    tap(() => this.router.navigate([RoutingConstants.PC_MEMBER_CONFERENCE_PAGE]))
  ), {dispatch: false});

  triggerGetConferences$ = createEffect(() => this.actions$.pipe(
    ofType(triggerGetConferences),
    switchMap(() => this.conferenceService.getConferences().pipe(
      map(conferences => getConferencesSuccessful({conferences})),
      catchError(error => of(getConferencesFailed({message: error.message})))
    ))
  ));

  triggerCreateAssignment$ = createEffect(() => this.actions$.pipe(
    ofType(triggerCreateAssignment),
    switchMap(action => this.assignmentService.createAssignment(action.assignmentDto).pipe(
      map(assignmentDto => createAssignmentSucceeded({assignmentDto})),
      catchError(error => of(createAssignmentFailed({message: error.message})))
    ))
  ));

  triggerGetPCMembers$ = createEffect(() => this.actions$.pipe(
    ofType(triggerGetPCMembers),
    switchMap(action => this.userService.getPCMembersNotAlreadyAssigned(action.conferenceDto).pipe(
      map(members => getPCMembersSuccessful({members})),
      catchError(error => of(getPCMembersFailed({message: error.message})))
    ))
  ));

  triggerGetProposals$ = createEffect(() => this.actions$.pipe(
    ofType(triggerGetProposals),
    switchMap(action => this.paperService.getProposalsForConference(action.conferenceId).pipe(
      map(proposals => getProposalsSuccessful({proposals})),
      catchError(error => of(getProposalsFailed({message: error.message})))
    ))
  ));

  triggerGetReviewers$ = createEffect(() => this.actions$.pipe(
    ofType(triggerGetReviewers),
    switchMap(action => this.userService.getReviewersForConference(action.conferenceId).pipe(
      map(reviewers => getReviewersSuccessful({reviewers})),
      catchError(error => of(getReviewersFailed({message: error.message})))
    ))
  ));


  triggerGetProposalsToReview$ = createEffect(() => this.actions$.pipe(
    ofType(triggerGetProposalsToReview),
    switchMap(action => this.evaluationService.getAllProposalsForReviewer(action.reviewerId).pipe(
      map(proposals => getProposalsToReviewSuccessful({proposals})),
      catchError(error => of(getProposalsToReviewFailed({message: error.message})))
    ))
  ));

  triggerCreateEvaluation$ = createEffect(() => this.actions$.pipe(
    ofType(triggerCreateEvaluation),
    switchMap(action => this.evaluationService.createEvaluation(action.evaluationDto).pipe(
      map(evaluationDto => createEvaluationSucceeded({evaluationDto})),
      catchError(error => of(createEvaluationFailed({message: error.message})))
    ))
  ));

  createEvaluationSucceeded$ = createEffect(() => this.actions$.pipe(
    ofType(createEvaluationSucceeded),
    concatLatestFrom(() => this.store.select(getProposals)),
    map(([action, proposals]) => triggerGetProposals({
      conferenceId: proposals.find(prop => prop.id === action.evaluationDto.proposalId).conferenceId
    }))
  ))

  triggerUpdateEvaluation$ = createEffect(() => this.actions$.pipe(
    ofType(triggerUpdateEvaluation),
    switchMap(action => this.evaluationService.updateEvaluation(action.evaluationDto).pipe(
      map(evaluationDto => updateEvaluationSucceeded({evaluationDto})),
      catchError(error => of(updateEvaluationFailed({message: error.message})))
    ))
  ));

  triggerGetReviews$ = createEffect(() => this.actions$.pipe(
    ofType(triggerGetReviews),
    switchMap(action => this.evaluationService.getEvaluationsForAuthor(action.authorId).pipe(
      map(reviews => getReviewsSuccessful({reviews})),
      catchError(error => of(getReviewsFailed({message: error.message})))
    ))
  ));

}
