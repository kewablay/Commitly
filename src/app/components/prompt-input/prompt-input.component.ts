import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GeminiService } from '../../services/gemini-service/gemini.service';
import { ChatService } from '../../services/chat-service/chat.service';
@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.sass',
})
export class PromptInputComponent {
  promptForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private geminiService: GeminiService,
    private chatService: ChatService
  ) {
    this.promptForm = new FormGroup({
      prompt: new FormControl('', [Validators.required]),
    });
  }

  submitPrompt() {
    if (this.promptForm.valid) {
      this.isLoading = true;
      this.chatService.updateChatLoading(true);
      console.log(this.promptForm.value);
      const { prompt } = this.promptForm.value;
      this.promptForm.reset();

      // add users message to chats
      this.chatService.addUserMessage(prompt);

      this.geminiService
        .generateText(prompt)
        .then((text) => {
          this.chatService.addAIResponse(text);
          this.isLoading = false;
          this.chatService.updateChatLoading(false);
          this.promptForm.reset();
        })
        .catch((error) => {
          this.isLoading = false;
          this.chatService.updateChatLoading(false);
          this.chatService.updateChatError(error);
          console.error("error: ",error);
        });
    }
  }

  ngOnInit() {}
}
