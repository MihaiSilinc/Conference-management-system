import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CacheService} from "../../../service/cache.service";
import {ConferenceDto, ProposalDto, UserDto} from "../../../../api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMPTY, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {
  triggerCreateAssignment, triggerCreateEvaluation,
  triggerGetPCMembers,
  triggerGetProposals,
  triggerGetReviewers
} from "../../../store/action/conference-actions";
import {getPCMembers, getProposals, getReviewers} from "../../../store/selector/conference-selectors";
import {map} from "rxjs/operators";

@Component({
  selector: 'cms-conference-panel',
  templateUrl: './conference-panel.component.html',
  styleUrls: ['./conference-panel.component.css']
})
export class ConferencePanelComponent implements OnInit {

  conference: ConferenceDto;
  addPCMemberForm: FormGroup;
  proposalForm: FormGroup;
  pcmembers$: Observable<UserDto[]>;
  proposals$: Observable<ProposalDto[]>;
  reviewers$: Observable<UserDto[]>;
  unassignedReviewers$: Observable<UserDto[]> = EMPTY;

  displayedColumnsForProposals: string[] = ['name', 'abstract', 'paper', 'author', 'reviewers'];
  displayedColumnsForReviewers: string[] = ['firstName', 'lastName', 'email', 'affiliation'];


  constructor(private route: ActivatedRoute,
              private builder: FormBuilder,
              private store: Store,
              private cacheService: CacheService) {
  }

  ngOnInit(): void {
    let conferenceId = this.route.snapshot.paramMap.get('conferenceId');
    this.conference = this.cacheService.getConferences().find(
      element => element.conferenceDto.id === conferenceId).conferenceDto;

    this.addPCMemberForm = this.builder.group({
        pcmember: ['', [
          Validators.required
        ]],
        designation: ['', [
          Validators.required
        ]],
      }
    );

    this.proposalForm = this.builder.group({
        proposal: ['', [
          Validators.required
        ]],
        reviewer: ['', [
          Validators.required
        ]],
      }
    );

    this.store.dispatch(triggerGetPCMembers({
      conferenceDto: this.conference
    }));

    this.pcmembers$ = this.store.select(getPCMembers)

    this.store.dispatch(triggerGetProposals({
      conferenceId: this.conference.id
    }));

    this.proposals$ = this.store.select(getProposals)

    this.store.dispatch(triggerGetReviewers({
      conferenceId: this.conference.id
    }));

    this.reviewers$ = this.store.select(getReviewers);
  }

  get pcmember(): any {
    return this.addPCMemberForm.get('pcmember');
  }

  get designation(): any {
    return this.addPCMemberForm.get('designation');
  }

  get reviewer(): any {
    return this.proposalForm.get('reviewer');
  }

  get proposal(): any {
    return this.proposalForm.get('proposal');
  }

  addPCMember() {
    this.store.dispatch(triggerCreateAssignment({
      assignmentDto: {
        pcMemberId: this.pcmember.value,
        conferenceId: this.conference.id,
        designation: this.designation.value
      }
    }))
  }

  assignProposalToReviewer() {
    this.store.dispatch(triggerCreateEvaluation({
      evaluationDto: {
        pcMemberId: this.reviewer.value,
        proposalId: this.proposal.value
      }
    }))
  }

  selectedProposal() {
    const selected = this.cacheService.getProposals()
      .find(proposal => proposal.id === this.proposal.value);
    if (!!selected)
      this.unassignedReviewers$ = this.reviewers$.pipe(
        map(reviewers => reviewers.filter(reviewer => !selected.reviewers.find(r => r.id === reviewer.id)))
      );
  }
}
