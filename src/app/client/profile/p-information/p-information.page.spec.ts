import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PInformationPage } from './p-information.page';

describe('PInformationPage', () => {
  let component: PInformationPage;
  let fixture: ComponentFixture<PInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
