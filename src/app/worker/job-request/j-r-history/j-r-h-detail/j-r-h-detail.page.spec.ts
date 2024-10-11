import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JRHDetailPage } from './j-r-h-detail.page';

describe('JRHDetailPage', () => {
  let component: JRHDetailPage;
  let fixture: ComponentFixture<JRHDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JRHDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
