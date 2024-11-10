import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChatMessage } from '../../models/app.models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatSubject = new BehaviorSubject<ChatMessage[]>([]);
  private chatLoadingSubject = new BehaviorSubject<boolean>(false);
  private chatErrorSubject = new BehaviorSubject<any>(null);

  chats$ = this.chatSubject.asObservable();
  chatLoading$ = this.chatLoadingSubject.asObservable();
  chatError$ = this.chatLoadingSubject.asObservable();

  constructor() {}

  // Add user message to chat
  addUserMessage(content: string) {
    console.log('received user message', content);
    const currentChats = this.chatSubject.value;
    const newMessage: ChatMessage = {
      content,
      isUser: true,
      timestamp: new Date(),
    };
    this.chatSubject.next([...currentChats, newMessage]);
    console.log('updated chats subject: ', this.chatSubject.value);
  }

  // Add an AI response to chat
  addAIResponse(content: string) {
    console.log('received ai response', content);
    const currentChats = this.chatSubject.value;
    const newMessage: ChatMessage = {
      content,
      isUser: false,
      timestamp: new Date(),
    };
    this.chatSubject.next([...currentChats, newMessage]);
    console.log('updated chats subject: ', this.chatSubject.value);
  }

  updateChatLoading(loading: boolean) {
    this.chatLoadingSubject.next(loading);
  }

  updateChatError(error: any) {
    this.chatErrorSubject.next(error);
  }

  // Clear all chats
  clearChats() {
    this.chatSubject.next([]);
  }
}
