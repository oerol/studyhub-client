import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-status',
  templateUrl: './course-status.component.html',
  styleUrls: ['./course-status.component.scss']
})
export class CourseStatusComponent {
  @Input() status = "";
}
