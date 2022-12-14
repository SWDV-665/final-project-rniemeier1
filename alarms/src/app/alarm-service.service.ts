import { Injectable } from '@angular/core';
import { ForegroundService } from '@awesome-cordova-plugins/foreground-service/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@Injectable({
  providedIn: 'root'
})
export class AlarmServiceService {

  constructor(public frngdSvc: ForegroundService, public localNotifications: LocalNotifications) { }

  //List of Alarms
  alarms: any = [];
  currentTime = new Date();
  notAllOff:boolean = true;

  //vibration on?
  vibrateEnabled:boolean = true;

  snoozeMins = 5;
  seconds = 60; //set the number of seconds between checking to see if alarm should be going off
  
  timer = setInterval(() => { //check to see if we should set off an alarm
    if(this.alarms.length > 0){
      this.currentTime = new Date(); //update the currentTime

      this.alarms.forEach((alarm: { name: string; hour: number, minute: number, enabled: boolean }) => { //see if its time for any alarm to go off
        if(alarm.hour == this.currentTime.getHours() && alarm.minute == this.currentTime.getMinutes() && alarm.enabled){ //set off alarm
          this.triggerAlarm(alarm.name);
        }
      });
    }
  }, this.seconds * 1000);

  getAlarms(){
    return this.alarms;
  }

  deleteAlarm(index:number){
    this.alarms.splice(index,1);
  }
  
  addAlarm(alarm:{ name: string; hour: number, minute: number, enabled: boolean }){
    this.alarms.push(alarm);
  }

  editAlarm(alarm : { name: string; hour: number, minute: number, enabled: boolean }, index:number){
    this.alarms[index] = alarm;
    this.checkAllAlarms();
  }
  
  toggleAlarm(index:number){ //just negate whatever the last value was 
    this.alarms[index].enabled = !this.alarms[index].enabled;
    this.checkAllAlarms();
  }

  /*
    Uses Cordova Foreground Service Plugin
    https://github.com/DavidBriglio/cordova-plugin-foreground-service
    to keep a notification in the notification tray while an alarm is set, which makes it so that the app can trigger an alarm. 
  */
  checkAllAlarms(){ //every time an alarm is enabled or disabled, check to see if the foreground service should be running
    this.alarms.forEach((alarm: { name: string; hour: number, minute: number, enabled: boolean }) => { //see if its time for any alarm to go off
      if(alarm.enabled == false){
        this.notAllOff = true;
      }
    });
    if(this.notAllOff == false){ //all alarms are off, so stop the foreground service
      this.frngdSvc.stop();
      this.notAllOff = true; //reset the variable for later
    }
    else{
      this.frngdSvc.start("Alarm Running", "Background Service", 'drawable/fsicon');
    }
    
  }

  toggleVibes(){
    this.vibrateEnabled  = !this.vibrateEnabled;
  }

  toggleAllAlarmsOff(){ //disable all alarms
    this.alarms.forEach((alarm: { name: string; hour: number, minute: number, enabled: boolean }) => { //see if its time for any alarm to go off
      alarm.enabled = false;
    });
    this.checkAllAlarms();
  }

  triggerAlarm(alarmName: string){
    this.localNotifications.setDefaults({
      id: 1,
      title: 'Alarm!',
      text: alarmName,
      foreground: true,
      vibrate: this.vibrateEnabled,
      actions:[
        {id:'Dismiss', title:'Dissmiss'},
        {id:'Snooze', title:'Snooze'}
      ]

    });


  }

  snoozeAlarm(alarmName: string){
    this.localNotifications.schedule({
      text: "Snoozed Alarm going off: " + alarmName,
      trigger: {at: new Date(new Date().getTime() + (1000 * this.snoozeMins))}
   });
  }

}
