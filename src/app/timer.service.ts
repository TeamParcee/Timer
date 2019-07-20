import { Injectable } from '@angular/core';
import * as Timer from 'easytimer';


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() {
    this.timer = new Timer();

  }




  private timer;




  private startTime;
  private endTime;
  currentTime;



  startCountDownTimer(duration: number) {
    this.timer.start({ countdown: true, startValues: { minutes: duration } });
    this.getTime(this.timer)

  }

  getTime(timer) {
    timer.addEventListener('secondsUpdated', function (e) {
      this.currentTime = this.timer.getTimeValues().toString();
      console.log(this.currentTime);
    });
  }
}

