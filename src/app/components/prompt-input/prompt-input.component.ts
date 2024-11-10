import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
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
  constructor() {
    this.promptForm = new FormGroup({
      prompt: new FormControl('', [Validators.required]),
    });
  }

  submitPrompt() {
    if (this.promptForm.valid) {
      this.isLoading = true;
      console.log(this.promptForm.value);
    }
  
  }

  ngOnInit() {}
}
