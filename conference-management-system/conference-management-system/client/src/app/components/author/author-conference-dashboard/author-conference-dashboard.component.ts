import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ConferenceWithChairDto} from "../../../../api";
import {Store} from "@ngrx/store";
import {CacheService} from "../../../service/cache.service";
import {Router} from "@angular/router";
import {triggerGetConferences} from "../../../store/action/conference-actions";
import {getConferences} from "../../../store/selector/conference-selectors";

@Component({
  selector: 'cms-author-conference-dashboard',
  templateUrl: './author-conference-dashboard.component.html',
  styleUrls: ['./author-conference-dashboard.component.css']
})
export class AuthorConferenceDashboardComponent implements OnInit {

  conferences$: Observable<ConferenceWithChairDto[]>;
  displayedColumns: string[] = ['conferenceName', 'abstractDeadline', 'callForPapers', 'startingDate', 'endingDate', 'add-proposal'];

  constructor(private store: Store,
              private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(triggerGetConferences());
    this.conferences$ = this.store.select(getConferences);
  }

  routeToAddProposal(id: string): void {
    this.router.navigate(["/author/add-proposal", id])
  }

}
