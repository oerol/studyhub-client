import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss']
})
export class CoursesOverviewComponent {
  constructor(private elementRef: ElementRef) {}

  setActiveButton(button: HTMLButtonElement): void {
    const buttons = this.elementRef.nativeElement.querySelectorAll('button');
    console.log(this.elementRef.nativeElement);
    
    buttons.forEach((btn: HTMLButtonElement) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }

}
