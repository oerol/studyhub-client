import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}
  toLogin() {
    this.router.navigate(['/login']);
  }
  toRegister() {
    this.router.navigate(['/register']);

  }
  toDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
