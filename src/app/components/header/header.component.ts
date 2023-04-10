import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('overviewPage') overviewPage!: ElementRef;
  @ViewChild('studyPage') studyPage!: ElementRef;
  @ViewChild('activityPage') activityPage!: ElementRef;
  @ViewChild('helpPage') helpPage!: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute, private elementRef: ElementRef){}

  switchPage(navigationURL: string) {
    this.router.navigate([navigationURL])
  }

  ngOnInit() {
    this.route.url.subscribe(url => {
      const path = url[0].path;
      const currentPageElement: HTMLLIElement = this.elementRef.nativeElement.querySelectorAll("#" + path)[0];
      console.log(currentPageElement);
      console.log(currentPageElement.classList);
      
      currentPageElement.classList.add("active");
    });
  }

  setActivePage(clickedNavigationButton: HTMLLIElement): void {
    const navigationButtons = this.elementRef.nativeElement.querySelectorAll('li');

    this.switchPage(clickedNavigationButton.id)

    navigationButtons.forEach((btn: HTMLLIElement) => {
      btn.classList.remove('active');
    });
    clickedNavigationButton.classList.add('active');
  }

}
