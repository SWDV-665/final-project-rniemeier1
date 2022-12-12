import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Alarms";

  tempDateTime = new Date();

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {}
  alarms = [
    {
      name: "alarm1",
      time: new Date(),
      enabled: true
    },
    {
      name: "alarm2",
      time: new Date(),
      enabled: true
    },
    {
      name: "alarm3",
      time: new Date(),
      enabled: true
    },
    {
      name: "alarm4",
      time: new Date(),
      enabled: false
    },
  ];

  addAlarm(){
    const prompt = this.alertCtrl.create({
      header: "Add Alarm",
      message: "Set the time for your new alarm. ",
      inputs:[
        {
          name: "Alarm Name",
          placeholder: "Alarm " + this.alarms.length + 1,
          value: null
        },
        {
          name: "Alarm Time",
          placeholder: this.tempDateTime.getHours() + ":" + (this.tempDateTime.getMinutes() < 10 ? "0" + this.tempDateTime.getMinutes() : this.tempDateTime.getMinutes())
          
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
          handler: async item => {
          /*  if(index !== undefined){
              //edit item
              this.DataService.editItem(alarm, index);
              const toast = this.toastCtrl.create({
                message: 'Updated ' + alarm.name,
                duration: 3000
              });
              (await (toast)).present();
            }
            else{
              //add item
              this.DataService.addItem(alarm);
              const toast = this.toastCtrl.create({
                message: 'Added ' + alarm.name,
                duration: 3000
              });
              (await (toast)).present();
            } */
          }
        }
      ]
    })
  }

  async deleteAlarm(alarm: { name: string; time: Date, enabled: boolean }, index: number){
    const toast = this.toastCtrl.create({
      message: "removing alarm" + alarm.name,
      duration: 3000
    });
    (await (toast)).present();
  }

  //input service
  /*
  async showPrompt(item?, index?){
    const prompt = this.alertCtrl.create({
      header: item ? "Edit Item" : "Add Item",
      message: item ? "Please edit the item and quantity as needed." : "Please enter the item name and quantity.",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
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
          handler: async item => {
            if(index !== undefined){
              //edit item
              this.DataService.editItem(item, index);
              const toast = this.toastCtrl.create({
                message: 'Updated ' + item.name,
                duration: 3000
              });
              (await (toast)).present();
            }
            else{
              //add item
              this.DataService.addItem(item);
            const toast = this.toastCtrl.create({
              message: 'Added ' + item.name,
              duration: 3000
            });
            (await (toast)).present();
            }
          }
        }
      ]
     });
    (await prompt).present();
  }*/

}
