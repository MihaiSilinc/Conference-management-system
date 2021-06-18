import { Injectable } from '@angular/core';
import {getLoggedInUser} from "../store/selector/login-selectors";
import {ConferenceWithChairDto, ProposalDto, UserDto} from "../../api";
import {Store} from "@ngrx/store";
import {getConferences, getProposals, getProposalsToReview} from "../store/selector/conference-selectors";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private user: UserDto;
  private conferences: ConferenceWithChairDto[];
  private proposalsToReview: ProposalDto[];
  private proposals: ProposalDto[];

  constructor(private store: Store) {
    this.store.select(getLoggedInUser).subscribe(
      user => this.user = user);
    this.store.select(getConferences).subscribe(
      conferences => this.conferences = conferences);
    this.store.select(getProposalsToReview).subscribe(
      proposals => this.proposalsToReview = proposals);
    this.store.select(getProposals).subscribe(
      proposals => this.proposals = proposals);
  }

  getUser(): UserDto {
    return this.user;
  }

  getConferences(): ConferenceWithChairDto[] {
    return this.conferences;
  }

  getProposalsToReview(): ProposalDto[]{
    return this.proposalsToReview;
  }

  getProposals(): ProposalDto[]{
    return this.proposals;
  }
}
