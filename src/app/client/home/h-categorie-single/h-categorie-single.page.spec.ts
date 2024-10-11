import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HCategorieSinglePage } from './h-categorie-single.page';

describe('HCategorieSinglePage', () => {
  let component: HCategorieSinglePage;
  let fixture: ComponentFixture<HCategorieSinglePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HCategorieSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
