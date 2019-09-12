import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appTimerSubject]'
})
export class TimerSubjectDirective {

  // Private model of timer
  private timer = new BehaviorSubject({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalTime: 0
  })

  //Public observable of timer
  public timerObs$ = this.timer.asObservable();

  constructor() { }

  nextSecond() {
    return ++this.timer.value.totalTime;
  }

  reset(): void {
    this.timer.value.totalTime = 0;
  }

  getSecond() {
    return this.timer.value.seconds;
  }

  getMinutes() {
    return this.timer.value.minutes;
  }

  getHours() {
    return this.timer.value.hours;
  }

  getTotalTime() {
    return this.timer.value.totalTime;
  }

}
