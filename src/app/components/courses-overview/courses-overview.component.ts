import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss'],
})
export class CoursesOverviewComponent implements AfterViewInit {
  courses: Course[] = []; /* courses visible to the user */
  allCourses: Course[] = []; /* all retrieved courses */
  showLeftScroll: boolean = false;
  showRightScroll: boolean = true;
  showScroller: boolean = false;
  @ViewChild('courseList') courseList!: ElementRef<HTMLElement>;
  @ViewChild('scrollRight') scrollRight!: ElementRef<HTMLElement>;
  @ViewChild('scrollLeft') scrollLeft!: ElementRef<HTMLElement>;
  @ViewChild('recentButton') firstButton!: ElementRef<HTMLElement>;
  @ViewChild('viewSwitcherIndicator') viewSwitcherIndicator!: ElementRef<HTMLElement>;



  constructor(private courseService: CourseService, private router: Router, private elementRef: ElementRef) {
    this.allCourses = courseService.getCourses();
    this.courses = [...this.allCourses];

    this.handleScrollers();
  }

  ngAfterViewInit(): void {
    const courseListWidth = this.courseList.nativeElement.offsetWidth;
    const scrollRightWidth = this.scrollRight.nativeElement.offsetWidth;
    this.scrollRight.nativeElement.style.transform = `translateX(${courseListWidth - scrollRightWidth}px)`;

    this.viewSwitcherIndicator.nativeElement.style.width = `${this.firstButton.nativeElement.clientWidth}px`;
  }

  filterCourses(filter: 'recent' | 'active' | 'archived') {
    if (filter === 'recent') {
      this.courses = [...this.allCourses];
    } else {
      let filteredCourses: Course[] = [];

      this.allCourses.forEach((course) => {
        if (course.status === filter) {
          filteredCourses.push(course);
        }
      });

      this.courses = [...filteredCourses];
    }
    this.handleScrollers();
  }

  setActiveButton(button: HTMLButtonElement): void {
    const buttons = this.elementRef.nativeElement.querySelectorAll('button');
    const newPosition = button.offsetLeft - button.parentElement!.offsetLeft;

    this.viewSwitcherIndicator.nativeElement.style.width = `${button.clientWidth}px`;
    this.viewSwitcherIndicator.nativeElement.style.transform = `translateX(${newPosition}px)`;

    this.filterCourses(button.id as 'recent' | 'active' | 'archived');

    buttons.forEach((btn: HTMLButtonElement) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }

  goToCourses() {
    this.router.navigate(['/']);
  }

  handleScrollers() {
    const containedCourses = 5;
    console.log(this.courses.length);
    
    if (this.courses.length > containedCourses) {
      this.showScroller = true;
    } else {
      this.showScroller = false;
    }
  }

  handleScroller(scroller: ElementRef, show: boolean) {
    if (show) {
      scroller.nativeElement.style.opacity = '1';
    } else {
      scroller.nativeElement.style.opacity = '0';
    }
  }

  onMouseOver(e: MouseEvent) {
    if (this.showScroller) {
      this.handleScroller(this.scrollRight, this.showRightScroll);
      this.handleScroller(this.scrollLeft, this.showLeftScroll);
    }
  }
  onMouseLeave(e: MouseEvent) {
    if (this.showScroller) {
      this.handleScroller(this.scrollRight, false);
      this.handleScroller(this.scrollLeft, false);
    }
  }

  scrollToTheRight() {
    const courseListScrollWidth = this.courseList.nativeElement.scrollWidth;
    this.courseList.nativeElement.scroll({ left: courseListScrollWidth, behavior: 'smooth' });
    this.showRightScroll = false;
    this.showLeftScroll = true;
    this.handleScroller(this.scrollRight, false);
  }
  scrollToTheLeft() {
    this.courseList.nativeElement.scroll({ left: 0, behavior: 'smooth' });
    this.showLeftScroll = false;
    this.showRightScroll = true;
    this.handleScroller(this.scrollLeft, false);
  }
}
