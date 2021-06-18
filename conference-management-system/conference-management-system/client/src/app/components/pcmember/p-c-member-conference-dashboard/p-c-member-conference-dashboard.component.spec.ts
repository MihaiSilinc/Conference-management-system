import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCMemberConferenceDashboardComponent } from './p-c-member-conference-dashboard.component';

describe('PCMemberConferenceDashboardComponent', () => {
  let component: PCMemberConferenceDashboardComponent;
  let fixture: ComponentFixture<PCMemberConferenceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PCMemberConferenceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PCMemberConferenceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
