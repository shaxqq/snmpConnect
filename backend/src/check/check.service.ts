import { Injectable } from '@nestjs/common';
const net = require('net');

@Injectable()
export class CheckService {
  baseCheck(ip: any, port: string) {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';

      client.on('data', (data: { toString: () => any; }) => {
        responseData += data.toString();
        console.log('Received:', responseData);
        setTimeout(() => {
          client.end();
        }, 5000)
      });

      // 172.23.100.41
      // Обработчик события "close" для завершения соединения
      client.on('close', () => {
        console.log('Connection closed');
        // console.log('reData:', responseData);
        resolve(responseData);
      });

      client.on('error', (error: any) => {
        reject(error);
      });

      client.connect(23, ip, () => {
        console.log('Connected to remote host');
        sendDataWithDelay(client, 'sazeke\r', 300)
        sendDataWithDelay(client, 'sazekeL12-\r', 300)
        sendDataWithDelay(client, `sh int port ${port}\r`, 300)
        sendDataWithDelay(client, `sh loopback-detection port-list ${port}\r`, 300)
        sendDataWithDelay(client, `sh mac-address-table l2-address port ${port}\r`, 300)
        sendDataWithDelay(client, `sh ip dhcp snooping binding\r`, 300)
        sendDataWithDelay(client, `sh logging file\r`, 300)
        sendDataWithDelay(client, `sh version\r`, 300)
        sendDataWithDelay(client, `sh int port ${port} st\r`, 300)
        sendDataWithDelay(client, `test cable-diagnostics port-list ${port}\r`, 300)
        sendDataWithDelay(client, `sh cable-diagnostics port-list ${port}\r`, 2222)
      });
    })
  }


}
function sendDataWithDelay(client: { write: (arg0: any) => void; }, data: string, delay: number) {
  setTimeout(() => {
    client.write(data)
  }, delay)
}