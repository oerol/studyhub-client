import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

const ELEMENT_DATA: any[] = [
  {name: "Grundlagen des Maschinellen Lernens", date: "16.05.2023", type: 'Multiple-choice', attempts: 0, progress: 80, credits: 9, difficulty: "high", desiredGrade: "1.7", actualGrade: ""},
  {name: "Requirements Engineering & Management", date: "16.05.2023", type: 'Multiple-choice', attempts: 0, progress: 80, credits: 9, difficulty: "high", desiredGrade: "1.7", actualGrade: ""},
  {name: "Englisch C2", date: "16.05.2023", type: 'Multiple-choice', attempts: 0, progress: 80, credits: 9, difficulty: "high", desiredGrade: "1.7", actualGrade: ""},

];

@Component({
  selector: 'app-exams-overview',
  templateUrl: './exams-overview.component.html',
  styleUrls: ['./exams-overview.component.scss']
})
export class ExamsOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'date', 'type', 'attempts', 'progress', 'credits', 'difficulty', 'desiredGrade', 'actualGrade'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
