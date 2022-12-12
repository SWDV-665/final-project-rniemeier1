import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AlarmServiceService } from '../alarm-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Alarms";


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public DataService: AlarmServiceService, public InputService: InputDialogServiceService) {}
  
  loadAlarms(){
    return this.DataService.getAlarms();
  }

  async deleteAlarm(alarm: { name: string; hour: number, minute: number, enabled: boolean }, index: number){
    const delName = alarm.name;
    this.DataService.deleteAlarm(index);
  
    const toast = this.toastCtrl.create({
      message: 'Removed ' + delName + ".",
      duration: 3000
    });
    (await toast).present();
  }

  editAlarm(alarm: { name: string; hour: number, minute: number, enabled: boolean }, index: number){
    this.InputService.showPrompt(alarm, index);
  }

  addAlarm(){
    this.InputService.showPrompt();
  }

  toggleAlarm(index: number){
    this.DataService.toggleAlarm(index);
  }

  

}
