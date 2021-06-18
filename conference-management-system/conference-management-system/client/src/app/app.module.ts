import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ApiModule} from "../api";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './components/register/register.component';
import {AppRoutingModule} from "./app-routing.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {metaReducers, reducers} from "./store/reducer/app-reducers";
import {effects} from "./store/effect/all-app-effects";
import {HomeComponent} from './components/home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {CreateProposalComponent} from './components/create-proposal/create-proposal.component';
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {CustomInterceptor} from "./service/interceptor.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {AuthorConferenceDashboardComponent} from './components/author/author-conference-dashboard/author-conference-dashboard.component';
import {CreateConferenceComponent} from "./components/pcmember/create-conference/create-conference.component";
import {ConferencePanelComponent} from "./components/pcmember/conference-panel/conference-panel.component";
import {PaperDownloadComponent} from "./components/paper-download/paper-download.component";
import {PCMemberConferenceDashboardComponent} from "./components/pcmember/p-c-member-conference-dashboard/p-c-member-conference-dashboard.component";
import { PapersToReviewComponent } from './components/pcmember/papers-to-review/papers-to-review.component';
import { ReviewProposalComponent } from './components/pcmember/review-proposal/review-proposal.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ReviewListComponent } from './components/author/review-list/review-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateProposalComponent,
    PaperDownloadComponent,
    CreateConferenceComponent,
    PCMemberConferenceDashboardComponent,
    ConferencePanelComponent,
    AuthorConferenceDashboardComponent,
    PapersToReviewComponent,
    ReviewProposalComponent,
    ReviewListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatTabsModule,
    ApiModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    MatOptionModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
