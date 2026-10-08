import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { DhcpLogService } from './dhcpLog.service';

@Component({
  selector: 'app-dhcp-log',
  templateUrl: './dhcpLog.component.html',
  styleUrls: ['./dhcpLog.component.scss']
})
export class DhcpLogComponent {
  dhcpIp: string = '';
  timeout: number = 60;
  searchPattern: string = '';
  logs: string[] = []; // Массив, который используется в шаблоне
  isConnected: boolean = false;

  constructor(private dhcpLogService: DhcpLogService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  connect() {
    if (this.dhcpIp && !this.isConnected) {
      this.logs = []; // Очищаем массив перед подключением
      this.dhcpLogService.connectToServer(this.dhcpIp, this.timeout).subscribe(
        (message: string) => {
       //   console.log(message);
          this.ngZone.run(() => {
  //          console.log(message);
            this.logs.push(message); // Добавляем новое сообщение в массив
            this.cdr.detectChanges(); // Обновляем представление
          });
        },
        (error: any) => {
          console.error('WebSocket error:', error);
          this.disconnect(); 
        },
        () => {
          if(this.isConnected){
            console.log('WebSocket connection closed.');
            this.disconnect();
          }
        }
      );
      this.isConnected = true;
      console.log('Component subscribed to new Observable');
    }
  }

  disconnect() {
    this.dhcpLogService.disconnect();
    this.isConnected = false;
  }
}