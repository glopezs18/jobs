import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLocationPage } from './p-location.page';

describe('PLocationPage', () => {
  let component: PLocationPage;
  let fixture: ComponentFixture<PLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
