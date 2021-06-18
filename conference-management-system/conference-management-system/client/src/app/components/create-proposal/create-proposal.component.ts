import {Component, Injectable, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {PaperService} from "../../service/paper.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CacheService} from "../../service/cache.service";
import {RoutingConstants} from "../../util/routing-constants";

@Component({
  selector: 'cms-paper-upload',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})

@Injectable()
export class CreateProposalComponent implements OnInit {
  paper: File = null;
  proposalForm = this.fb.group({
    name: ["", Validators.required],
    abstractParagraph: ["", Validators.required]
  });

  constructor(
    private paperService: PaperService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  upload() {
    const conferenceId = this.route.snapshot.paramMap.get('conferenceId');
    this.paperService.uploadPaper(this.name.value, this.abstractParagraph.value, this.paper, conferenceId,
      this.cacheService.getUser().id).subscribe(
      event=>{
        if(event instanceof HttpResponse){
          if(event.status == 200) {
            alert('File successfully Uploaded');
            this.router.navigate([RoutingConstants.AUTHOR_CONFERENCE_PAGE])
          }
        }
        this.paper = null;
      }
    )

  }

  get name() {
    return this.proposalForm.get('name');
  }

  get abstractParagraph() {
    return this.proposalForm.get('abstractParagraph');
  }

  changedPaper(event) {
    this.paper = event.target.files[0];
  }

}
