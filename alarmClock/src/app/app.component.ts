import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Alarms', url: '/Alarms', icon: 'alarm-sharp' },
    { title: 'Alarm Sound', url: '/settings/Sound', icon: 'musical-notes-outline' },
    { title: 'Alarm Vibration', url: '/settings/Vibration', icon: 'radio-sharp' },
    { title: 'Dismissal Method', url: '/settings/Dismiss', icon: 'notifications-off-sharp' },
    { title: 'Turn Off All Alarms', url: '/settings/DismissAll', icon: 'power-sharp' }
  ];
  constructor() {}
}
