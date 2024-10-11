import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesListPage } from './services-list.page';

describe('ServicesListPage', () => {
  let component: ServicesListPage;
  let fixture: ComponentFixture<ServicesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
