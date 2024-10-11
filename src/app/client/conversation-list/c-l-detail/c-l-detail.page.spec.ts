import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CLDetailPage } from './c-l-detail.page';

describe('CLDetailPage', () => {
  let component: CLDetailPage;
  let fixture: ComponentFixture<CLDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CLDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
