import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HWorkerPage } from './h-worker.page';

describe('HWorkerPage', () => {
  let component: HWorkerPage;
  let fixture: ComponentFixture<HWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
