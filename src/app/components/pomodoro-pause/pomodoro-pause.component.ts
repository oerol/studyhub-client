import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-pomodoro-pause',
  templateUrl: './pomodoro-pause.component.html',
  styleUrls: ['./pomodoro-pause.component.scss'],
})
export class PomodoroPauseComponent implements OnInit {
  @Output() clickEvent = new EventEmitter();

  pauseDurationInMinutes = 10;
  pauseDuration: number = 60 * this.pauseDurationInMinutes;
  timer: string = '';

  ngOnInit(): void {
    this.startTimer();
  }

  onClick() {
    this.clickEvent.emit();
  }

  secondsToMinutesSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`
  }

  setTimerText(seconds: number) {
    this.timer = this.secondsToMinutesSeconds(seconds);
  }

  startTimer() {
    const source = timer(0, 1000);
    const timerObservable = source.subscribe((val) => {
      const remainingSeconds = this.pauseDuration - val;
      if (remainingSeconds >= 0) {
        this.setTimerText(remainingSeconds);
      } else {
        console.log("stop");
      }
    });
  }
}
