import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {
  @Input() text = "";
  
  handleButtonClick(element: HTMLElement ) {
    const textElement = element.children[0] as HTMLSpanElement;
    const loadingElement = element.children[1] as HTMLDivElement;
    textElement.style.display = "none";
    loadingElement.style.display = "flex";
    setTimeout(() => {
      loadingElement.style.display = "none";
      textElement.style.display = "block";
    }, 2000);
    
  }
}
