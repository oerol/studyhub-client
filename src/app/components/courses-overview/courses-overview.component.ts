import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss']
})
export class CoursesOverviewComponent {
  courses: Course[] = [];
  constructor(private courseService: CourseService, private router: Router, private elementRef: ElementRef) {
    this.courses = courseService.getCourses();
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
}
