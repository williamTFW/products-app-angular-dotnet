import { Component, input } from '@angular/core';

@Component({
  selector: 'title-page',
  imports: [],
  templateUrl: './title-page.component.html',
})
export class TitlePageComponent {
  public titlePage = input.required<string>();
}
