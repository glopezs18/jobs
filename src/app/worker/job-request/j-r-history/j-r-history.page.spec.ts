import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JRHistoryPage } from './j-r-history.page';

describe('JRHistoryPage', () => {
  let component: JRHistoryPage;
  let fixture: ComponentFixture<JRHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JRHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
