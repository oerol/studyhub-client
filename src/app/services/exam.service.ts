import { Injectable } from '@angular/core';
import { Exam } from '../interfaces/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  exams: Exam[] = [
    {name: "Grundlagen des Maschinellen Lernens", date: "16.05.2023", type: 'Multiple-choice', attempts: 0, progress: 80, credits: 9, difficulty: "high", desiredGrade: "1.7", actualGrade: ""},
    {name: "Requirements Engineering & Management", date: "16.05.2023", type: 'Multiple-choice', attempts: 0, progress: 80, credits: 9, difficulty: "high", desiredGrade: "1.7", actualGrade: ""},
    {name: "Englisch C2", date: "16.05.2023", type: 'Multiple-choice', attempts: 0, progress: 80, credits: 9, difficulty: "high", desiredGrade: "1.7", actualGrade: ""},
  ];
  constructor() { }

  getExams(): Exam[] {
    return this.exams;
  }
}
