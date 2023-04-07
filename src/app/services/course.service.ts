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
    {
      title: 'Englisch C2',
      status: 'active',
      description: 'Die Inhalte von Englisch C2 dienen dazu, ein tiefgehendes Verständis der Grammatik...',
    },
    {
      title: 'Unternehmensberatung',
      status: 'active',
      description: 'Das Modul Unternehmensberatung bietet einen Überblick über Beratungsprozesse, Methoden...',
    },
    {
      title: 'Einführung in die Betriebswirtschaftslehre',
      status: 'archived',
      description: 'EBWL vermittelt grundlegende Konzepte und Prinzipien der BWL, einschließlich Finanzen...',
    },
    {
      title: 'Datenbankmanagementsysteme',
      status: 'archived',
      description: 'DBMS sind Softwareanwendungen zur Organisation und Verwaltung von Datenbanken und helfen...',
    },
  ];

  constructor() {}

  getCourses(): Course[] {
    return this.courses;
  }
}
