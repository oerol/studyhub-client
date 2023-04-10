import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroPauseComponent } from './pomodoro-pause.component';

describe('PomodoroPauseComponent', () => {
  let component: PomodoroPauseComponent;
  let fixture: ComponentFixture<PomodoroPauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroPauseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomodoroPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
