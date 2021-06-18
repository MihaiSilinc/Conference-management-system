import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorConferenceDashboardComponent } from './author-conference-dashboard.component';

describe('AuthorConferenceDashboardComponent', () => {
  let component: AuthorConferenceDashboardComponent;
  let fixture: ComponentFixture<AuthorConferenceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorConferenceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorConferenceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
