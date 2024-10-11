import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversationListPage } from './conversation-list.page';

describe('ConversationListPage', () => {
  let component: ConversationListPage;
  let fixture: ComponentFixture<ConversationListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
