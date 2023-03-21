import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'studyhub';
  constructor(private userService: UserService) { }

  public onClick() {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
    })
  }
}
