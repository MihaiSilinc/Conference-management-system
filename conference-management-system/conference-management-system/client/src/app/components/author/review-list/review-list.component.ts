import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ConferenceWithChairDto, EvaluationWithInfoDto, UserDto} from "../../../../api";
import {Store} from "@ngrx/store";
import {CacheService} from "../../../service/cache.service";
import {triggerGetReviews} from "../../../store/action/conference-actions";
import {getReviews} from "../../../store/selector/conference-selectors";


@Component({
  selector: 'cms-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews$: Observable<EvaluationWithInfoDto[]>;
  displayedColumns: string[] = ['name', 'reviewer', 'score', 'recommendation'];
  loggedInUser: UserDto;


  constructor(private store: Store,
              private cacheService: CacheService) { }

  ngOnInit(): void {
    this.loggedInUser = this.cacheService.getUser();
    this.store.dispatch(triggerGetReviews({
      authorId: this.cacheService.getUser().id
    }));
    this.reviews$ = this.store.select(getReviews);

  }

}
