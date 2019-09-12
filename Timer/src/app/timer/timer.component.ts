import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, timer, observable, interval, Subscribable, Subscriber, Subscription, fromEvent, merge, of, throwError, empty } from 'rxjs';
import {map, mapTo, mergeAll, mergeMap, switchMap, scan} from 'rxjs/operators'
import { TimerSubjectDirective } from '../timer-model/timer-subject.directive';
import { error } from '@angular/compiler/src/util';



@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit, AfterViewInit {

  @ViewChild('startButton', {static: true})
  startBtn: ElementRef;

  @ViewChild('waitButton', {static: true})
  waitBtn: ElementRef;

  @ViewChild('stopButton', {static: true})
  stopBtn: ElementRef;

  @ViewChild('resetButton', {static: true})
  resetBtn: ElementRef;

  start$: Observable<any>;
  wait$: Observable<any>;
  stop$: Observable<any>;
  reset$: Observable<any>

  // startButton: Subscription;

  // waitButton: Subscription;

  timer$;

  // timerOn: Subscription;

  isStop = false;

  constructor(private timer: TimerSubjectDirective) {   }

  ngOnInit() {}

  ngAfterViewInit(){

    this.start$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(mapTo(true));
    this.wait$ = fromEvent(this.waitBtn.nativeElement, 'click').pipe(mapTo(null));
    // this.stop$ = fromEvent(this.stopBtn.nativeElement, 'click').pipe(mapTo(null));
    this.reset$ = fromEvent(this.resetBtn.nativeElement, 'click').pipe(mapTo('reset'));
    
    this.timer$ = merge(this.start$, this.wait$, this.reset$).pipe(
      switchMap( ev => {
        // (ev && this.isStop) ? this.isStop = true : false;
        console.log(this.isStop)

        switch (ev) {
          case true : {
            console.log('START/STOP: ' + this.timer.getTotalTime() + 's');
            // this.isStop = !this.isStop; 
            if(!this.isStop){
              this.isStop = !this.isStop
              return interval(1000)
            }else return of(false)
          }
          case false : {
            return of(null);
          }
          case null : {
            this.isStop = false;
            return of(null);
          }
          case 'reset' : {
            this.isStop = false;
            return of('reset');
          }
        }
      }));

      this.timer$.pipe(map( (event) => {
        if(event === null) return 'WAIT : ' + this.timer.getTotalTime() + 's';
        if(event === false) return 'STOP : ' + this.timer.getTotalTime() + 's';
        if(event === 'reset') {
          this.timer.reset();
          return 'RESET : ' + this.timer.getTotalTime() + 's';
        }
        return this.timer.nextSecond();
      }))

    .subscribe({
      next: (event) => {
        console.log(event)
      },
      complete: () => console.log('STOP'),
      error: (error) => console.log(error)
    });

    }
  

}
