import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JRChatDetailPage } from './j-r-chat-detail.page';

describe('JRChatDetailPage', () => {
  let component: JRChatDetailPage;
  let fixture: ComponentFixture<JRChatDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JRChatDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
