import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../../environments/environment.development';
import { formatPrompt } from '../../utils/initial-propmt';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  genAi: GoogleGenerativeAI;
  apiKey = environment.genAiKey;
  constructor() {
    this.genAi = new GoogleGenerativeAI(this.apiKey);
  }

  

  async generateText(prompt: string) {
    console.log('recieved prompt', prompt);
    const userPrompt = formatPrompt(prompt);
    const model = this.genAi.getGenerativeModel({ model: 'gemini-1.0-pro' });

    const results = await model.generateContent(userPrompt + prompt); 
    const response = await results.response;
    const text = response.text();

    console.log('text from ai', text);
    return text;
  }
}
