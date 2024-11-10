import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { PromptInputComponent } from '../../components/prompt-input/prompt-input.component';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../models/app.models';
import { AsyncPipe } from '@angular/common';
import { ChatService } from '../../services/chat-service/chat.service';
import { ChatComponent } from '../../components/chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    PromptInputComponent,
    AsyncPipe,
    ChatComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  chat$!: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService, ) {}

  ngOnInit() {
    this.chat$ = this.chatService.chats$;

  }
}
