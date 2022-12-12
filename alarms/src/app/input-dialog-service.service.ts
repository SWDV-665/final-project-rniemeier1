import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlarmServiceService } from './alarm-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public DataService: AlarmServiceService) { }

  async showPrompt(alarm?: { name: string; hour: number, minute: number, enabled: boolean }, index?: number){
    const prompt = this.alertCtrl.create({
      header: alarm ? "Edit Alarm" : "Add Alarm",
      message: "Hours are 24 hour format.",
      inputs:[
    
        {
          name: "name",
          placeholder: "Alarm Name",
          value: alarm ? alarm.name : null
        },
        {
          name: "hour",
          placeholder: "Hour",
          type: 'number',
          min: 1,
          max: 24, 
          value: alarm ? alarm.hour : null
        },
        {
          name: "minute",
          placeholder: "Minute",
          type: 'number',
          min: 1,
          max: 59,
          value: alarm ? alarm.minute: null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Save',
          handler: async alarm => {
            if(index !== undefined){
              //edit item after checking data
              if(!(alarm.hour < 24 && alarm.hour >= 0))
              {
                const toast = this.toastCtrl.create({
                  message: "Invalid Hour. Please enter a number between 0 and 23 (inclusive).",
                  duration: 3000
                });
                (await toast).present();
              }
              else if(!(alarm.minute < 60 && alarm.minute >=0)){
                const toast = this.toastCtrl.create({
                  message: "Invalid minute. Please enter a minute between 0 and 59 (inclusive).",
                  duration: 3000
                });
                (await toast).present();
              }
              else{ //data is good
                this.DataService.editAlarm(alarm, index);
              }
            }
            else{
              //check data
              if(!(alarm.hour < 24 && alarm.hour >= 0))
              {
                const toast = this.toastCtrl.create({
                  message: "Invalid Hour. Please enter a number between 0 and 23 (inclusive).",
                  duration: 3000
                });
                (await toast).present();
              }
              else if(!(alarm.minute < 60 && alarm.minute >=0)){
                const toast = this.toastCtrl.create({
                  message: "Invalid minute. Please enter a minute between 0 and 59 (inclusive).",
                  duration: 3000
                });
                (await toast).present();
              }
              else{
                //add item
                alarm.enabled = true;
                this.DataService.addAlarm(alarm);
              }
            } 
          }
        }
      ]
    });
    (await (prompt)).present();
  }
}
