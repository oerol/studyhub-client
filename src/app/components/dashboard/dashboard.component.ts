import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentPage: string = "";
  constructor(private route: ActivatedRoute) {}

  
  ngOnInit() {
    this.route.url.subscribe(url => {
      const path = url[0].path;
      if (path === 'dashboard') {
        this.currentPage = 'dashboard';
      } else if (path === 'study') {
        this.currentPage = 'study';
      }
    });
    console.log(this.currentPage);
    
  }
}
