import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnChanges {
  @Input() text = "";
  @Input() loading = false;
  @ViewChild('button') buttonElement!: ElementRef;


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['loading'].firstChange) {
      const isLoading = changes['loading'].currentValue;
      this.handleButton(isLoading);
    }
  }

  handleButton(showLoader: boolean) {
    const element = this.buttonElement.nativeElement;
    
    const textElement = element.children[0] as HTMLSpanElement;
    const loadingElement = element.children[1] as HTMLDivElement;

    if (showLoader) {
      textElement.style.display = "none";
      loadingElement.style.display = "flex";
    } else {
      loadingElement.style.display = "none";
      textElement.style.display = "block";
    }
  }
}
