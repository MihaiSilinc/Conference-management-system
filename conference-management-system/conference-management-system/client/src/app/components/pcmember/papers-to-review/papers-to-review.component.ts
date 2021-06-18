import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
// @ts-ignore
import {ConferenceWithChairDto, ProposalDto, UserDto} from "../../../../api";
import {Store} from "@ngrx/store";
import {CacheService} from "../../../service/cache.service";
import {ActivatedRoute, Router} from "@angular/router";
import {triggerGetConferences, triggerGetProposalsToReview} from "../../../store/action/conference-actions";
import {getConferences, getProposalsToReview} from "../../../store/selector/conference-selectors";

@Component({
  selector: 'cms-papers-to-review',
  templateUrl: './papers-to-review.component.html',
  styleUrls: ['./papers-to-review.component.css']
})
export class PapersToReviewComponent implements OnInit {

  proposalsToReview$: Observable<ProposalDto[]>;
  displayedColumns: string[] = ['name', 'abstract', 'paper', 'author', 'reviewButton'];
  loggedInUser: UserDto;


  constructor(private store: Store,
              private cacheService: CacheService,
              private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser = this.cacheService.getUser()
    this.store.dispatch(triggerGetProposalsToReview({
      reviewerId: this.loggedInUser.id
    }));
    this.proposalsToReview$ = this.store.select(getProposalsToReview);

  }

  routeToReviewPaper(proposalId: string) {
    this.router.navigate(["/pcmember/review", proposalId]);
  }
}
