import { Component, Input, SecurityContext } from '@angular/core';
import { ChatMessage } from '../../models/app.models';
import { AsyncPipe, DatePipe } from '@angular/common';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { AvatarModule } from 'primeng/avatar';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat-service/chat.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DatePipe, AvatarModule, AsyncPipe, SkeletonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass',
})
export class ChatComponent {
  @Input() chats: ChatMessage[] = [];
  chatLoading$!: Observable<boolean>;
  chatError$!: Observable<any>;

  constructor(
    private sanitizer: DomSanitizer,
    private chatService: ChatService
  ) {
    // Configure marked with highlight.js
    marked.use(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, {
                language: lang,
                ignoreIllegals: true,
              }).value;
            } catch (err) {
              console.log(err);
            }
          }
          return hljs.highlightAuto(code).value;
        },
      })
    );

    // Additional marked options
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Add <br> on single line breaks
      pedantic: false,
    });
  }

  parseMarkdown(content: string): string {
    try {
      // Parse markdown and sanitize the output
      const parsed = marked(content);
      return this.sanitizer.sanitize(SecurityContext.HTML, parsed) || '';
    } catch (err) {
      console.error('Error parsing markdown:', err);
      return content;
    }
  }

  ngOnInit() {
    this.chatLoading$ = this.chatService.chatLoading$;
    this.chatError$ = this.chatService.chatError$
  }
}
