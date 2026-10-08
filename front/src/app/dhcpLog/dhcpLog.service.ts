import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DhcpLogService {
  private socket?: WebSocket;
  private messageSubject: Subject<any> = new Subject<any>();
  private disconnectTimer?: ReturnType<typeof setTimeout>;
  private readonly defaultTimeout: number = 60;

  constructor() {}

  connectToServer(dhcpIp: string, timeout: number = this.defaultTimeout): Observable<any> {
    // Закрыть предыдущее соединение, если оно существует
    this.disconnect();
    this.socket = new WebSocket(`wss://adm.o3.ua/ws_dhcp/${dhcpIp}`);
    
    this.socket.onopen = () => {
      console.log('WebSocket connection opened.');
      // Установить таймер для отключения после timeout
      this.disconnectTimer = setTimeout(() => {
        this.disconnect();
      }, timeout * 1000);
    };
    
    // Логика обработки входящих сообщений
    this.socket.onmessage = (event) => {
    //  console.log('WebSocket message received:', event.data);
      this.messageSubject.next(event.data);
    };
    
    return this.messageSubject.asObservable();
  }

  disconnect() {
    if (this.disconnectTimer) {
      clearTimeout(this.disconnectTimer);
      this.disconnectTimer = undefined;
    }
    if (this.socket) {
      this.socket.close(); // Закрыть сокет
      this.socket = undefined;
      console.log('WebSocket connection closed.');
    }
  }

  isSocketOpen(): boolean {
    return !!this.socket && this.socket.readyState === WebSocket.OPEN;
  }
}
