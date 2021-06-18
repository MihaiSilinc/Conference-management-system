import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {PaperResourceService, ProposalDto} from "../../../../api";
import {Store} from "@ngrx/store";
import {CacheService} from "../../../service/cache.service";
import {ActivatedRoute} from "@angular/router";
import * as fileSaver from 'file-saver'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {triggerUpdateEvaluation} from "../../../store/action/conference-actions";

@Component({
  selector: 'cms-review-paper',
  templateUrl: './review-proposal.component.html',
  styleUrls: ['./review-proposal.component.css']
})
export class ReviewProposalComponent implements OnInit {

  proposal: ProposalDto;
  reviewForm: FormGroup;

  constructor(private store: Store,
              private route: ActivatedRoute,
              private paperResourceService: PaperResourceService,
              private builder: FormBuilder,
              private cacheService: CacheService) { }

  ngOnInit(): void {
    const proposalId = this.route.snapshot.paramMap.get("proposalId");
    this.proposal = this.cacheService.getProposalsToReview().find( (proposal) => proposal.id === proposalId );

    this.reviewForm = this.builder.group({
        score: ['', [
          Validators.required
        ]],
        suggestion: ['', [
          Validators.required
        ]],
    });

  }

  download(){
    this.paperResourceService.downloadPaper(this.proposal.paperName).subscribe(data => {
      if(data){
        fileSaver.saveAs(this.returnBlob(data), this.proposal.paperName)
      }
    });
  }

  returnBlob(resource): Blob{
    console.log("File downloaded")
    return new Blob([resource], {type: 'application/pdf'})
  }

  get score(): any {
    return this.reviewForm.get('score');
  }

  get suggestion(): any {
    return this.reviewForm.get('suggestion');
  }

  public reviewProposal(): void {
    this.store.dispatch(triggerUpdateEvaluation({
      evaluationDto: {
        pcMemberId: this.cacheService.getUser().id,
        proposalId: this.proposal.id,
        evaluationScore: this.score.value,
        recommendation: this.suggestion.value
      }
    }))
  }
}
