import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimerSubjectDirective } from './timer-model/timer-subject.directive';
import { TimeFormatPipe } from './pipe/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerSubjectDirective,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TimerSubjectDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
