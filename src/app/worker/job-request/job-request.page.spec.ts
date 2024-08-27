import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobRequestPage } from './job-request.page';

describe('JobRequestPage', () => {
  let component: JobRequestPage;
  let fixture: ComponentFixture<JobRequestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
