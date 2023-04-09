import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Exam } from 'src/app/interfaces/exam';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exams-overview',
  templateUrl: './exams-overview.component.html',
  styleUrls: ['./exams-overview.component.scss'],
})
export class ExamsOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'date', 'type', 'attempts', 'progress', 'credits', 'difficulty', 'desiredGrade', 'actualGrade'];
  dataSource: MatTableDataSource<Exam>;

  constructor(private examService: ExamService, private router: Router) {
    this.dataSource = new MatTableDataSource(examService.getExams());
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  goToExams() {
    this.router.navigate(['/'])
  }
}
