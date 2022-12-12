import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Alarms";


  constructor() {}
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
}
