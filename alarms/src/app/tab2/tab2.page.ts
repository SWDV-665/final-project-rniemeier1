import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AlarmServiceService } from '../alarm-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  title = "Settings";
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public DataService: AlarmServiceService, public InputService: InputDialogServiceService) {}
  
  loadAlarms(){
    return this.DataService.getAlarms();
  }

  disableAllAlarms(){
    this.DataService.toggleAllAlarmsOff();
  }

  toggleVibaration(){
    this.DataService.toggleVibes();
  }

}
