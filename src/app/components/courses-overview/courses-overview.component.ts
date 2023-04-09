import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss']
})
export class CoursesOverviewComponent implements AfterViewInit {
  courses: Course[] = [];
  showRightScroll: boolean = false;
  @ViewChild('courseList') courseList!: ElementRef<HTMLElement>;
  @ViewChild('scrollRight') scrollRight!: ElementRef<HTMLElement>;

  constructor(private courseService: CourseService, private router: Router, private elementRef: ElementRef) {
    this.courses = courseService.getCourses();
  }

  ngAfterViewInit(): void {
    const courseListWidth = this.courseList.nativeElement.offsetWidth;
    const scrollRightWidth = this.scrollRight.nativeElement.offsetWidth;
    this.scrollRight.nativeElement.style.transform = `translateX(${courseListWidth - scrollRightWidth}px)`;
  }

  setActiveButton(button: HTMLButtonElement): void {
    const buttons = this.elementRef.nativeElement.querySelectorAll('button');
    console.log(this.elementRef.nativeElement);
    
    buttons.forEach((btn: HTMLButtonElement) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }

  goToCourses() {
    this.router.navigate(['/']);
  }

  onMouseOver(e: MouseEvent) {
    this.scrollRight.nativeElement.style.opacity = "1"
  }
  onMouseLeave(e: MouseEvent) {
    this.scrollRight.nativeElement.style.opacity = "0"
  }

  scrollToTheRight() {
    const courseListScrollWidth = this.courseList.nativeElement.scrollWidth;
    this.courseList.nativeElement.scroll({left: courseListScrollWidth, behavior: 'smooth'})
  }
}
