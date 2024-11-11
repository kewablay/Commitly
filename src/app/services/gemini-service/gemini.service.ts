import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../../environments/environment.development';
import { getSystemInstructions } from '../../utils/system-instructions';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  genAi: GoogleGenerativeAI;
  apiKey = environment.genAiKey;
  generationConfig = {
    temperature: 0.8,
    topP: 0.95,
    topK: 25,
    maxOutputTokens: 2048,
  };

  constructor() {
    this.genAi = new GoogleGenerativeAI(this.apiKey);
  }

  async generateText(prompt: string) {
    console.log('recieved prompt', prompt);
    const model = this.genAi.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const results = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: this.generationConfig,
      systemInstruction: getSystemInstructions(),
    });
    const response = await results.response;
    const text = response.text();

    console.log('text from ai', text);
    return text;
  }

}
