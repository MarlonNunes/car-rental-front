import { Component, EventEmitter, Input, Output, booleanAttribute, input } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {

  @Input({required: true}) title: string;
  @Input({transform: booleanAttribute}) hasButton: boolean;
  @Input("textButton") textButton: string;
  @Input({transform: booleanAttribute}) hasIcon: boolean;
  @Input("icon") icon: string;
  @Output("buttonClick") buttonClick = new EventEmitter<void>();

}
