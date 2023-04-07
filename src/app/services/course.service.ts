import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [
    {
      title: 'Grundlagen des Maschinellen Lernens',
      status: 'active',
      description: 'Lerne die Grundlagen des Maschinellen Lernens und wende die Inhalte auf zugeschnittene...',
    },
    {
      title: 'Requirements Engineering & Management',
      status: 'active',
      description: 'In diesem Modul geht es um die Erfassung und Aufarbeitung von Kundenanforderungen im...',
    },
  ];

  constructor() {}

  getCourses(): Course[] {
    return this.courses;
  }
}
