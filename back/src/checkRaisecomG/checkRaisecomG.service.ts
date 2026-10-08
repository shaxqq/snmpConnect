import { Injectable } from '@nestjs/common';
const net = require('net');

@Injectable()
export class CheckRaisecomGService {
  baseCheckRaisecomG(ip: any, port: string) {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';

      client.on('data', (data: { toString: () => any; }) => {
        responseData += data.toString();
        console.log('Received:', data.toString());
         setTimeout(() => {
           client.end();
        }, 5000)
      });

      // Обработчик события "close" для завершения соединения
      client.on('close', () => {
        console.log('Connection closed');
         console.log('reData:', responseData);
        resolve(responseData);
      });

      client.on('error', (error: any) => {
        reject(error);
      });

      client.connect(23, ip, () => {
        console.log('Connected to remote host');
        sendDataWithDelay(client, '"login"\r', 300)
        sendDataWithDelay(client, '"password"\r', 300)
        sendDataWithDelay(client, 'sh int br\r', 500)
        sendDataWithDelay(client, `sh interface gigaethernet 1/1/${port}\r `, 500)
        sendDataWithDelay(client, `sh loopback-detection gigaethernet 1/1/${port}\r`, 500)
        sendDataWithDelay(client, `sh mac-address dynamic gigaethernet 1/1/${port}\r`, 500)
        sendDataWithDelay(client, `sh ip dhcp snooping binding\r`, 500)
        sendDataWithDelay(client, `test cable-diagnostics gigaethernet 1/1/${port}\r`, 500)
        sendDataWithDelay(client, `sh cable-diagnostics gigaethernet 1/1/${port}\r`, 500)
        sendDataWithDelay(client, `sh interface gigaethernet 1/1/${port} st\r`, 500)
        sendDataWithDelay(client, `sh version\r`, 500)

      });
    })
  }


}
function sendDataWithDelay(client: { write: (arg0: any) => void; }, data: string, delay: number) {
  setTimeout(() => {
    client.write(data)
  }, delay)
}