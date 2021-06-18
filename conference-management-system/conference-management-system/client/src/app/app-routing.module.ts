import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthenticationRouteGuardService} from "./service/authentication-route-guard.service";
import {CreateConferenceComponent} from "./components/pcmember/create-conference/create-conference.component";
import {PCMemberConferenceDashboardComponent} from "./components/pcmember/p-c-member-conference-dashboard/p-c-member-conference-dashboard.component";
import {ConferencePanelComponent} from "./components/pcmember/conference-panel/conference-panel.component";
import {AuthorConferenceDashboardComponent} from "./components/author/author-conference-dashboard/author-conference-dashboard.component";
import {CreateProposalComponent} from "./components/create-proposal/create-proposal.component";
import {PapersToReviewComponent} from "./components/pcmember/papers-to-review/papers-to-review.component";
import {ReviewProposalComponent} from "./components/pcmember/review-proposal/review-proposal.component";
import {ReviewListComponent} from "./components/author/review-list/review-list.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationRouteGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'pcmember/create-conference',
    component: CreateConferenceComponent
  },
  {
    path: 'pcmember/conference-dashboard',
    component: PCMemberConferenceDashboardComponent
  },
  {
    path: 'pcmember/conference-panel/:conferenceId',
    component: ConferencePanelComponent
  },
  {
    path: 'pcmember/papers-to-review',
    component: PapersToReviewComponent
  },
  {
    path: 'pcmember/review/:proposalId',
    component: ReviewProposalComponent
  },
  {
    path: 'author/conference-dashboard',
    component: AuthorConferenceDashboardComponent
  },
  {
    path: 'author/reviews',
    component: ReviewListComponent
  },
  {
    path: 'author/add-proposal/:conferenceId',
    component: CreateProposalComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
