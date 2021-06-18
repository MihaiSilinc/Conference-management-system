import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {triggerCreateConference} from "../../../store/action/conference-actions";
import {CacheService} from "../../../service/cache.service";

@Component({
  selector: 'cms-create-conference',
  templateUrl: './create-conference.component.html',
  styleUrls: ['./create-conference.component.css']
})
export class CreateConferenceComponent implements OnInit {

  conferenceForm: FormGroup

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private cacheService: CacheService
  ) {
  }

  ngOnInit(): void {
    this.conferenceForm = this.builder.group({
        conferenceName: ['', [
          Validators.required
        ]],
        abstractDeadline: ['', [
          Validators.required
        ]],
        callForPapers: ['', [
          Validators.required
        ]],
        startingDate: ['', [
          Validators.required
        ]],
        endingDate: ['', [
          Validators.required
        ]]
      }
    );
  }

  get conferenceName(): any {
    return this.conferenceForm.get('conferenceName');
  }

  get abstractDeadline(): any {
    return this.conferenceForm.get('abstractDeadline');
  }

  get callForPapers(): any {
    return this.conferenceForm.get('callForPapers');
  }

  get startingDate(): any {
    return this.conferenceForm.get('startingDate');
  }

  get endingDate(): any {
    return this.conferenceForm.get('endingDate');
  }

  public createConference(): void {
    this.store.dispatch(triggerCreateConference({
      userId: this.cacheService.getUser().id,
      conferenceDto: {
        id: '',
        name: this.conferenceName.value,
        abstractDeadline: this.abstractDeadline.value,
        callForPapers: this.callForPapers.value,
        startingDate: this.startingDate.value,
        endingDate: this.startingDate.value
      }
    }))
  }

}
