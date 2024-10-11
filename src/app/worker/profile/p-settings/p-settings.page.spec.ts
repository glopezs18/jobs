import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PSettingsPage } from './p-settings.page';

describe('PSettingsPage', () => {
  let component: PSettingsPage;
  let fixture: ComponentFixture<PSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
