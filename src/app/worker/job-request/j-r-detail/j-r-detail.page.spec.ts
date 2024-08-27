import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JRDetailPage } from './j-r-detail.page';

describe('JRDetailPage', () => {
  let component: JRDetailPage;
  let fixture: ComponentFixture<JRDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JRDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
