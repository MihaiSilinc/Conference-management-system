import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
// @ts-ignore
import {ConferenceWithChairDto, UserDto} from "../../../../api";
import {triggerGetConferences} from "../../../store/action/conference-actions";
import {Observable} from "rxjs";
import {getConferences} from "../../../store/selector/conference-selectors";
import {CacheService} from "../../../service/cache.service";


@Component({
  selector: 'cms-p-c-member-conference-dashboard',
  templateUrl: './p-c-member-conference-dashboard.component.html',
  styleUrls: ['./p-c-member-conference-dashboard.component.css']
})
export class PCMemberConferenceDashboardComponent implements OnInit {

  conferences$: Observable<ConferenceWithChairDto[]>;
  displayedColumns: string[] = ['conferenceName', 'abstractDeadline', 'callForPapers', 'startingDate', 'endingDate', 'contol-panel'];
  loggedInUser: UserDto;

  constructor(private store: Store,
              private cacheService: CacheService,
              private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(triggerGetConferences());
    this.conferences$ = this.store.select(getConferences);
    this.loggedInUser = this.cacheService.getUser();
  }

  routeToConferencePanel(id: string): void {
    this.router.navigate(["/pcmember/conference-panel", id])
  }
}
