import { Injectable } from '@angular/core';
import * as Timer from 'easytimer';
import { Observable } from 'rxjs';
import { ComponentService } from './component.service';
import { Event } from './event';


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(
    private componentService: ComponentService,
  ) {

  }




  timer = new Timer();




  private startTime;
  private endTime;
  private timerRunning;
  private previousTime;
  currentTime;



  startCountDownTimer(durations) {

    
    return new Promise((resolve) => {
      if (!this.timerRunning) {
        this.timer.start({ countdown: true, startValues: { minutes: duration } });
        this.timerRunning = true;
      }
    })



  }



  waitForTimerToEnd(duration) {

    this.timer.addEventListener('targetAchieved', this.timerEnded);

  }

  timerEnded() {
    this.timerRunning = false;
  }

  isTimerRunning() {
    this.timer.addEventListener('secondsUpdated', () => {
      if (this.timerRunning == true) {
        return true
      } else {
        return false;
      }
    })
  }

  getTime() {
    return new Observable((ob) => {
      let timer = this.timer;
      timer.addEventListener('secondsUpdated', function (e) {
        this.currentTime = timer.getTimeValues().toString();
        ob.next(this.currentTime);
      });
    })
  }


}

