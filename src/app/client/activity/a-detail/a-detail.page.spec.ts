import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ADetailPage } from './a-detail.page';

describe('ADetailPage', () => {
  let component: ADetailPage;
  let fixture: ComponentFixture<ADetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ADetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
