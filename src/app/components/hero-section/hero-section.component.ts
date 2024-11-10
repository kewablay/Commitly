import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.sass',
})
export class HeroSectionComponent {
  prompts = [
    {
      tag: 'Prompt',
      description:
        'Improved loading speed of images on the homepage by adding lazy loading.',
    },
    {
      tag: 'Prompt',
      description:
        'Wrote tests for the checkout component to ensure discount logic works.',
    },
    {
      tag: 'Prompt',
      description:
        'Updated documentation to include instructions for running local dev server.',
    },
  ];
}
