import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JRChatListPage } from './j-r-chat-list.page';

describe('JRChatListPage', () => {
  let component: JRChatListPage;
  let fixture: ComponentFixture<JRChatListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JRChatListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
