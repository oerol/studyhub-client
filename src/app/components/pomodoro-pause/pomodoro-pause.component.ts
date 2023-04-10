import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pomodoro-pause',
  templateUrl: './pomodoro-pause.component.html',
  styleUrls: ['./pomodoro-pause.component.scss']
})
export class PomodoroPauseComponent {
  @Output() clickEvent = new EventEmitter();

  onClick() {
    this.clickEvent.emit();
  }
}
